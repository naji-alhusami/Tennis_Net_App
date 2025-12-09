"use client";
import { usePathname } from "next/navigation";
import { Menu, LogIn, Home, Calendar, MapPin, Info, DollarSign, MessageSquare } from "lucide-react";

import Logo from "../ui/logo";
import Wrapper from "../ui/wrapper";
import GuestNavbar from "./GuestNavbar";
import UserNavbar from "./UserNavbar";
import { type NavItems } from "@/lib/types/NavItems";

export default function ClientNavbar() {

    const navItems: NavItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/courts", label: "Courts", icon: MapPin },
        { href: "/pricing", label: "Pricing", icon: DollarSign },
        // { href: "/events", label: "Events", icon: Calendar },
        { href: "/about", label: "About", icon: Info },
    ];

    const pathname = usePathname();

    const isLoggedin = pathname === "/user" || pathname === "/auth/role" || pathname === '/player' || pathname === '/couch';

    return <nav className="w-full bg-white sticky z-50">
        <Wrapper className="flex flex-row justify-between items-center h-18 border-b border-gray-300">
            <div>
                <Logo />
            </div>
            <div>
                {!isLoggedin ? <GuestNavbar navItems={navItems} /> : <UserNavbar navItems={navItems} />}
            </div>
        </Wrapper>
    </nav>;
}