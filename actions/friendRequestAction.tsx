"use server"

import { auth } from "@/auth"
import { cancelFriendRequest, sendFriendRequest } from "@/lib/services/friendRequests";

type FriendRequestState = {
  status: "idle" | "requested"
  message: string
  error: string
}

export async function friendRequestAction(
  prevState: FriendRequestState,
  formData: FormData
): Promise<FriendRequestState> {
  const session = await auth()
  if (!session?.user?.id) return { status: prevState.status, message: "", error: "Not authenticated" }

  const fromUserId = session.user.id
  const toUserId = formData.get("userId") as string | null
  const intent = formData.get("intent") as "send" | "cancel" | null

  if (!toUserId || !intent) return { status: prevState.status, message: "", error: "Invalid request" }

  const res =
    intent === "send"
      ? await sendFriendRequest(fromUserId, toUserId)
      : await cancelFriendRequest(fromUserId, toUserId)

  if (!res.ok) return { status: res.status, message: "", error: res.error }
  return { status: res.status, message: res.message, error: "" }
}
