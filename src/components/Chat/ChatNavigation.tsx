"use client"
import { MessageSquare, Moon, Sun, UsersRound } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ChatNavigation() {
    const pathname = usePathname();
    const isActive = (href: string) => {
        if (href === "/chat") {
            return pathname === "/chat";
        }
        return pathname.startsWith(href);
    };

    return <div className="fixed bottom-0 left-0 right-0 border-t bg-white/95 backdrop-blur">
        <div className="py-3 flex items-center justify-center gap-8">
            <Link href="/chat">
                <Button
                    size="icon"
                    variant={isActive("/chat") ? "default" : "secondary"}
                    className={`h-12 w-12 transition-colors ${isActive("/chat")
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : ""
                        }`}
                >
                    <MessageSquare className="h-6 w-6" />
                </Button>
            </Link>
            <Link href="/chat/friends">
                <Button
                    size="icon"
                    variant={isActive("/chat/friends") ? "default" : "secondary"}
                    className={`h-12 w-12 transition-colors ${isActive("/chat/friends")
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : ""
                        }`}
                >
                    <UsersRound className="h-6 w-6" />
                </Button>
            </Link>
            {/* TODO: Dark and Sun Mode */}
            <Button variant="secondary" size="icon">
                <Sun />
            </Button>
            <Button variant="secondary" size="icon">
                <Moon />
            </Button>
            {/*  */}
        </div>
    </div>
}