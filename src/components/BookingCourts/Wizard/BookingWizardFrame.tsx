"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

import CourtSelection from "@/components/BookingCourts/Selection/CourtSelection"
import DateSelection from "@/components/BookingCourts/Selection/DateSelection"
import TimeSelection from "@/components/BookingCourts/Selection/TimeSelection"
import { WizardShell } from "@/components/BookingCourts/Wizard/WizardShell"
import { useBookingWizardState } from "@/components/BookingCourts/Wizard/useBookingWizardState"
import PlayersSelection from "@/components/BookingCourts/Selection/PlayersSelection"

const ORDER = ["court", "date", "time", "players", "confirm"] as const
export type StepKey = (typeof ORDER)[number]

export default function BookingWizardFrame({ segment }: { segment: StepKey }) {
    const idx = useMemo(() => Math.max(0, ORDER.indexOf(segment)), [segment])

    const prevKey = idx > 0 ? ORDER[idx - 1] : null
    const nextKey = idx < ORDER.length - 1 ? ORDER[idx + 1] : null

    const sp = useSearchParams()
    const direction = useMemo(() => (Number(sp.get("__dir") ?? "1") === -1 ? -1 : 1), [sp])

    const state = useBookingWizardState()

    const renderStep = (step: string) => {
        switch (step as StepKey) {
            case "court":
                return <CourtSelection />

            case "date":
                return <DateSelection />

            case "time":
                return (
                    <TimeSelection
                        selectedDate={state.selectedDate}
                        values={state.selectedTimes}
                        onToggle={state.toggleTime}
                        bookedTimes={[]}
                        stepMinutes={30}
                    />
                )

            case "players":
                return <PlayersSelection />

            case "confirm":
                return <div className="p-6">TODO: Confirm UI</div>

            default:
                return <div className="p-6">TODO: {step}</div>
        }
    }

    return (
        <WizardShell
            segment={segment}
            prevKey={prevKey}
            nextKey={nextKey}
            direction={direction}
            renderStep={renderStep}
        />
    )
}
