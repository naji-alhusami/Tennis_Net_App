"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import Logo from "../ui/logo";
import { cn } from "@/lib/utils";
import { type NavItems } from "@/lib/types/NavItems";

type MobileSidebarProps = {
  navItems: NavItems;
};

const MobileSidebar = ({ navItems }: MobileSidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            className="cursor-pointer rounded-lg hover:bg-green-50 hover:text-green-700"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[85vw] sm:w-80 flex flex-col p-0 gap-0">
          {/* Header */}
          <SheetHeader className="px-5 py-4 border-b border-gray-100">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <Logo />
          </SheetHeader>

          {/* Nav links */}
          <nav className="flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150",
                    active
                      ? "bg-green-600 text-white shadow-sm"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                  )}
                >
                  {Icon && (
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        active ? "text-white" : "text-gray-400"
                      )}
                    />
                  )}
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-3 py-4 border-t border-gray-100 text-xs text-center text-gray-400">
            Tennis Net Club
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
