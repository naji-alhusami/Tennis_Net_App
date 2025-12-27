"use client"

import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { useSelectedLayoutSegment, useSearchParams } from "next/navigation"
import { useMemo } from "react"

import CourtSelection from "@/components/BookingCourts/Selection/CourtSelection"
import DateSelection from "@/components/BookingCourts/Selection/DateSelection"
import TimeSelection from "../Selection/TimeSelection"

const ORDER = ["court", "date", "time", "players", "confirm"] as const
type StepKey = (typeof ORDER)[number]

function getStepComponent(step: StepKey) {
    switch (step) {
        case "court":
            return <CourtSelection />
        case "date":
            return <DateSelection />
        default:
            return <TimeSelection />
    }
}

function StepCard({
    title,
    children,
    disabled = false,
}: {
    title: string
    children: React.ReactNode
    disabled?: boolean
}) {
    return (
        <div
            className={[
                "rounded-2xl bg-white border shadow-sm overflow-hidden",
                disabled ? "opacity-50 pointer-events-none select-none" : "",
            ].join(" ")}
        >
            <h1 className="font-bold text-center uppercase py-5 text-lg px-4 border-b">
                {title}
            </h1>
            <div className="px-4 py-4">{children}</div>
        </div>
    )
}

const cardVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 60 : -60,
        opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
        x: direction > 0 ? -60 : 60,
        opacity: 0,
    }),
}

const xlPeek = {
    enter: ({ dir }: { dir: number; dim: boolean }) => ({
        x: dir > 0 ? 40 : -40,
        opacity: 0,
        scale: 0.98,
    }),
    center: ({ dim }: { dir: number; dim: boolean }) => ({
        x: 0,
        opacity: dim ? 0.55 : 1,
        scale: dim ? 0.98 : 1,
    }),
    exit: ({ dir }: { dir: number; dim: boolean }) => ({
        x: dir > 0 ? -40 : 40,
        opacity: 0,
        scale: 0.98,
    }),
}

export default function BookingWizardFrame() {
    const segment = (useSelectedLayoutSegment() ?? "court") as StepKey
    const idx = useMemo(() => Math.max(0, ORDER.indexOf(segment)), [segment])

    const prevKey = idx > 0 ? ORDER[idx - 1] : null
    const nextKey = idx < ORDER.length - 1 ? ORDER[idx + 1] : null

   
    const sp = useSearchParams()
    const direction = useMemo(() => {
        const v = Number(sp.get("__dir") ?? "1")
        return v === -1 ? -1 : 1
    }, [sp])

    return (
        <div className="w-full">
            {/*  Mobile */}
            <div className="lg:hidden relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={segment}
                        custom={direction}
                        variants={cardVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.28, ease: "easeOut" }}
                    >
                        <StepCard title={`SELECT YOUR ${segment}`}>
                            {getStepComponent(segment)}
                        </StepCard>
                    </motion.div>
                </AnimatePresence>
            </div>

            <LayoutGroup id="booking-wizard-xl">
                <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:items-start">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {/* Left slot */}
                        <div key="slot-left" className="min-w-0">
                            {prevKey ? (
                                <motion.div
                                    key={`card-${prevKey}`}
                                    layout
                                    layoutId={`step-${prevKey}`}
                                    custom={{ dir: direction, dim: true }}
                                    variants={xlPeek}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ type: "spring", stiffness: 520, damping: 40 }}
                                    style={{ originY: 0 }}
                                    className="will-change-transform"
                                >
                                    <StepCard title={`SELECT YOUR ${prevKey}`} disabled>
                                        {getStepComponent(prevKey)}
                                    </StepCard>
                                </motion.div>
                            ) : (
                                <div />
                            )}
                        </div>

                        {/* Middle slot */}
                        <div key="slot-mid" className="min-w-0">
                            <motion.div
                                key={`card-${segment}`}
                                layout
                                layoutId={`step-${segment}`}
                                custom={{ dir: direction, dim: false }}
                                variants={xlPeek}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "spring", stiffness: 520, damping: 40 }}
                                className="will-change-transform"
                            >
                                <StepCard title={`SELECT YOUR ${segment}`}>
                                    {getStepComponent(segment)}
                                </StepCard>
                            </motion.div>
                        </div>

                        {/* Right slot */}
                        <div key="slot-right" className="min-w-0">
                            {nextKey ? (
                                <motion.div
                                    key={`card-${nextKey}`} 
                                    layout
                                    layoutId={`step-${nextKey}`}
                                    custom={{ dir: direction, dim: true }}
                                    variants={xlPeek}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ type: "spring", stiffness: 520, damping: 40 }}
                                    style={{ originY: 0 }}
                                    className="will-change-transform"
                                >
                                    <StepCard title={`SELECT YOUR ${nextKey}`} disabled>
                                        {getStepComponent(nextKey)}
                                    </StepCard>
                                </motion.div>
                            ) : (
                                <div />
                            )}
                        </div>
                    </AnimatePresence>
                </div>
            </LayoutGroup>
        </div>
    )
}
