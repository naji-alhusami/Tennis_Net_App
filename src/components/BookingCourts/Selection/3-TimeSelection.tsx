"use client"

import { useEffect, useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { twoDigitNumber } from "@/lib/utils/date"

// =========
//  HELPERS
// =========

// "HH:MM" -> minutes since midnight (To check if a time is in the past)
function toMinutes(hhmm: string) {
    const [h, m] = hhmm.split(":").map(Number)
    return h * 60 + m
}

// Build time slots (From 08:00 to 22:00)
function buildTimes(stepMinutes = 60, start = "08:00", end = "22:00") {
    const out: string[] = []
    let cur = toMinutes(start)
    const endMin = toMinutes(end)

    while (cur < endMin) {
        const h = Math.floor(cur / 60)
        const m = cur % 60
        out.push(`${twoDigitNumber(h)}:${twoDigitNumber(m)}`)
        cur += stepMinutes
    }
    return out
}

// It checks whether two dates are on the same calendar day
function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    )
}

// If selected date is today, block times earlier than "now"
function isPastSlotToday(selectedDate: Date, slotTime: string, now = new Date()) {
    if (!isSameDay(selectedDate, now)) return false
    return toMinutes(slotTime) < now.getHours() * 60 + now.getMinutes()
}


// URL "YYYY-MM-DD" -> Date in local time
function parseLocalDate(iso: string | null) {
    if (!iso) return null
    const [y, m, d] = iso.split("-").map(Number)
    if (!y || !m || !d) return null
    return new Date(y, m - 1, d)
}

// For display header: Date -> "YYYY-MM-DD"
function formatYYYYMMDD(d: Date) {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${day}`
}

// Decide whether a time is allowed right now
function isInvalidTime({
    time,
    timesSet,
    bookedSet,
    selectedDate,
    now,
}: {
    time: string
    timesSet: Set<string>
    bookedSet: Set<string>
    selectedDate: Date
    now: Date
}) {
    // Not even part of the generated slots
    if (!timesSet.has(time)) return true

    // Already reserved/booked
    if (bookedSet.has(time)) return true

    // In the past (only matters if selected day is today)
    if (isPastSlotToday(selectedDate, time, now)) return true

    return false
}

// ===== COMPONENT =====
export default function TimeSelection({
    bookedTimes,
}: {
    bookedTimes?: string[]
}) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    // Times Slot 60min from 08:00..22:00
    const times = useMemo(() => buildTimes(60, "08:00", "22:00"), [])
    const timesSet = useMemo(() => new Set(times), [times])

    // Booked times fetched from MongoDB
    const bookedSet = useMemo(() => new Set(bookedTimes), [bookedTimes])

    // Date comes from URL
    const selectedDate = useMemo(() => {
        return parseLocalDate(searchParams.get("date")) ?? new Date()
    }, [searchParams])

    // Current time param (raw from URL)
    const selectedTimeParam = searchParams.get("time") ?? ""

    // A safe, controlled value for UI, keep it only if it's valid, otherwise make it "" so nothing appears selected
    const selectedTimeValue = useMemo(() => {
        if (!selectedTimeParam) return ""
        const now = new Date()

        return isInvalidTime({
            time: selectedTimeParam,
            timesSet,
            bookedSet,
            selectedDate,
            now,
        })
            ? ""
            : selectedTimeParam
    }, [selectedTimeParam, timesSet, bookedSet, selectedDate])

    // URL hardening
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        const timeParam = params.get("time")
        const dateParam = params.get("date") // if someone removes date

        // If date is missing, time should not exist
        if (!dateParam && timeParam) {
            params.delete("time")
            const qs = params.toString()
            router.replace(qs ? `${pathname}?${qs}` : pathname)
            return
        }

        // If there is no time in URL, nothing to fix
        if (!timeParam) return

        const now = new Date()

        // If time is invalid (not a slot / booked / past), remove it from URL
        const invalid = isInvalidTime({
            time: timeParam,
            timesSet,
            bookedSet,
            selectedDate,
            now,
        })

        if (!invalid) return

        params.delete("time")
        const qs = params.toString()

        router.replace(qs ? `${pathname}?${qs}` : pathname)
    }, [searchParams, router, pathname, timesSet, bookedSet, selectedDate])

    // Click handler
    const setTime = (time: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("time", time)

        const qs = params.toString()
        router.replace(qs ? `${pathname}?${qs}` : pathname)
    }

    return (
        <Card className="rounded-2xl">
            <CardHeader className="space-y-1">
                <div className="text-amber-600 text-center text-sm font-bold">
                    {formatYYYYMMDD(selectedDate)}
                </div>
                <div className="text-amber-600 text-center text-xs font-bold">
                    60 minutes
                </div>
            </CardHeader>

            <CardContent>
                <div className="max-h-50 overflow-y-auto pr-1">
                    <div className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-4">
                        {times.map((time) => {
                            const now = new Date()

                            const isBooked = bookedSet.has(time)
                            const isPast = isPastSlotToday(selectedDate, time, now)
                            const selected = selectedTimeValue === time

                            const disabled = isBooked || isPast

                            const bgClass = isBooked
                                ? "bg-red-500 text-white hover:bg-red-500"
                                : isPast
                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                    : selected
                                        ? "bg-green-800 text-white hover:bg-green-800"
                                        : "bg-green-100 text-green-800 hover:bg-green-200"

                            return (
                                <Button
                                    key={time}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => setTime(time)}
                                    className={cn("h-10 rounded-xl justify-center border", bgClass)}
                                >
                                    {time}
                                </Button>
                            )
                        })}
                    </div>
                </div>

                <div className="pt-8 flex flex-wrap gap-3 text-xs">
                    <span className="flex items-center gap-4">
                        <span className="h-3 w-3 rounded bg-green-500" /> Available
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded bg-red-500" /> Booked
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded bg-gray-400" /> Past
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded bg-green-800" /> Selected
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}