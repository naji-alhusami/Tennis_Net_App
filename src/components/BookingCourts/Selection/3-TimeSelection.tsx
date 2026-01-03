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
    stepMinutes = 60,
    durationMinutes = 60,
    onSelect,
    value,
}: {
    selectedDate: Date
    bookedTimes?: string[]
    stepMinutes?: number
    durationMinutes?: number
    onSelect?: (time: string) => void
    value?: string | null
}) {
    const times = useMemo(() => buildTimes(stepMinutes, "08:00", "22:00"), [stepMinutes])

    const booked = useMemo(() => new Set(bookedTimes), [bookedTimes])
    const now = new Date()

    return (
        <Card className="rounded-2xl">
            <CardHeader className="space-y-1">
                <div className="text-center text-sm text-muted-foreground">
                    {formatYYYYMMDD(selectedDate)}
                </div>
                <div className="text-center text-xs text-muted-foreground">
                    Duration: {durationMinutes} minutes
                </div>
            </CardHeader>

            <CardContent>
                <div className="max-h-50 overflow-y-auto pr-1">
                    <div className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-4">
                        {times.map((t) => {
                            const isBooked = booked.has(t)
                            const isPast = isPastSlotToday(selectedDate, t, now)
                            const selected = value === t

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
                                    key={t}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => onSelect?.(t)}
                                    className={cn("h-10 rounded-xl justify-center border", bgClass)}
                                >
                                    {t}
                                </Button>
                            )
                        })}
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                    <span className="flex items-center gap-4">
                        <span className="h-3 w-3 rounded bg-green-500" /> Available </span>
                    <span className="flex items-center gap-2"> <span className="h-3 w-3 rounded bg-red-500" /> Booked </span>
                    <span className="flex items-center gap-2"> <span className="h-3 w-3 rounded bg-gray-400" /> Past </span>
                    <span className="flex items-center gap-2"> <span className="h-3 w-3 rounded bg-green-800" /> Selected </span>
                </div>
            </CardContent>
        </Card>
    )
}