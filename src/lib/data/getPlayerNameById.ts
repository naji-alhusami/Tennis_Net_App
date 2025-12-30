import prisma from "../prisma/prisma"

export const getPlayersNamesByIds = async (ids: string[]) => {
  if (ids.length === 0) return []

  return prisma.user.findMany({
    where: {
      id: { in: ids },
    },
    select: {
      id: true,
      name: true,
    },
  })
}
