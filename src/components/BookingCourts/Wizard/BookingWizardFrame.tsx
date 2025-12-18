// "use client"

// import { AnimatePresence, motion } from "framer-motion"
// import { useMemo } from "react"
// import { useSelectedLayoutSegment } from "next/navigation"

// import CourtSelection from "@/components/BookingCourts/Selection/CourtSelection"
// import DateSelection from "@/components/BookingCourts/Selection/DateSelection"
// // later: TimeSelection, PlayersSelection, ConfirmStep

// const ORDER = ["court", "date", "time", "players", "confirm"] as const
// type StepKey = (typeof ORDER)[number]

// function clampIndex(i: number) {
//     return Math.max(0, Math.min(ORDER.length - 1, i))
// }

// function getStepComponent(key: StepKey) {
//     switch (key) {
//         case "court":
//             return <CourtSelection />
//         case "date":
//             return <DateSelection />
//         // TODO:
//         // case "time": return <TimeSelection />
//         // case "players": return <PlayersSelection />
//         // case "confirm": return <ConfirmStep />
//         default:
//             return <div />
//     }
// }

// export default function BookingWizardFrame() {
//     const seg = (useSelectedLayoutSegment() ?? "court") as StepKey
//     const idx = useMemo(() => clampIndex(ORDER.indexOf(seg)), [seg])

//     const prevKey = idx > 0 ? ORDER[idx - 1] : null
//     const currKey = ORDER[idx]
//     const nextKey = idx < ORDER.length - 1 ? ORDER[idx + 1] : null

//     // Used to slide direction (left on Next, right on Back)
//     return (
//         <div className="w-full">
//             {/* Mobile: ONLY current step, animated */}
//             <div className="md:hidden">
//                 <AnimatePresence mode="wait">
//                     <motion.div
//                         key={currKey}
//                         initial={{ x: 40, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         exit={{ x: -40, opacity: 0 }}
//                         transition={{ duration: 0.22 }}
//                     >
//                         {getStepComponent(currKey)}
//                     </motion.div>
//                 </AnimatePresence>
//             </div>

//             {/* Desktop: prev peek | current | next peek (disabled) */}
//             <div className="hidden md:grid md:grid-cols-3 md:gap-6 md:items-start">
//                 {/* Prev peek */}
//                 <div className="opacity-60 pointer-events-none">
//                     {prevKey ? getStepComponent(prevKey) : <div />}
//                 </div>

//                 {/* Current (animated) */}
//                 <div>
//                     <AnimatePresence mode="wait">
//                         <motion.div
//                             key={currKey}
//                             initial={{ x: 60, opacity: 0 }}
//                             animate={{ x: 0, opacity: 1 }}
//                             exit={{ x: -60, opacity: 0 }}
//                             transition={{ duration: 0.25 }}
//                         >
//                             {getStepComponent(currKey)}
//                         </motion.div>
//                     </AnimatePresence>
//                 </div>

//                 {/* Next peek (disabled) */}
//                 <div className="opacity-40 pointer-events-none select-none">
//                     {nextKey ? getStepComponent(nextKey) : <div />}
//                 </div>
//             </div>
//         </div>
//     )
// }


// "use client"

// import { AnimatePresence, motion } from "framer-motion"
// import { useMemo } from "react"
// import { useSelectedLayoutSegment } from "next/navigation"

// import CourtSelection from "@/components/BookingCourts/Selection/CourtSelection"
// import DateSelection from "@/components/BookingCourts/Selection/DateSelection"
// import { BookingNavButton } from "@/components/BookingCourts/Selection/BookingNextButton"

// const ORDER = ["court", "date", "time", "players", "confirm"] as const
// type StepKey = (typeof ORDER)[number]

// const REQUIRE: Record<StepKey, string[]> = {
//     court: [],
//     date: ["courtType"],
//     time: ["courtType", "date"],
//     players: ["courtType", "date", "time"],
//     confirm: ["courtType", "date", "time", "players"],
// }

// function clampIndex(i: number) {
//     return Math.max(0, Math.min(ORDER.length - 1, i))
// }

// function getStepComponent(key: StepKey) {
//     switch (key) {
//         case "court":
//             return <CourtSelection />
//         case "date":
//             return <DateSelection />
//         default:
//             return <div className="rounded-2xl bg-white/80 p-6">TODO: {key}</div>
//     }
// }

// export default function BookingWizardFrame() {
//     const seg = (useSelectedLayoutSegment() ?? "court") as StepKey
//     const idx = useMemo(() => clampIndex(ORDER.indexOf(seg)), [seg])

//     const prevKey = idx > 0 ? ORDER[idx - 1] : null
//     const currKey = ORDER[idx]
//     const nextKey = idx < ORDER.length - 1 ? ORDER[idx + 1] : null

//     return (
//         <div className="w-full">
//             {/* Current step (animated) */}
//             <AnimatePresence mode="wait">
//                 <motion.div
//                     key={currKey}
//                     initial={{ x: 40, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     exit={{ x: -40, opacity: 0 }}
//                     transition={{ duration: 0.22 }}
//                 >
//                     {getStepComponent(currKey)}
//                 </motion.div>
//             </AnimatePresence>

//             {/* Nav buttons */}
//             <div className="mx-auto w-full max-w-3xl mt-6 rounded-2xl bg-white/90 backdrop-blur-md border shadow-xl p-4">
//                 <div className="flex gap-3">
//                     {prevKey ? (
//                         <BookingNavButton
//                             variant="back"
//                             to={`/booking/${prevKey}`}
//                             label="BACK"
//                         />
//                     ) : (
//                         <div className="w-full" />
//                     )}

//                     {nextKey ? (
//                         <BookingNavButton
//                             variant="next"
//                             to={`/booking/${nextKey}`}
//                             require={REQUIRE[nextKey]}
//                             label="NEXT"
//                         />
//                     ) : (
//                         <BookingNavButton
//                             variant="next"
//                             to={`/booking/confirm`}
//                             require={REQUIRE.confirm}
//                             label="FINISH"
//                         />
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }

"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useMemo } from "react"
import { useSelectedLayoutSegment, useSearchParams } from "next/navigation"

import CourtSelection from "@/components/BookingCourts/Selection/CourtSelection"
import DateSelection from "@/components/BookingCourts/Selection/DateSelection"
import { BookingNavButton } from "@/components/BookingCourts/Selection/BookingNextButton"

const ORDER = ["court", "date", "time", "players", "confirm"] as const
type StepKey = (typeof ORDER)[number]

const REQUIRE: Record<StepKey, string[]> = {
    court: [],
    date: ["courtType"],
    time: ["courtType", "date"],
    players: ["courtType", "date", "time"],
    confirm: ["courtType", "date", "time", "players"],
}

function clampIndex(i: number) {
    return Math.max(0, Math.min(ORDER.length - 1, i))
}

function StepCard({
    children,
    variant,
}: {
    children: React.ReactNode
    variant: "active" | "peek"
}) {
    return (
        <div
            className={[
                "rounded-2xl border bg-white/90 backdrop-blur-md shadow-xl",
                variant === "active" ? "p-6" : "p-4",
            ].join(" ")}
        >
            {children}
        </div>
    )
}

function getStepComponent(key: StepKey, sp: URLSearchParams) {
    switch (key) {
        case "court":
            return <CourtSelection initialCourtType={sp.get("courtType") ?? undefined} />
        case "date":
            return <DateSelection initialDate={sp.get("date") ?? undefined} />
        default:
            return <div className="p-6 text-gray-600">TODO: {key}</div>
    }
}

export default function BookingWizardFrame() {
    const seg = (useSelectedLayoutSegment() ?? "court") as StepKey
    const idx = useMemo(() => clampIndex(ORDER.indexOf(seg)), [seg])

    const prevKey = idx > 0 ? ORDER[idx - 1] : null
    const currKey = ORDER[idx]
    const nextKey = idx < ORDER.length - 1 ? ORDER[idx + 1] : null

    const spHook = useSearchParams()
    const sp = useMemo(() => new URLSearchParams(spHook.toString()), [spHook])

    return (
        <div className="w-full">
            {/* Mobile: only current step */}
            <div className="md:hidden">
                <StepCard variant="active">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currKey}
                            initial={{ x: 40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -40, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                        >
                            {getStepComponent(currKey, sp)}
                        </motion.div>
                    </AnimatePresence>
                </StepCard>
            </div>

            {/* Desktop: prev peek | current | next peek */}
            <div className="hidden md:grid md:grid-cols-3 md:gap-6 md:items-start">
                {/* Prev peek */}
                <div className="opacity-60 pointer-events-none">
                    {prevKey ? (
                        <StepCard variant="peek" key={`peek-prev-${prevKey}`}>
                            {getStepComponent(prevKey, sp)}
                        </StepCard>
                    ) : (
                        <div />
                    )}
                </div>

                {/* Current */}
                <div>
                    <StepCard variant="active">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currKey}
                                initial={{ x: 60, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -60, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                {getStepComponent(currKey, sp)}
                            </motion.div>
                        </AnimatePresence>
                    </StepCard>
                </div>

                {/* Next peek */}
                <div className="opacity-40 pointer-events-none select-none">
                    {nextKey ? (
                        <StepCard variant="peek" key={`peek-next-${nextKey}`}>
                            {getStepComponent(nextKey, sp)}
                        </StepCard>
                    ) : (
                        <div />
                    )}
                </div>
            </div>

            {/* Nav buttons always visible */}
            <div className="mx-auto w-full max-w-3xl mt-6 rounded-2xl bg-white/90 backdrop-blur-md border shadow-xl p-4">
                <div className="flex gap-3">
                    {prevKey ? (
                        <BookingNavButton variant="back" to={`/booking/${prevKey}`} label="BACK" />
                    ) : (
                        <div className="w-full" />
                    )}

                    {nextKey ? (
                        <BookingNavButton
                            variant="next"
                            to={`/booking/${nextKey}`}
                            require={REQUIRE[nextKey]}
                            label="NEXT"
                        />
                    ) : (
                        <BookingNavButton
                            variant="next"
                            to={`/booking/confirm`}
                            require={REQUIRE.confirm}
                            label="FINISH"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
