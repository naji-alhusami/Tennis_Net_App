import { auth } from "@/auth"
import { redirect } from "next/navigation"

import PlayerDashboard from "@/components/Dashboard/Player/PlayerDashboard"
import CoachDashboard from "@/components/Dashboard/Coach/CoachDashboard"

export default async function DashboardPage() {
    const session = await auth()
    if (!session?.user) redirect("/")
    if (!session.user.role) redirect("/auth/profile")

    const name = session.user.name ?? session.user.email ?? "there"

    return (
        <>
            <h1 className="text-3xl font-bold">Hello {name}</h1>

            {session.user.role === "PLAYER" && <PlayerDashboard />}
            {session.user.role === "COACH" && <CoachDashboard />}
        </>
    )
}
