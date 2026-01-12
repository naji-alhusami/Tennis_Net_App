import { CourtLocation, CourtType } from "@/generated/prisma";
import prisma from "../prisma/prisma";

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
  });

  console.log("reservations:", reservations);

  return [];
}
