import { auth } from "@/auth";
import FriendRequestsTable from "./FriendRequestsTable";
import { getIncomingFriendRequests } from "@/lib/data/friendRequests/getIncomingFriendRequests";

export default async function PlayerDashboard() {
  const session = await auth()
  if (!session?.user?.id) return null

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
  
  return <><div>PlayerDashboard</div><div><FriendRequestsTable requests={requests} /></div></>
}