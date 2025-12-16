"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function Calendar18() {
    const [date, setDate] = React.useState<Date | undefined>(
        new Date(2025, 5, 12)
    )
    
    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
            buttonVariant="outline"
        />
    )
}
