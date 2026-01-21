"use client"
import { useSearchParams } from "next/navigation"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { type PlayerLite } from "@/lib/types/Booking"

export default function ConfirmSelection({ selectedPlayers }: { selectedPlayers: PlayerLite[] }) {
    const sp = useSearchParams()

    const courtType = sp.get("courtType")
    const courtLocation = sp.get("courtLocation")
    const date = sp.get("date")
    const times = sp.getAll("time")
    const players = sp.getAll("players")

    const missing =
        !courtType || !courtLocation || !date || !times || players.length === 0

    return (
        <Card className="rounded-2xl">
            <CardHeader className="text-center">
                <CardTitle>Confirm your booking</CardTitle>
                <CardDescription>
                    Please review the details before finishing.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {missing && (
                    <Alert className="bg-red-500 text-white text-center">
                        <AlertTitle>Missing information</AlertTitle>
                        <AlertDescription className="text-white">
                            Court, date, time, and at least one player must be selected.
                        </AlertDescription>
                    </Alert>
                )}

                <Separator />

                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="w-32 text-muted-foreground">
                                Court
                            </TableCell>
                            <TableCell className="font-medium">
                                {courtType ? `${courtType} (${courtLocation})` : "—"}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">
                                Date
                            </TableCell>
                            <TableCell className="font-medium">
                                {date ?? "—"}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">
                                Time
                            </TableCell>
                            <TableCell className="font-medium">
                                {times.length ? times.join(", ") : "—"}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">
                                Players
                            </TableCell>
                            <TableCell className="font-medium">
                                {selectedPlayers.length
                                    ? selectedPlayers.map(p => p.name ?? "Unknown").join(", ")
                                    : "—"}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
