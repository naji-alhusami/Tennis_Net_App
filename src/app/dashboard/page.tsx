import { auth } from "@/auth"
import { redirect } from "next/navigation"

import PlayerDashboard from "@/components/Dashboard/Player/PlayerDashboard"
import CoachDashboard from "@/components/Dashboard/Coach/CoachDashboard"

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user) redirect("/")
    if (!session.user.role) redirect("/auth/profile")

    if (session.user.role === "PLAYER") return <PlayerDashboard
    // userId={session.user.id} 
    />
    if (session.user.role === "COACH") return <CoachDashboard
    // userId={session.user.id}
    />

    redirect("/auth/profile")
}
