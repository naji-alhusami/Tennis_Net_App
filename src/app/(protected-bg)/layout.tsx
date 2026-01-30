import { type ReactNode } from "react"

export default async function ProtectedBgLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <div className="relative min-h-screen bg-[#fdfefe] overflow-hidden">
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: "url('/test1.png')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "260px 260px",
                    opacity: 0.09,
                }}
            />
            <div className="relative z-10 flex flex-col p-5 md:px-12 xl:px-30 gap-y-10">
                {children}
            </div>
        </div>
    )
}
