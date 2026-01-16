"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

import CourtSelection from "@/components/BookingCourts/Selection/1-CourtSelection"
import DateSelection from "@/components/BookingCourts/Selection/2-DateSelection"
import TimeSelection from "@/components/BookingCourts/Selection/3-TimeSelection"
import PlayersSelection from "@/components/BookingCourts/Selection/4-PartnersSelection"
import { WizardShell } from "@/components/BookingCourts/Wizard/WizardShell"
import ConfirmSelection from "../Selection/5-ConfirmSelection"

const ORDER = ["court", "date", "time", "players", "confirm"] as const
export type StepKey = (typeof ORDER)[number]

export type User = {
    id: string
    name: string | null
    image: string | null
    email: string | null
}

export type PlayerLite = {
    id: string
    name: string | null
}

export default function BookingWizardFrame({
    step,
    allFriends,
    selectedPlayers,
    bookedTimes,
    reservedDates,
    busyPlayerIds
}: {
    step: StepKey
    allFriends: User[]
    selectedPlayers: PlayerLite[]
    bookedTimes: string[]
    reservedDates: string[]
    busyPlayerIds: string[]
}) {
    const idx = useMemo(() => Math.max(0, ORDER.indexOf(step)), [step])
    const prevKey = idx > 0 ? ORDER[idx - 1] : null
    const nextKey = idx < ORDER.length - 1 ? ORDER[idx + 1] : null

    const sp = useSearchParams()
    const direction = useMemo(() => (Number(sp.get("__dir") ?? "1") === -1 ? -1 : 1), [sp])

    const renderStep = (step: string) => {
        switch (step as StepKey) {
            case "court":
                return <CourtSelection />

            case "date":
                return <DateSelection reservedDates={reservedDates} />

            case "time":
                return (
                    <TimeSelection bookedTimes={bookedTimes} />
                )

            case "players":
                return <PlayersSelection allFriends={allFriends} max={3} busyPlayerIds={busyPlayerIds} />

            case "confirm":
                return <ConfirmSelection selectedPlayers={selectedPlayers} />

            default:
                return <div className="p-6">TODO: {step}</div>
        }
    }

    return (
        <WizardShell
            step={step}
            prevKey={prevKey}
            nextKey={nextKey}
            direction={direction}
            renderStep={renderStep}
        />
    )
}
