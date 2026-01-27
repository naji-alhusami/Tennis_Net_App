import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getNameInitials } from "@/lib/utils/getNameInitials";
import { LogOut, User } from "lucide-react";
import NextLink from "next/link"

export default function AvatarDropdown() {
    const { data: session } = useSession()

    const userLabel = session?.user?.name ?? session?.user?.email ?? null
    const userInitials = getNameInitials(userLabel)
    const image = session?.user?.image ?? undefined

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full cursor-pointer"
                    aria-label="Open user menu"
                >
                    <Avatar className="h-9 w-9">
                        <AvatarImage
                            src={image}
                            alt={userLabel ?? "User"}
                        />
                        <AvatarFallback
                            className="bg-cyan-600 text-white font-semibold text-md ring-2 ring-green-200"
                        >
                            {userInitials}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <NextLink href="/auth/profile" className="flex items-center gap-2 font-semibold">
                            <User className="h-4 w-4 text-black" />
                            Profile
                        </NextLink>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="flex items-center gap-2 text-red-600 focus:text-red-600 font-semibold cursor-pointer"
                    onSelect={(e) => {
                        e.preventDefault()
                        signOut({ callbackUrl: "/auth/login" })
                    }}
                >
                    <LogOut className="h-4 w-4 text-black" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
