import PlayerDashboard from "@/components/Dashboard/PlayerDashboard";
import { authorizeUser } from "@/lib/auth/authorizeUser";

export default async function PlayerPage() {
    const user = await authorizeUser("PLAYER");

    return <div>Hello Player {user.email} {user.role}
        <div className="w-full ">
            <PlayerDashboard />
        </div>
    </div>;
}
