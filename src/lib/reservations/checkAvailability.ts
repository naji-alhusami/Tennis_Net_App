import prisma from "../prisma/prisma"

export async function hasReservationConflict({
  courtId,
  start,
  end,
}: {
  courtId: string;
  start: Date;
  end: Date;
}) {
  const conflict = await prisma.reservation.findFirst({
    where: {
      courtId,
      start: { lt: end },
      end: { gt: start },
    },
    select: { id: true },
  });

  return Boolean(conflict);
}
