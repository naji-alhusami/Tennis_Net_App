// import { auth } from "@/auth";
// import z from "zod";
// import { NextResponse } from "next/server";

// import prisma from "@/lib/prisma/prisma";
// import { CreateReservationValidator } from "@/lib/validators/ReservationValidators";
// import type { CourtLocation, CourtType } from "@prisma/client";
// import { addMinutesToDate, toDateTimeLocal } from "@/lib/utils/date";


// function overlaps(startA: Date, endA: Date, startB: Date, endB: Date) {
//   return startA < endB && endA > startB;
// }

// export async function POST(request: Request) {
//   // 1) auth
//   const session = await auth();
//   const userId = session?.user.id;

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   // 2) validate body
//   const body = await request.json();
//   const parsed = CreateReservationValidator.safeParse(body);

//   if (!parsed.success) {
//     const details = z.flattenError(parsed.error);
//     return NextResponse.json(
//       { error: "Invalid body", details },
//       { status: 400 },
//     );
//   }

//   const {
//     courtType,
//     courtLocation,
//     date,
//     time,
//     players,
//     durationMinutes,
//     // note,
//   } = parsed.data;

//   // 3) compute start/end
//   const start = toDateTimeLocal(date, time);
//   const end = addMinutesToDate(start, durationMinutes);

//   // 4) get all courts for this group (type + location)
//   const courts = await prisma.court.findMany({
//     where: {
//       type: courtType as CourtType,
//       location: courtLocation as CourtLocation,
//     },
//     select: { id: true },
//   });

//   if (courts.length === 0) {
//     return NextResponse.json(
//       { error: "No courts found for this group" },
//       { status: 404 },
//     );
//   }

//   const courtIds = courts.map((c) => c.id); // now typed ✅

//   // 5) find reservations that overlap the requested time for these courts
//   const existing = await prisma.reservation.findMany({
//     where: {
//       courtId: { in: courtIds },
//       start: { lt: end },
//       end: { gt: start },
//     },
//     select: { courtId: true, start: true, end: true },
//   });

//   // 6) pick a free courtId
//   const busy = new Set<string>();

//   for (const r of existing) {
//     if (overlaps(r.start, r.end, start, end)) {
//       busy.add(r.courtId);
//     }
//   }

//   const freeCourt = courts.find((c) => !busy.has(c.id));

//   if (!freeCourt) {
//     return NextResponse.json(
//       { error: "Time slot is fully booked for this court group" },
//       { status: 409 },
//     );
//   }

//   // 7) create reservation with the chosen courtId
//   const reservation = await prisma.reservation.create({
//     data: {
//       userId,
//       courtId: freeCourt.id,
//       start,
//       end,
//       playerIds: players,
//       // note: JSON.stringify({ note: note ?? null, players }),
//     },
//     select: { id: true, start: true, end: true, courtId: true },
//   });

//   return NextResponse.json({ ok: true, reservation }, { status: 201 });
// }

import { auth } from "@/auth";
import z from "zod";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma/prisma";
import { CreateReservationValidator } from "@/lib/validators/ReservationValidators";
import type { CourtLocation, CourtType } from "@prisma/client";
import { addMinutesToDate, toDateTimeLocal } from "@/lib/utils/date";

function overlaps(startA: Date, endA: Date, startB: Date, endB: Date) {
  return startA < endB && endA > startB;
}

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = CreateReservationValidator.safeParse(body);

  if (!parsed.success) {
    const details = z.flattenError(parsed.error);
    return NextResponse.json({ error: "Invalid body", details }, { status: 400 });
  }

  const { courtType, courtLocation, date, time, players, durationMinutes } = parsed.data;

  const start = toDateTimeLocal(date, time);
  const end = addMinutesToDate(start, durationMinutes);

  const courts = await prisma.court.findMany({
    where: {
      type: courtType as CourtType,
      location: courtLocation as CourtLocation,
    },
    select: { id: true },
  });

  if (courts.length === 0) {
    return NextResponse.json({ error: "No courts found for this group" }, { status: 404 });
  }

  const courtIds = courts.map((c) => c.id); // now typed ✅

  const existing = await prisma.reservation.findMany({
    where: {
      courtId: { in: courtIds },
      start: { lt: end },
      end: { gt: start },
    },
    select: { courtId: true, start: true, end: true },
  });

  const busy = new Set<string>();
  for (const r of existing) {
    if (overlaps(r.start, r.end, start, end)) busy.add(r.courtId);
  }

  const freeCourt = courts.find((c) => !busy.has(c.id));

  if (!freeCourt) {
    return NextResponse.json(
      { error: "Time slot is fully booked for this court group" },
      { status: 409 }
    );
  }

  const reservation = await prisma.reservation.create({
    data: {
      userId,
      courtId: freeCourt.id,
      start,
      end,
      playerIds: players,
    },
    select: { id: true, start: true, end: true, courtId: true },
  });

  return NextResponse.json({ ok: true, reservation }, { status: 201 });
}
