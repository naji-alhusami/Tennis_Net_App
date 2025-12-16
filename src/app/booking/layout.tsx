"use client"
import { type ReactNode } from "react"
import { useSelectedLayoutSegment } from "next/navigation"
import BookingSteps from "@/components/BookingCourts/BookingSteps"
import PatternBackground from "@/components/layout/PatternBackground"
// import Image from "next/image"

const STEP_BY_SEGMENT: Record<string, number> = {
  "": 0,        // /booking (page.tsx)
  time: 1,      // /booking/time
  players: 2,   // /booking/players
  confirm: 3,   // /booking/confirm
}

export default function BookingLayout({ children }: { children: ReactNode }) {
  const segment = useSelectedLayoutSegment() ?? ""
  const currentStep = STEP_BY_SEGMENT[segment] ?? 0

  return <PatternBackground opacity={0.06} size={280}>
    <section className="w-full max-w-none p-5 md:px-13 xl:px-32">
      <BookingSteps currentStep={currentStep} />
      {/* <Image src='/background1' alt="background" width={100} height={100}  /> */}
      {children}
    </section>
  </PatternBackground>
}