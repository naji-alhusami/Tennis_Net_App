import prisma from "@/lib/prisma/prisma";

export async function getIncomingFriendRequests(currentUserId: string) {
  return prisma.friendRequest.findMany({
    where: {
      toUserId: currentUserId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      createdAt: true,
      fromUserId: true,
      toUserId: true,
      fromUser: {
        select: {
          id: true,
          name: true,
          image: true,
          role: true,
        },
      },
    },
  });
}
