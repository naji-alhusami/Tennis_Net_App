// "use client"

// const STEPS = [
//     { key: "date-court", label: "Date" },
//     { key: "time", label: "Time" },
//     { key: "players", label: "Players" },
//     { key: "confirm", label: "Confirm" },
// ] as const

// type BookingStepsProps = { currentStep: number }

// export default function BookingSteps({ currentStep }: BookingStepsProps) {

//     return (
//         <div className="w-full">
//             <div className="relative">
//                 <div className="absolute left-4 right-4 top-9 h-1 bg-gray-300 rounded" />

//                 {/* progress track */}
//                 <div
//                     className="absolute left-4 top-9 h-1 bg-green-600 rounded"
//                     style={{
//                         width:
//                             currentStep === 0
//                                 ? "0px"
//                                 : `calc((100% - 2rem) * ${currentStep} / ${STEPS.length - 1})`,
//                     }}
//                 />

//                 {/* Steps */}
//                 <div className="relative flex items-start justify-between">
//                     {STEPS.map((step, index) => {
//                         const isDone = index <= currentStep
//                         return (
//                             <div key={step.key} className="flex flex-col items-center pt-5">
//                                 <div
//                                     className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
//                   ${isDone ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"}`}
//                                 >
//                                     {index + 1}
//                                 </div>
//                                 <span className={`mt-2 text-sm ${isDone ? "text-green-700" : "text-gray-500"}`}>
//                                     {step.label}
//                                 </span>
//                             </div>
//                         )
//                     })}
//                 </div>
//             </div>
//         </div>
//     )
// }

"use client"

const STEPS = [
  { key: "court", label: "Court" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "players", label: "Players" },
  { key: "confirm", label: "Confirm" },
] as const

type Props = { currentStep: number }

export default function BookingSteps({ currentStep }: Props) {
  return (
    <div className="w-full">
      {/* Stepper container */}
      <div className="mx-auto w-full rounded-2xl border bg-white/90 backdrop-blur-md shadow-sm px-4 py-3">
        <div className="relative">
          {/* Track */}
          <div className="absolute left-4 right-4 top-5 h-1 bg-gray-200 rounded" />
          <div
            className="absolute left-4 top-5 h-1 bg-green-600 rounded"
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
              const isActive = index === currentStep
              const isDone = index < currentStep

              return (
                <div key={step.key} className="flex flex-col items-center gap-2">
                  {/* Circle */}
                  <div
                    className={[
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                      "transition-all",
                      isDone && "bg-green-600 text-white",
                      isActive && "bg-white text-green-700 ring-4 ring-green-200 border border-green-600",
                      !isDone && !isActive && "bg-gray-200 text-gray-700",
                    ].join(" ")}
                  >
                    {index + 1}
                  </div>

                  {/* Label */}
                  <span
                    className={[
                      "text-sm font-medium",
                      isActive ? "text-green-700" : isDone ? "text-gray-800" : "text-gray-600",
                    ].join(" ")}
                  >
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
