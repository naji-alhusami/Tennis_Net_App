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
import { cn } from "@/lib/utils";
import { type NavItems } from "@/types/NavItem";

type MobileSidebarProps = {
  navItems: NavItems;
};


const MobileSidebar = ({ navItems }: MobileSidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open navigation menu" className="cursor-pointer">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[88vw] sm:w-96">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <nav className="mt-4 flex flex-col gap-1 px-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Button
                key={href}
                asChild
                variant={active ? "secondary" : "ghost"}
                className={cn(
                  "justify-start",
                  active && "bg-green-200 font-semibold hover:bg-green-300 font-bold"
                )}
              >
                <Link href={href} aria-current={active ? "page" : undefined}>
                  {Icon ? <Icon className="mr-3 h-4 w-4" /> : null}
                  {label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
    </div>
  )
}

export default MobileSidebar