import prisma from "../prisma/prisma";
import { formatDateToYYYMMDD } from "../utils/date";

export async function getReservedDatesByUserId(userId: string) {
  // it returns for me all the reservation by searching using userId OR inside playerIds
  const reservations = await prisma.reservation.findMany({
    where: {
      OR: [{ userId }, { playerIds: { has: userId } }],
    },
    select: { start: true },
  });

  return reservations.map((reservation) => formatDateToYYYMMDD(reservation.start));
}
