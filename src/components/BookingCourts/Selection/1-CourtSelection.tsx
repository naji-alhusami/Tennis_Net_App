"use client"

import { useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type CourtType = "CLAY" | "HARD"

export default function CourtSelection() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // ✅ current value comes from URL
    const courtType = useMemo(() => {
        const v = searchParams.get("courtType")
        return v === "CLAY" || v === "HARD" ? (v as CourtType) : undefined
    }, [searchParams])

    const onChange = (v: string) => {
        const next = v === "CLAY" || v === "HARD" ? (v as CourtType) : undefined

        const params = new URLSearchParams(searchParams.toString())
        if (next) params.set("courtType", next)
        else params.delete("courtType")

        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="relative z-10 grid place-items-center w-full">
            <div className="w-full max-w-lg bg-white p-8 sm:p-10">
                <Select value={courtType} onValueChange={onChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select court type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="CLAY">CLAY</SelectItem>
                        <SelectItem value="HARD">HARD</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
