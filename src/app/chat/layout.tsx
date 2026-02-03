"use client"
import ChatNavigation from "@/components/Chat/ChatNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Wrapper from "@/components/ui/wrapper";
import { CirclePlus, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";


function getChatTitle(pathname: string) {
    if (pathname === "/chat") return "Conversations";
    if (pathname.startsWith("/chat/friends")) return "Friends";
    if (pathname.startsWith("/chat/conversations")) return "Chat";
    return "Chat";
}

export default function ChatLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const title = getChatTitle(pathname);

    return (
        <Wrapper className="pr-8">
            <div className="flex items-center justify-between pt-4">
                <h1 className="text-2xl font-bold">{title}</h1>
                <CirclePlus className="bg-green-500 text-white rounded-xl" />
            </div>
            <div className="py-5" >
                <div className="relative w-full md:max-w-sm" >
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search by name …"
                        className="pl-9 bg-muted/30 border border-border/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-primary/25"
                    />
                    <Button
                        type="button"
                        variant="link"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                        aria-label="Clear search"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div >
            {children}
            <ChatNavigation />
        </Wrapper>
    )
}