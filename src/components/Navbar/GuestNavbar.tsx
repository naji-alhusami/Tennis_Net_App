"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

import MobileSidebar from "./MobileSidebar";
import { cn } from "@/lib/utils";
import { type NavItems } from "@/lib/types/NavItems";

type GuestNavbarProps = {
    navItems: NavItems;
};

const GuestNavbar = ({ navItems }: GuestNavbarProps) => {
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

            {/* Desktop auth buttons */}
            <div className="hidden lg:flex items-center gap-2">
                <Link
                    href="/auth/login"
                    className="px-4 py-2 rounded-lg border border-green-500 text-sm font-semibold text-gray-700 hover:border-green-500 hover:text-green-700 hover:bg-green-50 transition-all"
                >
                    Login
                </Link>
                <Link
                    href="/auth/signup"
                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white text-sm font-semibold transition-all shadow-sm"
                >
                    Signup
                </Link>
            </div>

            {/* Mobile: outlined Login + hamburger */}
            <div className="flex lg:hidden items-center gap-2">
                <Link
                    href="/auth/login"
                    className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:border-green-500 hover:text-green-700 transition-all"
                >
                    Login
                </Link>
                <MobileSidebar navItems={navItems} />
            </div>
        </div>
    );
};

export default GuestNavbar;
