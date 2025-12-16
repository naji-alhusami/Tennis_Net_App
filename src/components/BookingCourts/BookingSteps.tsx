// "use client"

// import { useState } from "react"

// type Step = {
//     key: string
//     label: string
// }

// const STEPS: Step[] = [
//     { key: "date-court", label: "Date" },
//     { key: "time", label: "Time" },
//     { key: "players", label: "Players" },
//     { key: "confirm", label: "Confirm" },
// ]

// type Props = {
//     currentStep: number // 0,1,2,3
// }

// export default function BookingSteps() {
//     const [currentStep, setCurrentStep] = useState<number>(1);

//     return (
//         <div className="w-full flex flex-row items-center justify-between">
//             {STEPS.map((step, index) => {
//                 const isDone = index <= currentStep

//                 return (
//                     <div key={step.key} className="flex items-center flex-1 min-w-0">
//                         {/* Step */}
//                         <div className="flex flex-col items-center pt-5">
//                             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
//                                             ${isDone ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"}
//                             `}>
//                                 {index + 1}
//                             </div>
//                             <span className={`mt-2 text-sm ${isDone ? "text-green-700" : "text-gray-500"}`}>
//                                 {step.label}
//                             </span>
//                         </div>

//                         {/* Line */}
//                         {index < STEPS.length - 1 && (
//                             <div className="flex-1 px-4">
//                                 <div
//                                     className={`h-1 rounded ${isDone ? "bg-green-600" : "bg-gray-300"}`}
//                                 />
//                             </div>
//                         )}

//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

"use client"
import { useState } from "react"

const STEPS = [
    { key: "date-court", label: "Date" },
    { key: "time", label: "Time" },
    { key: "players", label: "Players" },
    { key: "confirm", label: "Confirm" },
] as const

export default function BookingSteps() {
    const [currentStep] = useState(1)

    return (
        <div className="w-full">
            <div className="relative">
                {/* background track (start/end at circle centers) */}
                <div className="absolute left-4 right-4 top-9 h-1 bg-gray-300 rounded" />

                {/* progress track */}
                <div
                    className="absolute left-4 top-9 h-1 bg-green-600 rounded"
                    style={{
                        width:
                            currentStep === 0
                                ? "0px"
                                : `calc((100% - 2rem) * ${currentStep} / ${STEPS.length - 1})`,
                    }}
                />

                {/* Steps */}
                <div className="relative flex items-start justify-between">
                    {STEPS.map((step, index) => {
                        const isDone = index <= currentStep
                        return (
                            <div key={step.key} className="flex flex-col items-center pt-5">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${isDone ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"}`}
                                >
                                    {index + 1}
                                </div>
                                <span className={`mt-2 text-sm ${isDone ? "text-green-700" : "text-gray-500"}`}>
                                    {step.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
