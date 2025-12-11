import PlayerDashboard from "@/components/Dashboard/Player/PlayerDashboard";
import { authorizeUser } from "@/lib/auth/authorizeUser";

export default async function PlayerPage() {
    const user = await authorizeUser("PLAYER");

    return <div className="flex flex-col p-5 md:px-12 xl:px-30 gap-y-10">
        <h1 className="text-3xl font-bold">Hello {user.name}</h1>
        <div className="w-full flex flex-col gap-y-10 md:flex-row  gap-x-10">
            <PlayerDashboard />
        </div>
    </div>
        ;
}
