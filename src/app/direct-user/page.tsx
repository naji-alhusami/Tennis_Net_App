import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DirectUserPage() {
  const session = await auth()

  // Not logged in → home (or /auth/login)
  if (!session?.user) redirect("/")

  // Logged in but no role → go fill profile
  if (!session.user.role) redirect("/auth/profile")

  // Has role → dashboard
  redirect("/dashboard")
}


// import PatternBackground from "@/components/layout/PatternBackground"
// import FriendRequestsTable from "@/components/Dashboard/Player/FriendRequestsTable"
// import LastMatchesChart from "@/components/Dashboard/Player/LastMatchesChart"
// import { authorizeUser } from "@/lib/auth/authorizeUser"
// import { auth } from "@/auth"
// import { getIncomingFriendRequests } from "@/lib/data/friendRequests/getIncomingFriendRequests"

// export default async function PlayerPage() {
//   const user = await authorizeUser("PLAYER")
//   const session = await auth()
//   if (!session?.user?.id) return null

//   const incomingRequests = await getIncomingFriendRequests(session.user.id)

//   const requests = incomingRequests.map((r) => ({
//     id: r.id,
//     RequestDate: r.createdAt.toISOString(),
//     name: r.fromUser?.name ?? "Unknown",
//     image: r.fromUser?.image ?? null,
//     role: r.fromUser?.role ?? "PLAYER",
//     fromUserId: r.fromUserId,
//   }))

//   return (
//     <PatternBackground opacity={0.06} size={280}>
//       <div className="flex flex-col p-5 md:px-12 xl:px-30 gap-y-10">
//         <h1 className="text-3xl font-bold">Hello {user.name}</h1>

//         <div className="w-full flex flex-col gap-y-10 lg:flex-row gap-x-10">
//           <LastMatchesChart />
//           <FriendRequestsTable requests={requests} />
//         </div>
//       </div>
//     </PatternBackground>
//   )
// }




// ------------

// export const dynamic = "force-dynamic"

// import { auth } from "@/auth"
// import FindPartner from "@/components/FindPartner/FindPartner"
// import { getAllPendingRequests } from "@/lib/data/users/getAllPendingRequests"
// import { getAllUsers } from "@/lib/data/users/getAllUsers"

// export default async function PartnersPage() {
//     const session = await auth()
//     if (!session?.user?.id) return null

//     const currentUserId = session.user.id

//     const users = await getAllUsers(currentUserId)
//     const players = users.filter((user) => user.role === "PLAYER")
//     const pendingRequests = await getAllPendingRequests(players, currentUserId)
//     const requestedIds = new Set(pendingRequests.map((r) => r.toUserId))


//     return (
//         <div className="w-full p-5 md:px-12 xl:px-32">
//             <h1 className="text-3xl font-bold mb-6">Find Your Tennis Partner</h1>
//             <p className="text-muted-foreground mb-8">
//                 Discover players around you and find your next hitting partner.
//             </p>

//             {players.length === 0 ? (
//                 <p className="text-muted-foreground">
//                     No players found yet. Come back later or invite your friends to join!
//                 </p>
//             ) : (
//                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                     {players.map((player) => (
//                         <FindPartner
//                             key={player.id}
//                             id={player.id}
//                             name={player.name}
//                             image={player.image}
//                             initialRequested={requestedIds.has(player.id)}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }
