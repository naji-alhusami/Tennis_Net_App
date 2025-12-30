import prisma from "../prisma/prisma"

export async function getMyFriends(userId: string) {
  const friendships = await prisma.friendship.findMany({
    where: {
      OR: [{ userOneId: userId }, { userTwoId: userId }],
    },
    select: {
      userOneId: true,
      userTwoId: true,
      userOne: { select: { id: true, name: true, image: true, email: true } },
      userTwo: { select: { id: true, name: true, image: true, email: true } },
    },
  })

  const friends = friendships.map((f) =>
    f.userOneId === userId ? f.userTwo : f.userOne
  )

  return Array.from(new Map(friends.map((u) => [u.id, u])).values())
}
