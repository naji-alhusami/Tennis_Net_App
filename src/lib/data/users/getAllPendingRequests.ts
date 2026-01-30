import prisma from "@/lib/prisma/prisma"

type PlayersIds = { id: string }

export async function getAllPendingRequests(
  players: PlayersIds[],
  currentUserId: string
) {
  const targetIds = players.map((player) => player.id)

  if (targetIds.length === 0) return []

  return prisma.friendRequest.findMany({
    where: {
      fromUserId: currentUserId,
      toUserId: { in: targetIds },
      status: "PENDING",
    },
    select: { toUserId: true },
  })
}
