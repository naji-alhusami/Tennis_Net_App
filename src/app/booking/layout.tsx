// "use client"
// import { type ReactNode } from "react"
// import { useSelectedLayoutSegment } from "next/navigation"
// import BookingSteps from "@/components/BookingCourts/BookingSteps"
// import PatternBackground from "@/components/layout/PatternBackground"
// import Image from "next/image"

// const STEP_BY_SEGMENT: Record<string, number> = {
//   "": 0,        // /booking (page.tsx)
//   time: 1,      // /booking/time
//   players: 2,   // /booking/players
//   confirm: 3,   // /booking/confirm
// }

// export default function BookingLayout({ children }: { children: ReactNode }) {
//   const segment = useSelectedLayoutSegment() ?? ""
//   const currentStep = STEP_BY_SEGMENT[segment] ?? 0

//   return <PatternBackground opacity={0.06} size={280}>
//     <section className="w-full max-w-none p-5 md:px-13 xl:px-32">
//       <BookingSteps currentStep={currentStep} />
//       <Image src='/background1.jpg' alt="background" width={900} height={900}   />
//       {children}
//     </section>
//   </PatternBackground>
// }

// "use client"

// import { type ReactNode } from "react"
// import { useSelectedLayoutSegment } from "next/navigation"
// import BookingSteps from "@/components/BookingCourts/Steps/BookingSteps"
// import Image from "next/image"

// const STEP_BY_SEGMENT: Record<string, number> = {
//   court: 0,
//   date: 1,
//   time: 2,
//   players: 3,
//   confirm: 4,
// }

// export default function BookingLayout({ children }: { children: ReactNode }) {
//   const segment = useSelectedLayoutSegment() ?? ""
//   const currentStep = STEP_BY_SEGMENT[segment] ?? 0

//   return (
//     <>
//       <div className="relative min-h-screen">
//         {/* Background image */}
//         <Image
//           src="/courses.jpg"
//           alt="background"
//           fill
//           priority
//           className="object-cover opacity-90 pointer-events-none"
//         />

//         {/* Content */}
//         <section className="relative z-10 w-full max-w-none p-5 md:px-13 xl:px-32">
//           <BookingSteps currentStep={currentStep} />
//           {children}
//         </section>
//       </div>
//     </>
//   )
// }


// "use client"
// import Image from "next/image"
// import { type ReactNode } from "react"
// import { useSelectedLayoutSegment } from "next/navigation"
// import BookingSteps from "@/components/BookingCourts/Steps/BookingSteps"
// import BookingWizardFrame from "@/components/BookingCourts/Wizard/BookingWizardFrame"

// const STEP_BY_SEGMENT: Record<string, number> = {
//   court: 0,
//   date: 1,
//   time: 2,
//   players: 3,
//   confirm: 4,
// }

// export default function BookingLayout({ children }: { children: ReactNode }) {
//   const segment = useSelectedLayoutSegment() ?? "court"
//   const currentStep = STEP_BY_SEGMENT[segment] ?? 0

//   return (
//     <section className="w-full max-w-none p-5 md:px-13 xl:px-32 space-y-6">
//       <Image
//         src="/courses.jpg"
//         alt="background"
//         fill
//         priority
//         className="object-cover opacity-90 pointer-events-none"
//       />
//       <BookingSteps currentStep={currentStep} />

//       {/* Wizard UI */}
//       <BookingWizardFrame />

//       {/* Keep children if you still want route pages to render something.
//           If you use the wizard frame as the renderer, you can remove {children}. */}
//       {/* {children} */}
//     </section>
//   )
// }


"use client"
import Image from "next/image"
import { type ReactNode } from "react"
import { useSelectedLayoutSegment } from "next/navigation"
import BookingSteps from "@/components/BookingCourts/Steps/BookingSteps"

const STEP_BY_SEGMENT: Record<string, number> = {
  court: 0,
  date: 1,
  time: 2,
  players: 3,
  confirm: 4,
}

export default function BookingLayout({ children }: { children: ReactNode }) {
  const segment = useSelectedLayoutSegment() ?? "court"
  console.log("segment:", segment)
  console.log("  useSelectedLayoutSegment():", useSelectedLayoutSegment())
  const currentStep = STEP_BY_SEGMENT[segment] ?? 0
  console.log("currentStep:", currentStep)

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Image
        src="/courses.jpg"
        alt="background"
        fill
        priority
        className="object-cover opacity-90 pointer-events-none -z-10"
      />

      {/* <section className="relative z-10 w-full max-w-none p-5 md:px-13 xl:px-32 space-y-6">
        <BookingSteps currentStep={currentStep} />
        {children}
      </section> */}
      <section className="relative z-10 mx-auto w-full max-w-none px-4 pb-28 pt-4 space-y-6">
        <BookingSteps currentStep={currentStep} />

        <div className="w-full rounded-2xl bg-white border shadow-sm p-4">
          {children}
        </div>
      </section>
    </div>
  )
}
