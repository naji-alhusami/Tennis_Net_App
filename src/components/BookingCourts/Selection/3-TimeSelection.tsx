"use client"

import { useEffect, useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDateToYYYMMDD, parseLocalDate, toMinutes, twoDigitNumber } from "@/lib/utils/date"

// =========
//  HELPERS
// =========

// Build time slots (From 08:00 to 22:00)
function buildTimes(stepMinutes = 60, start = "08:00", end = "22:00") {
    const times: string[] = []
    let currentMin = toMinutes(start)
    const endMin = toMinutes(end)

    while (currentMin < endMin) {
        const h = Math.floor(currentMin / 60)
        const m = currentMin % 60
        times.push(`${twoDigitNumber(h)}:${twoDigitNumber(m)}`)
        currentMin += stepMinutes
    }
    return times
}

// It checks whether two dates are on the same calendar day (The selected date and today)
function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    )
}

// If selected date is today, block times earlier than "now"
function isPastSlotToday(selectedDate: Date, selectedTime: string, now = new Date()) {
    if (!isSameDay(selectedDate, now)) return false

    const nowTime = `${twoDigitNumber(now.getHours())}:${twoDigitNumber(now.getMinutes())}`

    return toMinutes(selectedTime) < toMinutes(nowTime)
}

// Decide whether a time is allowed right now
function isInvalidTime({
    selectedTime,
    timesSet,
    bookedSet,
    selectedDate,
    now,
}: {
    selectedTime: string
    timesSet: Set<string>
    bookedSet: Set<string>
    selectedDate: Date
    now: Date
}) {
    // Not even part of the generated slots
    if (!timesSet.has(selectedTime)) return true

    // Already reserved/booked
    if (bookedSet.has(selectedTime)) return true

    // In the past (only matters if selected day is today)
    if (isPastSlotToday(selectedDate, selectedTime, now)) return true

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
    const now = new Date()

    // Times Slot 60min from 08:00..22:00
    const times = useMemo(() => buildTimes(60, "08:00", "22:00"), [])
    const timesSet = useMemo(() => new Set(times), [times])

    // Booked times fetched from MongoDB
    const bookedSet = useMemo(() => new Set(bookedTimes), [bookedTimes])

    // Date comes from URL
    const dateParam = searchParams.get("date")

    const selectedDate = useMemo(() => {
        const parsed = dateParam ? parseLocalDate(dateParam) : null
        return parsed ?? new Date()
    }, [dateParam])

    // Current time param (raw from URL)
    const selectedTimeParam = searchParams.get("time") ?? ""

    // A safe, controlled value for UI, keep it only if it's valid, otherwise make it "" so nothing appears selected
    const selectedTimeValue = useMemo(() => {
        if (!selectedTimeParam) return ""

        const invalid = isInvalidTime({
            selectedTime: selectedTimeParam,
            timesSet,
            bookedSet,
            selectedDate,
            now: new Date(),
        })

        if (invalid) return ""
        return selectedTimeParam
    }, [selectedTimeParam, timesSet, bookedSet, selectedDate])

    // URL hardening
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        const timeParam = params.get("time")
        const dateParam = params.get("date") // if someone removes date

        // Replace URL without scroll
        const replaceQuery = () => {
            const qs = params.toString()
            router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
        }

        // If date is missing, time should not exist
        if (!dateParam && timeParam) {
            params.delete("time")
            replaceQuery()
            return
        }

        // If there is no time in URL, nothing to fix
        if (!timeParam) return

        // If time is invalid (not a slot / booked / past), remove it from URL
        const invalid = isInvalidTime({
            selectedTime: timeParam,
            timesSet,
            bookedSet,
            selectedDate,
            now: new Date(),
        })

        if (!invalid) return

        params.delete("time")
        replaceQuery()
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
                    {formatDateToYYYMMDD(selectedDate)}
                </div>
                <div className="text-amber-600 text-center text-xs font-bold">
                    60 minutes
                </div>
            </CardHeader>

            <CardContent>
                <div className="max-h-50 overflow-y-auto pr-1">
                    <div className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-4">
                        {times.map((time) => {
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