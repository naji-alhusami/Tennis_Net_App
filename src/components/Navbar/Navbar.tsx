"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Home, Calendar, MapPin, Info, DollarSign, MessageSquare, Users, CalendarCheck, CircleGauge } from "lucide-react";

import Logo from "../ui/logo";
import Wrapper from "../ui/wrapper";
import GuestNavbar from "./GuestNavbar";
import UserNavbar from "./UserNavbar";
import { cn } from "@/lib/utils";
import { type NavItems } from "@/lib/types/NavItems";

export default function Navbar() {
    const { status, data: session } = useSession();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const role = session?.user?.role as "PLAYER" | "COACH" | undefined;

    const publicNavItems: NavItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/courts", label: "Courts", icon: MapPin },
        { href: "/pricing", label: "Pricing", icon: DollarSign },
        { href: "/about", label: "About", icon: Info },
    ];

    const noRoleNavItems: NavItems = [
        { href: "/auth/profile", label: "Complete Profile", icon: Info },
    ];

    const playerNavItems: NavItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/dashboard", label: "Dashboard", icon: CircleGauge },
        { href: "/booking/court", label: "Book Court", icon: Calendar },
        { href: "/find-partner", label: "Find Player/Coach", icon: Users },
        { href: "/chat/conversations", label: "Chat", icon: MessageSquare },
    ];

    const coachNavItems: NavItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/dashboard", label: "Dashboard", icon: CircleGauge },
        { href: "/coach/schedule", label: "Schedule", icon: Calendar },
        { href: "/coach/bookings", label: "Bookings", icon: CalendarCheck },
        { href: "/coach/players", label: "Players", icon: Users },
        { href: "/coach/messages", label: "Messages", icon: MessageSquare },
    ];

    const navClass = cn(
        "w-full bg-white/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-200",
        scrolled ? "shadow-md" : "border-b border-gray-100"
    );

    if (status === "loading") {
        return (
            <nav className={navClass}>
                <Wrapper className="flex flex-row justify-between items-center h-18">
                    <Logo />
                    <div className="h-9 w-40 animate-pulse rounded-md bg-gray-100" />
                </Wrapper>
            </nav>
        );
    }

    let content;
    if (!session) {
        content = <GuestNavbar navItems={publicNavItems} />;
    } else if (!role) {
        content = <UserNavbar navItems={noRoleNavItems} />;
    } else if (role === "PLAYER") {
        content = <UserNavbar navItems={playerNavItems} />;
    } else if (role === "COACH") {
        content = <UserNavbar navItems={coachNavItems} />;
    }

    return (
        <nav className={navClass}>
            <Wrapper className="flex flex-row justify-between items-center h-18">
                <Logo />
                {content}
            </Wrapper>
        </nav>
    );
}
