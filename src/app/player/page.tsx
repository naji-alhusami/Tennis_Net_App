import FriendRequestsTable from "@/components/Dashboard/Player/FriendRequestsTable";
import PlayerDashboard from "@/components/Dashboard/Player/PlayerDashboard";
import { authorizeUser } from "@/lib/auth/authorizeUser";
import { auth } from "@/auth"
import { getIncomingFriendRequests } from "@/lib/data/friendRequests/getIncomingFriendRequests"

export default async function PlayerPage() {
    const user = await authorizeUser("PLAYER");
    const session = await auth()
    if (!session?.user?.id) return null

    const incomingRequests = await getIncomingFriendRequests(session.user.id)

    const requests = incomingRequests.map((r) => ({
        id: r.id,
        RequestDate: r.createdAt.toISOString(),
        name: r.fromUser?.name ?? "Unknown",
        image: r.fromUser?.image ?? null,
        role: r.fromUser?.role ?? "PLAYER",
        fromUserId: r.fromUserId,
    }))

    return <div className="flex flex-col p-5 md:px-12 xl:px-30 gap-y-10">
        <h1 className="text-3xl font-bold">Hello {user.name}</h1>
        <div className="w-full flex flex-col gap-y-10 md:flex-row  gap-x-10">
            <PlayerDashboard />
        </div>
        <FriendRequestsTable requests={requests} />
    </div>
        ;
}
