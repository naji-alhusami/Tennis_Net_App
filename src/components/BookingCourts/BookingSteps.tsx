"use client"

const STEPS = [
    { key: "date-court", label: "Date" },
    { key: "time", label: "Time" },
    { key: "players", label: "Players" },
    { key: "confirm", label: "Confirm" },
] as const

type BookingStepsProps = { currentStep: number }

export default function BookingSteps({ currentStep }: BookingStepsProps) {

    return (
        <div className="w-full">
            <div className="relative">
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
