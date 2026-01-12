import { CourtLocation, CourtType } from "@/generated/prisma";
import prisma from "../prisma/prisma";
import { twoDigitNumber } from "../utils/date";

// Get Full Day Range (01-01-2026 00:00 -> 02-01-2026 00:00)
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

  const reservations = await prisma.reservation.findMany({
    where: {
      courtId: { in: courts.map((court) => court.id) },
    },
    select: { start: true, courtId: true },
  });

  const { startDay, endDay } = dayRangeLocal(dateParam);

  const filteredReservations = reservations.filter(
    (reservation) => reservation.start >= startDay && reservation.start < endDay
  );

  const timeSlots: string[] = [];
  for (const reservation of filteredReservations) {
    const hours = twoDigitNumber(reservation.start.getHours());
    const minutes = twoDigitNumber(reservation.start.getMinutes());

    timeSlots.push(`${hours}:${minutes}`);
  }

  return timeSlots;
}
