"use client"

import { useActionState } from "react"
import Image from "next/image"
import { friendRequestAction } from "../../../actions/friendRequestAction" 
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type FindPartnerProps = {
  id: string
  name: string | null
  image?: string | null
  initialRequested: boolean
}

type FriendRequestState = {
  status: "idle" | "requested"
  message: string
  error: string
}

export default function FindPartner({
  id,
  name,
  image,
  initialRequested,
}: FindPartnerProps) {

  const initialState: FriendRequestState = {
    status: initialRequested ? "requested" : "idle",
    message: "",
    error: "",
  }

  const [state, formAction, pending] = useActionState(friendRequestAction, initialState)

  const requestSent = state.status === "requested"

  return (
    <Card className="flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="w-full flex flex-col items-center">
        <div className="h-20 w-20 rounded-full overflow-hidden border mb-3">
          {image ? (
            <Image
              src={image}
              alt={name ?? "Player"}
              className="h-full w-full object-cover"
              width={100}
              height={100}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-2xl font-semibold bg-muted">
              {name?.[0]?.toUpperCase() ?? "P"}
            </div>
          )}
        </div>

        <CardTitle className="capitalize font-bold text-xl">{name}</CardTitle>
      </CardHeader>

      <div className="min-h-[1.5rem]">
        {state.error && <p className="text-red-500 text-sm mt-1 font-bold">{state.error}</p>}
        {state.message && <p className="text-green-600 text-sm mt-1 font-bold">{state.message}</p>}
      </div>

      <CardFooter className="w-full pt-0">
        <form action={formAction} className="w-full">
          <input type="hidden" name="userId" value={id} />
          <Button
            disabled={pending}
            name="intent"
            value={requestSent ? "cancel" : "send"}
            variant={requestSent ? "destructive" : "default"}
            className="w-full cursor-pointer"
          >
            {pending
              ? requestSent
                ? "Canceling..."
                : "Sending..."
              : requestSent
              ? "Cancel request"
              : "Add Friend"}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
