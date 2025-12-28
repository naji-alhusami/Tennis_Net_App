"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Slot = {
    time: string
    status: "available" | "booked"
}

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
    const slotMin = toMinutes(slotTime)
    const nowMin = now.getHours() * 60 + now.getMinutes()
    return slotMin < nowMin
}

export default function TimeSelection({
    selectedDate,
    bookedTimes = [],
    stepMinutes = 30,
    onToggle,
    values = [],
}: {
    selectedDate: Date
    bookedTimes?: string[]
    stepMinutes?: number
    onToggle?: (time: string) => void
    values?: string[]
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

    function formatYYYYMMDD(d: Date) {
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, "0")
        const day = String(d.getDate()).padStart(2, "0")
        return `${y}-${m}-${day}`
    }

    return (
        <Card className="rounded-2xl">
            <CardHeader className="space-y-1">
                {/* <CardTitle className="text-lg">Choose a time</CardTitle> */}
                <div className="text-center text-sm text-muted-foreground">
                    {formatYYYYMMDD(selectedDate)}
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-4">
                    {slots.map((slot) => {
                        const isBooked = slot.status === "booked"
                        const isPast = isPastSlotToday(selectedDate, slot.time, now)
                        const disabled = isBooked || isPast

                        // ✅ multiple selection
                        const selected = values.includes(slot.time)

                        let bgClass = ""

                        if (isBooked) {
                            bgClass = "bg-red-500 text-white hover:bg-red-500"
                        } else if (isPast) {
                            bgClass = "bg-gray-300 text-gray-600 cursor-not-allowed"
                        } else {
                            bgClass = selected
                                ? "bg-green-800 text-white hover:bg-green-800"
                                : "bg-green-100 text-green-800 hover:bg-green-200"
                        }

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

                <div className="mt-4 flex gap-3 text-xs">
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
