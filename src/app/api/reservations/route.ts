import { auth } from "@/auth";
import prisma from "@/lib/prisma/prisma";
import { hasReservationConflict } from "@/lib/reservations/checkAvailability";
import { CreateReservationValidator } from "@/lib/validators/ReservationValidators";
import { NextResponse } from "next/server";
import z from "zod";

function toDateTimeLocal(dateISO: string, timeHHmm: string) {
  const [y, m, d] = dateISO.split("-").map(Number);
  const [hh, mm] = timeHHmm.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm, 0, 0);
}

export async function POST(request: Request) {
  // 1) checking auth
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const parsed = CreateReservationValidator.safeParse(body);

  if (!parsed.success) {
    const details = z.flattenError(parsed.error);
    return NextResponse.json(
      { error: "Invalid body", details },
      { status: 400 }
    );
  }

  const { courtType, date, time, players, durationMinutes, note } = parsed.data;

  // 3) compute start/end from date + times
  const start = toDateTimeLocal(date, time);
  const end = new Date(start.getTime() + durationMinutes * 60_000);

  // const conflictReservation = await hasReservationConflict({
  //   // courtId: court.id,
  //   start,
  //   end,
  // });

  // if (conflictReservation) {
  //   return NextResponse.json(
  //     { error: "Time slot is already booked" },
  //     { status: 409 }
  //   );
  // }

  const reservation = await prisma.reservation.create({
    data: {
      userId,
      courtId: userId,
      start,
      end,
      note: JSON.stringify({ note: note ?? null, players }),
    },
    select: { id: true, start: true, end: true, courtId: true },
  });

  return NextResponse.json({ ok: true, reservation }, { status: 201 });
}
