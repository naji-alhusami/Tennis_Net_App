"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma/prisma"

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
  if (!session?.user?.id) {
    return { status: prevState.status, message: "", error: "Not authenticated" }
  }

  const fromUserId = session.user.id
  const toUserId = formData.get("userId") as string | null
  const intent = formData.get("intent") as "send" | "cancel" | null

  if (!toUserId || !intent) {
    return { status: prevState.status, message: "", error: "Invalid request" }
  }

  if (toUserId === fromUserId) {
    return {
      status: prevState.status,
      message: "",
      error: "You cannot add yourself",
    }
  }

  try {
    if (intent === "send") {
      // create or upsert request
      await prisma.friendRequest.upsert({
        where: {
          fromUserId_toUserId: {
            fromUserId,
            toUserId,
          },
        },
        update: {},
        create: {
          fromUserId,
          toUserId,
        },
      })

      return {
        status: "requested",
        message: "Request sent",
        error: "",
      }
    }

    if (intent === "cancel") {
      await prisma.friendRequest.delete({
        where: {
          fromUserId_toUserId: {
            fromUserId,
            toUserId,
          },
        },
      })

      return {
        status: "idle",
        message: "Request cancelled",
        error: "",
      }
    }

    return {
      status: prevState.status,
      message: "",
      error: "Unknown action",
    }
  } catch {
    return {
      status: prevState.status,
      message: "",
      error: intent === "send"
        ? "Could not send request."
        : "No pending request to cancel.",
    }
  }
}
