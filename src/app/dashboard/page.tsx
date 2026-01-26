// import { auth } from "@/auth"

// import CoachDashboard from "@/components/Dashboard/Coach/CoachDashboard";

// export default async function DashboardPage() {
//     const session = await auth()
//     console.log("session:", session)
//     if (!session) return null

//     let dashboard;
//     if (session?.user.role === "COACH") {
//         dashboard = <div>Hello Coach {session.user.email} {session.user.role} <CoachDashboard /></div>
//     }

//     if (session?.user.role === "PLAYER") {
//         dashboard = <PatternBackground opacity={0.06} size={280}>
//             <div className="flex flex-col p-5 md:px-12 xl:px-30 gap-y-10">
//                 <h1 className="text-3xl font-bold">Hello {user.name}</h1>

//                 <div className="w-full flex flex-col gap-y-10 lg:flex-row gap-x-10">
//                     <LastMatchesChart />
//                     <FriendRequestsTable requests={requests} />
//                 </div>
//             </div>
//         </PatternBackground>
//     }

//     return <div>{dashboard}</div>
// }

import { auth } from "@/auth"
import { redirect } from "next/navigation"

import PlayerDashboard from "@/components/Dashboard/Player/PlayerDashboard"
import CoachDashboard from "@/components/Dashboard/Coach/CoachDashboard"

export default async function DashboardPage() {
    const session = await auth()
    if (!session?.user) redirect("/")
    if (!session.user.role) redirect("/auth/profile")
    console.log(session)
    if (session.user.role === "PLAYER") return <PlayerDashboard
    // userId={session.user.id} 
    />
    if (session.user.role === "COACH") return <CoachDashboard
    // userId={session.user.id}
    />

    redirect("/auth/profile")
}
