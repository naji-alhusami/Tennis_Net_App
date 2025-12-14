"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Check, X } from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"

type FriendRequest = {
    id: string
    name: string
    image?: string | null
    role: "PLAYER" | "COACH"
    RequestDate: string
}

export default function FriendRequestsTable({
    requests,
}: {
    requests: FriendRequest[]
}) {
    const router = useRouter()

    async function handleAccept(requestId: string) {
        try {
            await axios.post("/api/requests/accept", { requestId })
            router.refresh()
        } catch (error) {
            console.error("Failed to accept request", error)
        }
    }

    async function handleReject(requestId: string) {
        try {
            await axios.post("/api/requests/reject", { requestId })
            router.refresh()
        } catch (error) {
            console.error("Failed to reject request", error)
        }
    }

    return (
        <Table className="border border-2">
            <TableHeader className="bg-gray-300">
                <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {requests.map((req) => (
                    <TableRow key={req.id}>
                        {/* Player */}
                        <TableCell className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden border">
                                {req.image ? (
                                    <Image
                                        src={req.image}
                                        alt={req.name}
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-muted font-bold">
                                        {req.name[0]}
                                    </div>
                                )}
                            </div>
                            <span className="font-medium capitalize">{req.name}</span>
                        </TableCell>

                        {/* Role */}
                        <TableCell>
                            <span className="text-sm text-muted-foreground">{req.role}</span>
                        </TableCell>

                        {/* Role */}
                        <TableCell>
                            <span className="text-sm text-muted-foreground">{new Date(req.RequestDate).toLocaleDateString()}</span>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="">
                            <div className="flex justify-end gap-2">
                                {/* Accept */}
                                <Button
                                    size="icon"
                                    className="rounded-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                    aria-label="Accept"
                                    onClick={() => handleAccept(req.id)}
                                >
                                    <Check className="h-4 w-4 text-white" />
                                </Button>

                                {/* Reject */}
                                <Button
                                    size="icon"
                                    variant="destructive"
                                    className="rounded-full cursor-pointer"
                                    aria-label="Reject"
                                    onClick={() => handleReject(req.id)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
