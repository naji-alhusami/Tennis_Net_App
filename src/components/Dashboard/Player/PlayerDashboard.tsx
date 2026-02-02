import { auth } from "@/auth";

import FriendRequestsTable from "./FriendRequestsTable";
import { getIncomingFriendRequests } from "@/lib/data/friendRequests/getIncomingFriendRequests";

export default async function PlayerDashboard() {
  const session = await auth()
  if (!session?.user?.id) return null

  const requests = await getIncomingFriendRequests(session.user.id)

  return <><div>PlayerDashboard</div><div><FriendRequestsTable requests={requests} /></div></>
}