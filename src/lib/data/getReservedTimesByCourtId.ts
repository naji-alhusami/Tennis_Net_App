// // import prisma from "../prisma/prisma";

// // export async function getReservedTimesByCourtId(
// //   courtGroupsIds: string[],
// //   dateParams: string
// // ) {
// //   const dayStart = new Date(dateParams  );
// //   dayStart.setHours(0, 0, 0, 0);

// //   const dayEnd = new Date(dayStart);
// //   dayEnd.setDate(dayEnd.getDate() + 1);

// //   courtGroupsIds.map((courtId) => {
// //     const reservedTimes = prisma.reservation.findMany({
// //       where: {
// //         courtId: courtId,
// //       },
// //     });

// //     return reservedTimes;
// //   });
// // }

// import prisma from "../prisma/prisma";

// function parseYmdToLocalDate(ymd: string) {
//   // ymd = "2026-01-05"
//   const [y, m, d] = ymd.split("-").map(Number);
//   if (!y || !m || !d)
//     throw new Error("Invalid date format. Expected YYYY-MM-DD");

//   // Creates a Date at local time 00:00:00 (server timezone)
//   return new Date(y, m - 1, d, 0, 0, 0, 0);
// }

// export async function getReservedTimesByCourtId(
//   courtGroupsIds: string[],
//   dateParam: string
// ) {
//   if (!Array.isArray(courtGroupsIds) || courtGroupsIds.length === 0) return [];

//   const dayStart = parseYmdToLocalDate(dateParam);
//   const dayEnd = new Date(dayStart);
//   dayEnd.setDate(dayEnd.getDate() + 1);

//   const reservations = await prisma.reservation.findMany({
//     where: {
//       courtId: { in: courtGroupsIds },
//       // overlap with [dayStart, dayEnd)
//       start: { lt: dayEnd },
//       end: { gt: dayStart },
//     },
//     select: {
//       courtId: true,
//       start: true,
//       end: true,
//     },
//     orderBy: { start: "asc" },
//   });

//   return reservations;
// }

import prisma from "../prisma/prisma";

// "YYYY-MM-DD" -> start/end of that day in server local time
function dayRangeLocal(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const start = new Date(y, m - 1, d, 0, 0, 0, 0);
  const end = new Date(y, m - 1, d + 1, 0, 0, 0, 0);
  return { start, end };
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function toHHMM(date: Date) {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

export async function getFullyBookedTimesByCourtGroup(
  courtIds: string[],
  isoDate: string
) {
  if (!courtIds.length) return [];

  const capacity = courtIds.length;
  const { start, end } = dayRangeLocal(isoDate);

  const rows = await prisma.reservation.findMany({
    where: {
      courtId: { in: courtIds },
      start: { gte: start, lt: end },
    },
    select: { start: true },
  });

  // Count bookings per slot time (HH:MM)
  const counts = new Map<string, number>();
  for (const r of rows) {
    const hhmm = toHHMM(r.start);
    counts.set(hhmm, (counts.get(hhmm) ?? 0) + 1);
  }

  // Fully booked = count >= capacity
  return [...counts.entries()].filter(([, c]) => c >= capacity).map(([t]) => t);
}
