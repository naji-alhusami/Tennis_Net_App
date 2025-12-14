import prisma from "@/lib/prisma/prisma"

export type FriendRequestResult =
  | { ok: true; status: "idle" | "requested"; message: string }
  | { ok: false; status: "idle" | "requested"; error: string }

export async function sendFriendRequest(fromUserId: string, toUserId: string): Promise<FriendRequestResult> {
  if (toUserId === fromUserId) return { ok: false, status: "idle", error: "You cannot add yourself" }

  try {
    await prisma.friendRequest.upsert({
      where: { fromUserId_toUserId: { fromUserId, toUserId } },
      update: {},
      create: { fromUserId, toUserId },
    })

    return { ok: true, status: "requested", message: "Request sent" }
  } catch {
    return { ok: false, status: "idle", error: "Could not send request." }
  }
}

export async function cancelFriendRequest(fromUserId: string, toUserId: string): Promise<FriendRequestResult> {
  if (toUserId === fromUserId) return { ok: false, status: "requested", error: "Invalid request" }

  try {
    await prisma.friendRequest.delete({
      where: { fromUserId_toUserId: { fromUserId, toUserId } },
    })

    return { ok: true, status: "idle", message: "Request cancelled" }
  } catch {
    return { ok: false, status: "requested", error: "No pending request to cancel." }
  }
}
