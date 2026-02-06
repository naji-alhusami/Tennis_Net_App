"use client";
import { usePathname } from "next/navigation";
import { CirclePlus, Search, X } from "lucide-react";

import ChatNavigation from "@/components/Chat/ChatNavigation";
import Wrapper from "@/components/ui/wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type ReactNode } from "react";
import ChatRightSide from "@/components/Chat/ChatRightSide";


export default function ChatListLayout({ children }: { children: ReactNode }) {
    const getChatTitle = (pathname: string) => {
        if (pathname === "/chat/conversations") return "Conversations";
        if (pathname.startsWith("/chat/friends")) return "Friends";
        return "Chat";
    }

    const pathname = usePathname();
    const title = getChatTitle(pathname);
    //  border-r border-border/60
    return (
        // <div className="flex flex-row">
        //     <div className="pr-5 md:px-12 xl:px-30">
        //         <div className="border-r border-border/60 max-w-6xl">
        <div className="flex flex-row">
            <div className="border-r border-border/60">
                <div className="max-w-6xl pr-8 pl-6">
                    <div className="flex items-center justify-between pt-4">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        {/* <CirclePlus className="bg-green-500 text-white rounded-xl" /> */}
                    </div>

                    <div className="py-5">
                        <div className="relative w-full md:max-w-sm">
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
                    </div>
                    {children}
                    <div>
                        <ChatNavigation />
                    </div>
                </div>
            </div>
            <div className="hidden sm:flex flex-1">
                <ChatRightSide />
            </div>
        </div>
    );
}
