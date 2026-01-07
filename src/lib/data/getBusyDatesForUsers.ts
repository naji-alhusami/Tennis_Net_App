import prisma from "../prisma/prisma";

function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export async function getBusyDatesForUsers(
  userIds: string[],
  from: Date,
  to: Date
) {
  if (userIds.length === 0) return [];

  // Any reservation where:
  // - the reservation owner is in userIds OR
  // - at least one playerId in the reservation is in userIds
  const reservations = await prisma.reservation.findMany({
    where: {
      start: { gte: from, lte: to },
      OR: [{ userId: { in: userIds } }, { playerIds: { hasSome: userIds } }],
    },
    select: { start: true },
  });

  // Convert to unique "YYYY-MM-DD"
  const set = new Set(reservations.map((reservation) => toISODate(reservation.start)));
  return [...set];
}
