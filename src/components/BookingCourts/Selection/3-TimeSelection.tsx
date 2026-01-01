"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Slot = {
    time: string
    status: "available" | "booked"
}

// =========
//  HELPERS
// =========

function pad2(n: number) {
    return n.toString().padStart(2, "0")
}

function toMinutes(hhmm: string) {
    const [h, m] = hhmm.split(":").map(Number)
    return h * 60 + m
}

function buildTimes(stepMinutes = 30, start = "08:00", end = "22:00") {
    const out: string[] = []
    let cur = toMinutes(start)
    const endMin = toMinutes(end)

    while (cur < endMin) {
        const h = Math.floor(cur / 60)
        const m = cur % 60
        out.push(`${pad2(h)}:${pad2(m)}`)
        cur += stepMinutes
    }
    return out
}

function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    )
}

function isPastSlotToday(selectedDate: Date, slotTime: string, now = new Date()) {
    if (!isSameDay(selectedDate, now)) return false
    return toMinutes(slotTime) < now.getHours() * 60 + now.getMinutes()
}

function formatYYYYMMDD(d: Date) {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${day}`
}

// ===== COMPONENT =====
export default function TimeSelection({
    selectedDate,
    bookedTimes = [],
    stepMinutes = 30,
    onToggle,
    values = [],
    maxPerDay = 2,
}: {
    selectedDate: Date
    bookedTimes?: string[]
    stepMinutes?: number
    onToggle?: (time: string) => void
    values?: string[]
    maxPerDay?: number
}) {
    const times = useMemo(() => buildTimes(stepMinutes, "08:00", "22:00"), [stepMinutes])

    const slots: Slot[] = useMemo(() => {
        const booked = new Set(bookedTimes)
        return times.map((t) => ({
            time: t,
            status: booked.has(t) ? "booked" : "available",
        }))
    }, [times, bookedTimes])

    const now = new Date()

    const reachedMax = values.length >= maxPerDay

    return (
        <Card className="rounded-2xl">
            <CardHeader className="space-y-1">
                <div className="text-center text-sm text-muted-foreground">
                    {formatYYYYMMDD(selectedDate)}
                </div>

                {reachedMax && (
                    <div className="text-center text-xs text-amber-600">
                        You reached the max of the times of this day
                    </div>
                )}
            </CardHeader>

            <CardContent>
                <div className="max-h-50 overflow-y-auto pr-1">
                    <div className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-4">
                        {slots.map((slot) => {
                            const isBooked = slot.status === "booked"
                            const isPast = isPastSlotToday(selectedDate, slot.time, now)
                            const selected = values.includes(slot.time)

                            // ✅ new rule: if already selected 2 slots, disable all other slots
                            const maxLocked = reachedMax && !selected

                            const disabled = isBooked || isPast || maxLocked

                            const bgClass = isBooked
                                ? "bg-red-500 text-white hover:bg-red-500"
                                : isPast
                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                    : selected
                                        ? "bg-green-800 text-white hover:bg-green-800"
                                        : maxLocked
                                            ? "bg-gray-200 text-gray-500"
                                            : "bg-green-100 text-green-800 hover:bg-green-200"

                            return (
                                <Button
                                    key={slot.time}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => onToggle?.(slot.time)}
                                    className={cn("h-10 rounded-xl justify-center border", bgClass)}
                                >
                                    {slot.time}
                                </Button>
                            )
                        })}
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                    <span className="flex items-center gap-2">
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
