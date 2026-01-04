"use client"

import { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const COURT_TYPES = ["CLAY", "HARD"] as const
type CourtType = (typeof COURT_TYPES)[number]

const COURT_LOCATIONS = ["INDOOR", "OUTDOOR"] as const
type CourtLocation = (typeof COURT_LOCATIONS)[number]

export default function CourtSelection() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Court Type Param and Value
    const courtTypeParam = searchParams.get("courtType")
    const courtTypeValue =
        courtTypeParam && COURT_TYPES.includes(courtTypeParam as CourtType)
            ? (courtTypeParam as CourtType)
            : ""

    // Court Location Param and Value
    const courtLocationParam = searchParams.get("courtLocation")
    const courtLocationValueRaw =
        courtLocationParam && COURT_LOCATIONS.includes(courtLocationParam as CourtLocation)
            ? (courtLocationParam as CourtLocation)
            : ""

    // Disbale Selecting Court Location Until Selecting Court Type
    const locationDisabled = courtTypeValue === "" || courtTypeValue === "CLAY"

    // Auto-clean invalid URL params + enforce CLAY => OUTDOOR
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        let changed = false

        const courtType = params.get("courtType")
        const courtLocation = params.get("courtLocation")

        const isTypeValid = courtType && COURT_TYPES.includes(courtType as CourtType)
        const isLocationValid =
            courtLocation && COURT_LOCATIONS.includes(courtLocation as CourtLocation)

        // Remove invalid courtType
        if (courtType && !isTypeValid) {
            params.delete("courtType")
            changed = true
        }

        // Remove invalid courtLocation
        if (courtLocation && !isLocationValid) {
            params.delete("courtLocation")
            changed = true
        }

        // Re-read after potential deletions
        const finalType = params.get("courtType")
        const finalLoc = params.get("courtLocation")

        // if no courtType, courtLocation must not exist
        if (!finalType && finalLoc) {
            params.delete("courtLocation")
            changed = true
        }

        // Enforce CLAY => OUTDOOR
        if (finalType === "CLAY") {
            if (params.get("courtLocation") !== "OUTDOOR") {
                params.set("courtLocation", "OUTDOOR")
                changed = true
            }
        }

        if (!changed) return

        const qs = params.toString()
        router.replace(qs ? `${pathname}?${qs}` : pathname)
    }, [searchParams, pathname, router])

    // Handle Selecting the Court Type
    const onCourtTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (COURT_TYPES.includes(value as CourtType)) {
            params.set("courtType", value)

            // Enforce CLAY rule immediately
            if (value === "CLAY") {
                params.set("courtLocation", "OUTDOOR")
            }

        }

        const qs = params.toString()
        router.replace(qs ? `${pathname}?${qs}` : pathname)
    }

    // Handle Selecting the Court Location
    const onCourtLocationChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (COURT_LOCATIONS.includes(value as CourtLocation)) {
            params.set("courtLocation", value)
        }

        const qs = params.toString()
        router.replace(qs ? `${pathname}?${qs}` : pathname)
    }

    return (
        <div className="relative z-10 grid place-items-center w-full">
            <div className="w-full max-w-lg bg-white p-8 sm:p-10">
                {/* Court Type */}
                <Select value={courtTypeValue} onValueChange={onCourtTypeChange}>
                    <SelectTrigger className="w-full mb-10">
                        <SelectValue placeholder="Select Court Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="CLAY">CLAY</SelectItem>
                        <SelectItem value="HARD">HARD</SelectItem>
                    </SelectContent>
                </Select>

                {/* Court Location */}
                <Select
                    value={courtLocationValueRaw}
                    onValueChange={onCourtLocationChange}
                    disabled={locationDisabled}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Court Location" />
                    </SelectTrigger>
                    <SelectContent>
                        {courtTypeValue === "HARD" && (
                            <SelectItem value="INDOOR">INDOOR</SelectItem>
                        )}
                        <SelectItem value="OUTDOOR">OUTDOOR</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
