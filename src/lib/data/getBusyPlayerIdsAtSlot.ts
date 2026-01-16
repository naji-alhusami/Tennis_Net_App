import prisma from "../prisma/prisma";
import { addMinutesToDate, toDateTimeLocal } from "../utils/date";

export async function getBusyPlayerIdsAtSlot(args: {
  dateParam?: string;
  timeParam?: string;
  durationMinutes?: number;
}) {
  const { dateParam, timeParam, durationMinutes = 60 } = args;

  if (!dateParam || !timeParam) return [];

  const slotStart = toDateTimeLocal(dateParam, timeParam);
  const slotEnd = addMinutesToDate(slotStart, durationMinutes);

  const reservations = await prisma.reservation.findMany({
    where: {
      // start < slotEnd AND end > slotStart
      start: { lt: slotEnd },
      end: { gt: slotStart },
    },
    select: { userId: true, playerIds: true },
  });

  // Build a unique list of busy user IDs (owner + all players)
  const busyPlayers = new Set<string>();

  for (const reservation of reservations) {
    busyPlayers.add(reservation.userId);
    for (const pid of reservation.playerIds) busyPlayers.add(pid);
  }

  return [...busyPlayers];
}
