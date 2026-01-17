import { type ReactNode } from "react"

export function StepCard({
    title,
    children,
    disabled = false,
}: {
    title: string
    children: ReactNode
    disabled?: boolean
}) {
    return (
        <div
            className={[
                "rounded-2xl bg-white border shadow-sm overflow-hidden",
                disabled ? "opacity-50 pointer-events-none select-none" : "",
            ].join(" ")}
        >
            <h1 className="font-bold text-center uppercase py-5 text-lg px-4 border-b">{title}</h1>
            <div className="px-4 py-4">{children}</div>
        </div>
    )
}

export function stepTitle(key: string) {
    switch (key) {
        case "confirm":
            return "REVIEW & CONFIRM"
        case "players":
            return "SELECT YOUR PARTNERS"
        case "time":
            return "SELECT YOUR TIME"
        case "date":
            return "SELECT YOUR DATE"
        case "court":
            return "SELECT YOUR COURT"
        default:
            return `SELECT YOUR ${key}`
    }
}