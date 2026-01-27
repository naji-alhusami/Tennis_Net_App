import { CourtLocation, CourtType } from "@prisma/client";
import prisma from "../prisma/prisma";
import { twoDigitNumber } from "../utils/date";

const dayRangeLocal = (dateParam: string) => {
  const [y, m, d] = dateParam.split("-").map(Number);

  const startDay = new Date(y, m - 1, d, 0, 0, 0, 0);
  const endDay = new Date(y, m - 1, d + 1, 0, 0, 0, 0);

  return { startDay, endDay };
};

export async function getAllBookedTimesByCourtsGroup({
  courtTypeParam,
  courtLocationParam,
  dateParam,
}: {
  courtTypeParam: CourtType;
  courtLocationParam: CourtLocation;
  dateParam: string;
}) {
  const courts = await prisma.court.findMany({
    where: { type: courtTypeParam, location: courtLocationParam },
    select: { id: true },
  });

  const capacity = courts.length;

  if (capacity === 0) return [];

  const { startDay, endDay } = dayRangeLocal(dateParam);

  // gte = Greater Than or Equal
  // lt = Less Than
  const reservations = await prisma.reservation.findMany({
    where: {
      courtId: { in: courts.map((c) => c.id) },
      start: { gte: startDay, lt: endDay },
    },
    select: { start: true, courtId: true },
  });

  // "09:00" → { "court1", "court2" } === string, Set<string>
  const counts = new Map<string, Set<string>>();

  for (const reservation of reservations) {
    const hours = twoDigitNumber(reservation.start.getHours());
    const minutes = twoDigitNumber(reservation.start.getMinutes());
    const slot = `${hours}:${minutes}`;

    if (!counts.has(slot)) counts.set(slot, new Set()); // {"09:00" => Set(0)}

    counts.get(slot)!.add(reservation.courtId); // {"09:00" => "bdh34934578fdb"} the id is courtId
  }

  // {"09:00" => "bdh34934578fdb"} || const [slot, courtIds] slot is "09:00" and courtIds is "bdh34934578fdb"
  const fullyBooked: string[] = [];
  // courtIds.size is the number of the courts reserved
  for (const [slot, courtIds] of counts) {
    if (courtIds.size >= capacity) fullyBooked.push(slot);
  }

  return fullyBooked;
}
