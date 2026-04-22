"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import MobileSidebar from "./MobileSidebar";
import MessagesSidebar from "./MessagesSidebar";
import AvatarMenu from "./AvatarMenu";
import { type NavItems } from "@/lib/types/NavItems";

type UserNavbarProps = {
    navItems: NavItems;
};

const UserNavbar = ({ navItems }: UserNavbarProps) => {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-3">
            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const active = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150",
                                active
                                    ? "bg-green-50 text-green-700 font-semibold"
                                    : "text-gray-600 hover:text-green-700 hover:bg-green-50"
                            )}
                        >
                            {Icon && <Icon className="h-4 w-4 shrink-0" />}
                            {label}
                        </Link>
                    );
                })}
            </nav>

            <span className="hidden lg:block h-6 w-px bg-gray-200" aria-hidden="true" />

            {/* Actions */}
            <div className="flex items-center gap-1">
                <MessagesSidebar />
                <AvatarMenu />
                <span className="h-6 w-px bg-gray-200 mx-1 lg:hidden" aria-hidden="true" />
                <MobileSidebar navItems={navItems} />
            </div>
        </div>
    );
};

export default UserNavbar;
