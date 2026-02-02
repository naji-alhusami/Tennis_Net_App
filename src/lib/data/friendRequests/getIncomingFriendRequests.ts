import prisma from "@/lib/prisma/prisma";
import { type IncomingRequest } from "@/lib/types/FriendRequest";

export async function getIncomingFriendRequests(currentUserId: string,): Promise<IncomingRequest[]> {
  const incomingRequests = await prisma.friendRequest.findMany({
    where: { toUserId: currentUserId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      createdAt: true,
      fromUserId: true,
      toUserId: true,
      fromUser: {
        select: { name: true, image: true, role: true },
      },
    },
  });

  return incomingRequests.map((r) => ({
    id: r.id,
    requestDate: r.createdAt.toISOString(),
    name: r.fromUser?.name ?? "Unknown",
    image: r.fromUser?.image ?? null,
    role: r.fromUser?.role ?? "PLAYER",
    fromUserId: r.fromUserId,
    toUserId: r.toUserId,
  }));
}
