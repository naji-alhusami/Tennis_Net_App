// export const dynamic = "force-dynamic"

// import { auth } from "@/auth"
// import FindPartner from "@/components/FindPartner/FindPartner"
// import { getAllPendingRequests } from "@/lib/data/users/getAllPendingRequests"
// import { getAllUsers } from "@/lib/data/users/getAllUsers"

// export default async function FindPartnerPage() {
//     const session = await auth()
//     if (!session?.user?.id) return null

//     const currentUserId = session.user.id

//     const users = await getAllUsers(currentUserId)
//     const players = users.filter((user) => user.role === "PLAYER")
//     const pendingRequests = await getAllPendingRequests(players, currentUserId)
//     const requestedIds = new Set(pendingRequests.map((r) => r.toUserId))

//     return (
//         <div className="w-full p-5 md:px-12 xl:px-32">
//             <h1 className="text-3xl font-bold mb-6">Find Your Tennis Player OR Coach</h1>
//             <p className="text-muted-foreground mb-8">
//                 Discover players and Coaches around you and find your next hitting partner.
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
//                             // image={player.image}
//                             initialRequested={requestedIds.has(player.id)}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }

export const dynamic = "force-dynamic"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import FindPartnerGrid from "@/components/FindPartner/FindPartnerGrid"
import { getAllPendingRequests } from "@/lib/data/users/getAllPendingRequests"
import { getAllUsers } from "@/lib/data/users/getAllUsers"

export default async function FindPartnerPage() {
    const session = await auth()
    if (!session?.user?.id) redirect("/")

    const currentUserId = session.user.id
    const users = await getAllUsers(currentUserId)

    const pendingRequests = await getAllPendingRequests(users, currentUserId)
    const requestedIds = pendingRequests.map((r) => r.toUserId)

    return <FindPartnerGrid users={users} requestedIds={requestedIds} />
}
