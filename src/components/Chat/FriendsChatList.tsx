// components/chat/FriendsChatList.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { getNameInitials } from "@/lib/utils/getNameInitials"

type Friend = {
    id: string
    name: string | null
    image?: string | null
}

export default function FriendsChatList({
    friends,
    currentUserId,
}: {
    friends: Friend[]
    currentUserId: string
}) {
    if (!friends.length) {
        return (
            <p className="text-sm text-muted-foreground">
                You have no friends yet.
            </p>
        )
    }

    return (
        <ul className="divide-y divide-border">
            {friends.map((friend) => (
                <li key={friend.id}>
                    <Link
                        href={`/chat/conversations/${friend.id}`}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3",
                            "hover:bg-muted transition"
                        )}
                    >
                        {/* Avatar */}
                        <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                            {friend.image ? (
                                <Image
                                    src={friend.image}
                                    alt={friend.name ?? "User"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <span className="text-sm font-medium">
                                    {getNameInitials(friend.name)}
                                </span>
                            )}
                        </div>

                        {/* Name + preview */}
                        <div className="flex flex-col">
                            <span className="font-medium leading-tight">
                                {friend.name ?? "Unknown user"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                Tap to start chatting
                            </span>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
