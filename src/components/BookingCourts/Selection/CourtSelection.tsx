"use client"

import { useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Mode = "edit" | "summary"

type CourtType = "CLAY" | "HARD"

export default function CourtSelection({ initialCourtType }: { initialCourtType?: string }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const initial = useMemo(() => {
        return initialCourtType === "CLAY" || initialCourtType === "HARD"
            ? (initialCourtType as CourtType)
            : undefined
    }, [initialCourtType])

    const [courtType, setCourtType] = useState<CourtType | undefined>(initial)

    const onChange = (v: string) => {
        const next = v === "CLAY" || v === "HARD" ? (v as CourtType) : undefined
        setCourtType(next)

        const params = new URLSearchParams(searchParams.toString())
        if (next) params.set("courtType", next)
        else params.delete("courtType")

        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="relative z-10 grid place-items-center w-full">
            <div className="w-full max-w-lg bg-white p-8 sm:p-10">
                {/* <h1 className={cn("text-green-700 text-5xl pb-10 text-center md:text-6xl", pacifico.className)}>
                    Court
                </h1> */}

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
