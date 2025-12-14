export const dynamic = "force-dynamic"

import { auth } from "@/auth"
import FindPartner from "@/components/FindPartner/FindPartner"
import { getAllPendingRequests } from "@/lib/data/users/getAllPendingRequests"
import { getAllUsers } from "@/lib/data/users/getAllUsers"

export default async function PartnersPage() {
    const session = await auth()
    if (!session?.user?.id) return null

    const currentUserId = session.user.id

    const users = await getAllUsers(currentUserId)
    const players = users.filter((user) => user.role === "PLAYER")

    const pendingRequests = await getAllPendingRequests(players, currentUserId)
    const requestedIds = new Set(pendingRequests.map((r) => r.toUserId))

    return (
        <div className="w-full p-5 md:px-12 xl:px-32">
            <h1 className="text-3xl font-bold mb-6">Find Your Tennis Partner</h1>
            <p className="text-muted-foreground mb-8">
                Discover players around you and find your next hitting partner.
            </p>

            {players.length === 0 ? (
                <p className="text-muted-foreground">
                    No players found yet. Come back later or invite your friends to join!
                </p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {players.map((user) => (
                        <FindPartner
                            key={user.id}
                            id={user.id}
                            name={user.name}
                            image={user.image}
                            initialRequested={requestedIds.has(user.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
