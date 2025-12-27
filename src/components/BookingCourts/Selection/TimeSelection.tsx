import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function TimeSelection() {
    return <Table className="border-2">
        <TableHeader className="bg-green-300">
            <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead className="text-center">Actions</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {/* {requests.length === 0 ? (
                <TableRow className="bg-white">
                    <TableCell colSpan={4} className="py-8 text-center text-sm text-muted-foreground">
                        There Are No New Requests.
                    </TableCell>
                </TableRow>
            ) : (
                requests.map((req) => (
                    <TableRow key={req.id} className="bg-white">
                        <TableCell className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden border">
                                {req.image ? (
                                    <Image
                                        src={req.image}
                                        alt={req.name}
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-muted font-bold">
                                        {req.name?.[0] ?? "?"}
                                    </div>
                                )}
                            </div>
                            <span className="font-medium capitalize">{req.name}</span>
                        </TableCell>

                        <TableCell>
                            <span className="text-sm text-muted-foreground">{req.role}</span>
                        </TableCell>

                        <TableCell>
                            <span className="text-sm text-muted-foreground">{req.RequestDate}</span>
                        </TableCell>

                        <TableCell>
                            <div className="flex justify-center gap-2">
                                <Button
                                    size="icon"
                                    className="rounded-full bg-blue-600 hover:bg-blue-700"
                                    aria-label="Accept"
                                    onClick={() => handleAccept(req.id)}
                                >
                                    <Check className="h-4 w-4 text-white" />
                                </Button>

                                <Button
                                    size="icon"
                                    variant="destructive"
                                    className="rounded-full"
                                    aria-label="Reject"
                                    onClick={() => handleReject(req.id)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))
            )} */}
        </TableBody>
    </Table>
}