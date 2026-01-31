export const dynamic = "force-dynamic"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import FindPartnerGrid from "@/components/FindPartner/FindPartnerGrid"
import { getAllPendingRequests } from "@/lib/data/users/getAllPendingRequests"
import { getAllUsers } from "@/lib/data/users/getAllUsers"
import { getIncomingFriendRequests } from "@/lib/data/friendRequests/getIncomingFriendRequests"

export default async function FindPartnerPage() {
    const session = await auth()
    if (!session?.user?.id) redirect("/")

    // get the user loggedin id
    const currentUserId = session.user.id
    
    // get all the users except the user loggedin
    const users = await getAllUsers(currentUserId)

    // get all the requests made by the user loggedin
    const pendingRequests = await getAllPendingRequests(users, currentUserId)
    const requestedIds = pendingRequests.map((request) => request.toUserId)

    const incomingRequests = await getIncomingFriendRequests(session.user.id)

    const requests = incomingRequests.map((request) => ({
        id: request.id,
        RequestDate: request.createdAt.toISOString(),
        name: request.fromUser?.name ?? "Unknown",
        image: request.fromUser?.image ?? null,
        role: request.fromUser?.role ?? "PLAYER",
        fromUserId: request.fromUserId,
        toUserId: request.toUserId,
    }))

    return <FindPartnerGrid users={users} requests={requests} requestedIds={requestedIds} />
}
