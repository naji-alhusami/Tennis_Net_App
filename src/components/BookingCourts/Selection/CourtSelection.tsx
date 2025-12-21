// "use client";

// import { cn } from "@/lib/utils";
// // import {
// //     Form,
// //     FormControl,
// //     FormField,
// //     FormItem,
// //     FormLabel,
// //     FormMessage,
// // } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { pacifico } from "@/app/fonts";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";

// export default function CourtSelection() {
//     return <div className="relative z-10 grid  place-items-center p-4">
//         <div className="w-full max-w-lg rounded-2xl bg-white/85 backdrop-blur-sm shadow-xl border border-gray-200 p-8 sm:p-10">
//             <h1
//                 className={cn(
//                     "text-green-700 text-6xl pb-20 text-center md:text-7xl",
//                     pacifico.className
//                 )}
//             >
//                 Role
//             </h1>
//             <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select Your Role" />
//                 </SelectTrigger>

//                 <SelectContent>
//                     <SelectItem value="CLAY">CLAY</SelectItem>
//                     <SelectItem value="HARD">HARD</SelectItem>
//                 </SelectContent>
//             </Select>
//             {/* <Form>
//                 <form className="space-y-6">
//                     <FormField
//                         // control={form.control}
//                         name="role"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Select Your Court</FormLabel>



//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     /> */}

//             {/* <div className="h-2 text-center">
//                         {roleError && (
//                             <p className="text-md text-red-600 font-bold">{roleError}</p>
//                         )}
//                     </div>


//                 </form>
//             </Form> */}
//         </div>
//     </div>
// }

// "use client"

// import { useMemo, useState } from "react"
// import { usePathname, useRouter, useSearchParams } from "next/navigation"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { pacifico } from "@/app/fonts"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// type CourtType = "CLAY" | "HARD"

// export default function CourtSelection() {
//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()

//   const initialCourtType = useMemo(() => {
//     const v = searchParams.get("courtType")
//     return v === "CLAY" || v === "HARD" ? v : undefined
//   }, [searchParams])

//   const [courtType, setCourtType] = useState<CourtType | undefined>(initialCourtType)

//   const onChange = (v: string) => {
//     const next = v === "CLAY" || v === "HARD" ? (v as CourtType) : undefined
//     setCourtType(next)

//     const params = new URLSearchParams(searchParams.toString())
//     if (next) params.set("courtType", next)
//     else params.delete("courtType")

//     router.replace(`${pathname}?${params.toString()}`)
//   }

//   const onNext = () => {
//     if (!courtType) return
//     const params = new URLSearchParams(searchParams.toString())
//     params.set("courtType", courtType)
//     router.push(`/booking?${params.toString()}`) // next step: Date (your /booking page)
//   }

//   return (
//     <div className="relative z-10 grid place-items-center p-4">
//       <div className="w-full max-w-lg rounded-2xl bg-white backdrop-blur-sm shadow-xl border border-gray-200 p-8 sm:p-10">
//         <h1 className={cn("text-green-700 text-5xl pb-10 text-center md:text-6xl", pacifico.className)}>
//           Court
//         </h1>

//         <Select value={courtType} onValueChange={onChange}>
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Select court type" />
//           </SelectTrigger>

//           <SelectContent>
//             <SelectItem value="CLAY">CLAY</SelectItem>
//             <SelectItem value="HARD">HARD</SelectItem>
//           </SelectContent>
//         </Select>

//         <Button
//           type="button"
//           onClick={onNext}
//           disabled={!courtType}
//           className={cn(
//             "mt-8 w-full bg-green-600 hover:bg-green-700 font-bold",
//             !courtType && "opacity-70 cursor-not-allowed"
//           )}
//         >
//           NEXT
//         </Button>
//       </div>
//     </div>
//   )
// }

"use client"

import { useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { pacifico } from "@/app/fonts"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
        <div className="relative z-10 grid place-items-center pt-5">
            <div className="w-full max-w-lg bg-white backdrop-blur-sm shadow-xl border border-gray-200 p-8 sm:p-10">
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
