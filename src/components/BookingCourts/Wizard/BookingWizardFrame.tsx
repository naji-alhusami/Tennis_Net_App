"use client"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

import { BOOKING_STEPS, type StepKey } from "@/lib/data/steps"
import CourtSelection from "@/components/BookingCourts/Selection/1-CourtSelection"
import DateSelection from "@/components/BookingCourts/Selection/2-DateSelection"
import TimeSelection from "@/components/BookingCourts/Selection/3-TimeSelection"
import PlayersSelection from "@/components/BookingCourts/Selection/4-PlayersSelection"
import ConfirmSelection from "@/components/BookingCourts/Selection/5-ConfirmSelection"
import { WizardShell } from "@/components/BookingCourts/Wizard/WizardShell"
import { type PlayerLite, type UserLite } from "@/lib/types/Booking"

export default function BookingWizardFrame({
    step,
    allFriends,
    selectedPlayers,
    bookedTimes,
    reservedDates,
    busyPlayerIds
}: {
    step: StepKey
    allFriends: UserLite[]
    selectedPlayers: PlayerLite[]
    bookedTimes: string[]
    reservedDates: string[]
    busyPlayerIds: string[]
}) {
    const ORDER = useMemo(() => BOOKING_STEPS.map((step) => step.key), []) // ["court","date","time","players","confirm"]

    // to get the index of order
    const orderId = useMemo(() => ORDER.indexOf(step), [step, ORDER])

    const prevKey = orderId > 0 ? ORDER[orderId - 1] : null
    const nextKey = orderId < ORDER.length - 1 ? ORDER[orderId + 1] : null

    // Using searchParams to handle going right or left,  right it __dir === 1, left id __dir=== -1
    const searchParams = useSearchParams()
    // Number to convert string to number (everything from searchParams is string)
    const direction = useMemo(() => (Number(searchParams.get("__dir") ?? "1") === -1 ? -1 : 1), [searchParams])

    const renderStep = (step: string) => {
        switch (step as StepKey) {
            case "court":
                return <CourtSelection />
            case "date":
                return <DateSelection reservedDates={reservedDates} />
            case "time":
                return <TimeSelection bookedTimes={bookedTimes} />
            case "players":
                return <PlayersSelection allFriends={allFriends} max={3} busyPlayerIds={busyPlayerIds} />
            case "confirm":
                return <ConfirmSelection selectedPlayers={selectedPlayers} />
            default:
                return null
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
