// src/lib/data/getBusyPlayerIdsAtSlot.ts
import prisma from "../prisma/prisma"

function parseSlotStart(dateISO: string, timeHHmm: string) {
  const [y, m, d] = dateISO.split("-").map(Number)
  const [hh, mm] = timeHHmm.split(":").map(Number)
  return new Date(y, m - 1, d, hh, mm, 0, 0)
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000)
}

export async function getBusyPlayerIdsAtSlot(args: {
  dateISO?: string
  timeHHmm?: string
  durationMinutes?: number
  // Optional: to check only friends shown in the list
  candidates?: string[]
}) {
  const { dateISO, timeHHmm, durationMinutes = 60, candidates = [] } = args

  if (!dateISO || !timeHHmm) return []

  const slotStart = parseSlotStart(dateISO, timeHHmm)
  const slotEnd = addMinutes(slotStart, durationMinutes)

  const reservations = await prisma.reservation.findMany({
    where: {
      // overlap: start < slotEnd AND end > slotStart
      start: { lt: slotEnd },
      end: { gt: slotStart },

      // Optional: reduce DB work if we only care about these users
      ...(candidates.length
        ? {
            OR: [
              { userId: { in: candidates } },
              { playerIds: { hasSome: candidates } }, // scalar list filter
            ],
          }
        : {}),
    },
    select: { userId: true, playerIds: true },
  })

  // Build a unique list of busy user IDs (owner + all players)
  const busy = new Set<string>()
  for (const r of reservations) {
    busy.add(r.userId)
    for (const pid of r.playerIds) busy.add(pid)
  }

  return [...busy]
}
