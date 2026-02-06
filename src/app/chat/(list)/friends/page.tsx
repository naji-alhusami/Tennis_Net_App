import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { BadgeCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getMyFriends } from "@/lib/data/getMyFriends"
import { getNameInitials } from "@/lib/utils/getNameInitials"
import Link from "next/link"

export default async function FriendsChatPage() {
    const session = await auth()
    if (!session?.user) redirect("/")

    const allFriends = await getMyFriends(session?.user.id)

    return (
        <div className="flex flex-col gap-4 w-full">
            {allFriends.map((friend) => {
                const isCoach = friend.role === "COACH"
                return (
                    <Link
                        key={friend.id}
                        href={`/chat/conversations/${friend.id}`}
                        className={cn(
                            "h-20 w-full rounded-xl border p-3",
                            "hover:bg-accent hover:text-accent-foreground",
                            "transition cursor-pointer"
                        )}
                    >
                        <div className="flex gap-3 items-center">
                            <Avatar size="lg" className="h-12 w-12">
                                <AvatarImage src={friend.image ?? undefined} alt={friend.name ?? "Friend"} />
                                <AvatarFallback>{getNameInitials(friend.name ?? friend.email)}</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col w-full">
                                {/* Name + role */}
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex flex-col">
                                        <h1 className="text-lg font-semibold">{friend.name}</h1>
                                        <p className="text-muted-foreground text-xs">Tap To Start Chat</p>
                                    </div>
                                    <div className="mt-1">
                                        <Badge
                                            variant="secondary"
                                            className={cn(
                                                "gap-1 border w-fit",
                                                isCoach
                                                    ? "border-violet-200/60 bg-violet-500/10 text-violet-700"
                                                    : "border-emerald-200/60 bg-emerald-500/10 text-emerald-700"
                                            )}
                                        >
                                            <BadgeCheck className="h-3.5 w-3.5" />
                                            {isCoach ? "Coach" : "Player"}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>)
}
