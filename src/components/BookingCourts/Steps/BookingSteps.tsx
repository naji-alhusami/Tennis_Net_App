"use client"
import { motion, useReducedMotion } from "framer-motion"

const STEPS = [
  { key: "court", label: "Court" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "players", label: "Players" },
  { key: "confirm", label: "Confirm" },
] as const

type Props = { currentStep: number }

export default function BookingSteps({ currentStep }: Props) {
  const reduceMotion = useReducedMotion()
  
  const progress = currentStep / (STEPS.length - 1)

  return (
    <div className="w-full">
      {/* Stepper container */}
      <div className="mx-auto w-full rounded-2xl border bg-white backdrop-blur-md shadow-sm px-4 py-3">
        <div className="relative">
          {/* Track */}
          <div className="absolute left-4 right-4 top-5 h-1 bg-gray-200 rounded" />
          <motion.div
            className="absolute left-4 right-4 top-5 h-1 bg-green-600 rounded origin-left"
            initial={false} // Do NOT animate on first render
            animate={{ scaleX: progress }} // Animate horizontal scale based on current step
            transition={
              reduceMotion
                ? { duration: 0 } // Instantly update if user prefers reduced motion
                : { type: "spring", // Natural spring-based animation
                  stiffness: 140, // Controls animation speed
                  damping: 22 } // Prevents bouncing
            }
          />

          {/* Steps */}
          <div className="relative flex items-start justify-between">
            {STEPS.map((step, index) => {
              const isActive = index === currentStep
              const isDone = index < currentStep

              return (
                <div key={step.key} className="flex flex-col items-center gap-2">
                  {/* Circle */}
                  <motion.div
                    layout // Smoothly animates layout changes (size, border, ring)
                    className={[
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                      isDone && "bg-green-600 text-white",
                      isActive &&
                      "bg-white text-green-700 ring-4 ring-green-200 border border-green-600",
                      !isDone && !isActive && "bg-gray-200 text-gray-700",
                    ].join(" ")}
                    transition={
                      reduceMotion ? 
                      { duration: 0 } : // No animation if reduced motion is enabled
                      { type: "spring", stiffness: 300, damping: 25 }
                    }
                  >
                    {index + 1}
                  </motion.div>

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
    </div >
  )
}
