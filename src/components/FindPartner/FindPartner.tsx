"use client"

import { useActionState } from "react"
import Image from "next/image"
import { UserPlus, XCircle, CheckCircle2, BadgeCheck } from "lucide-react"

import { friendRequestAction } from "../../../actions/friendRequestAction"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getNameInitials } from "@/lib/utils/getNameInitials"

type FindPartnerProps = {
    id: string
    name: string | null
    role: "PLAYER" | "COACH" | null
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
    role,
    image,
    initialRequested,
}: FindPartnerProps) {
    const initialState: FriendRequestState = {
        status: initialRequested ? "requested" : "idle",
        message: "",
        error: "",
    }

    const userInitials = getNameInitials(name)
    const [state, formAction, pending] = useActionState(friendRequestAction, initialState)
    const requestSent = state.status === "requested"

    const isCoach = role === "COACH"

    return (
        <Card
            className={cn(
                "gap-2 group relative h-full overflow-hidden rounded-2xl border border-border/40 bg-background shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-1 hover:ring-primary/20"
            )}
        >
            {/* Soft color tint (very subtle) */}
            <div
                className={cn(
                    "pointer-events-none absolute inset-0 opacity-[0.12]",
                    isCoach
                        ? "bg-gradient-to-br from-violet-500 via-transparent to-transparent"
                        : "bg-gradient-to-br from-emerald-500 via-transparent to-transparent"
                )}
            />

            {/* Top accent bar */}
            <div className={cn("relative h-1 w-full", isCoach ? "bg-violet-500/70" : "bg-emerald-500/70")} />

            <CardHeader className="relative pb-2">
                {/* Avatar */}
                <div className="mx-auto mt-7">
                    <div className="relative h-20 w-20 rounded-full">
                        <div
                            className={cn(
                                "absolute inset-0 rounded-full ring-2",
                                isCoach ? "ring-violet-200/70" : "ring-emerald-200/70"
                            )}
                        />
                        <div className="absolute inset-[3px] overflow-hidden rounded-full bg-muted flex items-center justify-center">
                            {/* {image ? (
                                <Image
                                    src={image}
                                    alt={name ?? "User"}
                                    className="h-full w-full object-cover"
                                    width={96}
                                    height={96}
                                />
                            ) : ( */}
                            <span className="text-2xl font-semibold">{userInitials}</span>
                            {/* )} */}
                        </div>
                    </div>
                </div>

                <CardTitle className="mt-4 text-center text-lg font-semibold leading-tight">
                    {name ?? "Unknown"}
                </CardTitle>

                <p className="mt-1 text-center text-xs text-muted-foreground">
                    <Badge
                        variant={isCoach ? "secondary" : "secondary"}
                        className={cn(
                            "gap-1 border",
                            isCoach ? "border-violet-200/60 bg-violet-500/10 text-violet-700" : "border-emerald-200/60 bg-emerald-500/10 text-emerald-700"
                        )}
                    >
                        <BadgeCheck className="h-3.5 w-3.5" />
                        {isCoach ? "Coach" : "Player"}
                    </Badge>

                </p>
            </CardHeader>

            <CardContent className="relative pt-2">
                <div className="min-h-[2.25rem] text-center text-sm">
                    {state.error ? (
                        <div className="inline-flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-1 text-destructive">
                            <XCircle className="h-4 w-4" />
                            <span className="font-medium">{state.error}</span>
                        </div>
                    ) : state.message ? (
                        <div className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-emerald-700">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="font-medium">{state.message}</span>
                        </div>
                    ) : (
                        <span className="text-muted-foreground">
                            {requestSent && "Request sent. You can cancel anytime"}
                        </span>
                    )}
                </div>
            </CardContent>

            <CardFooter className="relative pt-2">
                <form action={formAction} className="w-full">
                    <input type="hidden" name="userId" value={id} />
                    <Button
                        disabled={pending}
                        name="intent"
                        value={requestSent ? "cancel" : "send"}
                        variant={requestSent ? "destructive" : "default"}
                        className={cn(
                            "w-full rounded-xl cursor-pointer",
                            !requestSent && (isCoach ? "bg-violet-600 hover:bg-violet-600/90" : "bg-emerald-600 hover:bg-emerald-600/90")
                        )}
                    >
                        {pending ? (
                            requestSent ? "Canceling..." : "Sending..."
                        ) : requestSent ? (
                            "Cancel request"
                        ) : (
                            <span className="inline-flex items-center gap-2">
                                <UserPlus className="h-4 w-4" />
                                Add Friend
                            </span>
                        )}
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}
