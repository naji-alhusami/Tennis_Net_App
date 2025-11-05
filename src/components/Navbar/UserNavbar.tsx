"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import MobileSidebar from "./MobileSidebar";
import MessagesSidebar from "./MessagesSidebar";
import { type NavItems } from "@/types/NavItems";

type GuestNavbarProps = {
    navItems: NavItems;
};

const UserNavbar = ({ navItems }: GuestNavbarProps) => {
    const pathname = usePathname()

    return <div>
        <div className="flex flex-row items-center gap-1">
            <div className="hidden lg:flex lg:gap-x-4">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const active = pathname === href;
                    return (
                        <Button
                            key={href}
                            asChild
                            variant={active ? "secondary" : "ghost"}
                            className={cn(
                                "justify-start",
                                active && "bg-green-200 hover:bg-green-300 font-bold"
                            )}
                        >
                            <Link href={href} aria-current={active ? "page" : undefined}>
                                {Icon ? <Icon className="mr-1 h-4 w-4" /> : null}
                                {label}
                            </Link>
                        </Button>
                    );
                })}
            </div>
            <span
                className="hidden lg:flex h-6 w-px bg-gray-300"
                aria-hidden="true"
            />
            <div className="px-2">
                <MessagesSidebar />
            </div>
            <Button asChild variant="ghost" size="sm" className="px-2">
                <Link href="/login" aria-label="Log in">
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:whitespace-nowrap">Logout</span>
                </Link>
            </Button>
            <span
                className="flex h-6 w-px bg-gray-300 md:hidden"
                aria-hidden="true"
            />
            <MobileSidebar navItems={navItems} />
        </div>
    </div>
}

export default UserNavbar