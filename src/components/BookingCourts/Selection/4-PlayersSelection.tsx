"use client"

import { useState, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, Search, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

type Friend = { id: string; name: string | null; image: string | null; email: string | null }

// Helper that creates short initials text (1–2 letters) from a person’s name or email.
function initials(nameOrEmail?: string | null) {
    const s = (nameOrEmail ?? "").trim() // If nameOrEmail is null or undefined → use ""
    if (!s) return "?" // Handle empty input
    const parts = s.split(/\s+/) // Split into words, "John Doe" → ["John", "Doe"]
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase() // Take the first two characters and Convert to uppercase
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() // first letter of the first word and first letter of the last word, Combine + uppercase
}

export default function PlayersSelection({
    friends,
    max = 3,
}: {
    friends: Friend[]
    max?: number
}) {
    const [q, setQ] = useState<string>("") // search query: what the user typed in the search box
    const router = useRouter()
    const sp = useSearchParams()

    const players = sp.getAll("players")

    const uniqueFriends = friends

    // players is a list of selected IDs: ["id1", "id3"]
    // selected turns that list into a Set: Set { "id1", "id3" }
    const selected = useMemo(() => new Set(players), [players])

    // Friends that match the search
    const filtered = useMemo(() => {
        const query = q.trim().toLowerCase()
        // if search is empty
        if (!query) return uniqueFriends
        return uniqueFriends.filter((f) => {
            const hay = `${f.name ?? ""} ${f.email ?? ""}`.toLowerCase()
            return hay.includes(query)
        })
    }, [q, uniqueFriends])

    // toggle updates URL instead of local state
    const toggle = (id: string) => {
        const params = new URLSearchParams(sp.toString())
        const current = new Set(params.getAll("players"))

        if (current.has(id)) {
            current.delete(id)
        } else {
            if (current.size >= max) return
            current.add(id)
        }

        // rewrite players list cleanly
        params.delete("players")
            ;[...current].forEach((pid) => params.append("players", pid))

        router.replace(`?${params.toString()}`)
    }

    // Full objects of selected players
    const selectedFriends = useMemo(
        () => uniqueFriends.filter((f) => selected.has(f.id)),
        [uniqueFriends, selected]
    )

    if (uniqueFriends.length === 0) {
        return (
            <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle>Partners</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                    No partners yet. Add friends to play with.
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="rounded-2xl">
            <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                    <CardTitle>Choose partners</CardTitle>
                    <Badge variant="secondary">
                        {players.length}/{max}
                    </Badge>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search by name or email…"
                        className="pl-9"
                    />
                </div>

                <div className="h-8">
                    {/* Selected friends */}
                    {selectedFriends.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {selectedFriends.map((f) => (
                                <Badge key={f.id} variant="outline" className="gap-1.5 py-1">
                                    {f.name ?? f.email ?? "Unknown"}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5 rounded-full"
                                        onClick={() => toggle(f.id)}
                                        aria-label={`Remove ${f.name ?? f.email ?? "friend"}`}
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent>
                <ScrollArea className="h-[320px]">
                    <div className="space-y-2">
                        {filtered.map((f) => {
                            const isSelected = selected.has(f.id)
                            const disabled = !isSelected && selected.size >= max

                            return (
                                <button
                                    key={f.id}
                                    type="button"
                                    onClick={() => !disabled && toggle(f.id)}
                                    className={[
                                        "w-full text-left rounded-xl border p-3 transition",
                                        "hover:bg-accent hover:text-accent-foreground",
                                        isSelected ? "border-primary" : "border-border",
                                        disabled ? "opacity-50 cursor-not-allowed" : "",
                                    ].join(" ")}
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={f.image ?? undefined} alt={f.name ?? "Friend"} />
                                            <AvatarFallback>{initials(f.name ?? f.email)}</AvatarFallback>
                                        </Avatar>

                                        <div className="min-w-0 flex-1">
                                            <div className="truncate font-medium">{f.name ?? "Unnamed friend"}</div>
                                            <div className="truncate text-xs text-muted-foreground">{f.email ?? ""}</div>
                                        </div>

                                        <div className="shrink-0">
                                            {isSelected ? (
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-primary bg-green-200">
                                                    <Check className="h-4 w-4" />
                                                </div>
                                            ) : (
                                                <div className="h-6 w-6 rounded-full border" />
                                            )}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}

                        {filtered.length === 0 && (
                            <div className="py-10 text-center text-sm text-muted-foreground">
                                No matches.
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {players.length >= max && (
                    <div className="mt-3 text-xs text-muted-foreground">
                        You reached the maximum ({max}) partners for this booking.
                    </div>
                )}
            </CardContent>
        </Card>
    )
}