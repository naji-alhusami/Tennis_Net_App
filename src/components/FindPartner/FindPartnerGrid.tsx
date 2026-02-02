"use client"
import { useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"

import FindPartner from "@/components/FindPartner/FindPartner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type User } from "@prisma/client"
import { type IncomingRequest } from "@/lib/types/FriendRequest"

export default function FindPartnerGrid({
  users,
  requestedIds,
  requests,
}: {
  users: User[]
  requestedIds: string[],
  requests: IncomingRequest[]
}) {

  const router = useRouter()
  const pathname = usePathname()
  const searchParam = useSearchParams()

  const requestedSet = useMemo(() => new Set(requestedIds), [requestedIds])

  const nameOrEmailParam = searchParam.get("q") ?? ""
  const roleParam = searchParam.get("role") ?? "ALL"
  const reqestedPartnerParam = searchParam.get("req") ?? "ALL"

  const incomingSendersSet = useMemo(() => {
    return new Set(requests.map((r) => r.fromUserId))
  }, [requests])

  const setParamsHandler = (key: string, value: string) => {
    const params = new URLSearchParams(searchParam.toString())

    if (!value || value === "ALL") {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    router.replace(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false })
  }

  const filtered = useMemo(() => {
    const query = nameOrEmailParam.trim().toLowerCase()

    return users.filter((user) => {
      // exclude incoming request senders
      if (incomingSendersSet.has(user.id)) return false

      // role filter
      if (roleParam !== "ALL" && user.role !== roleParam) return false

      // requested filter
      const isRequested = requestedSet.has(user.id)
      if (reqestedPartnerParam === "REQUESTED" && !isRequested) return false
      if (reqestedPartnerParam === "NOT_REQUESTED" && isRequested) return false

      // search filter
      if (!query) return true
      const searchText = `${user.name ?? ""} ${user.email ?? ""}`.toLowerCase()
      return searchText.includes(query)
    })
  }, [users, nameOrEmailParam, roleParam, reqestedPartnerParam, requestedSet, incomingSendersSet])

  const clearAll = () => router.replace(pathname, { scroll: false })

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Find a partner</h1>
          <p className="text-muted-foreground mt-2">
            Search players and coaches, filter, and send requests.
          </p>
        </div>

      </div>

      <div className="mb-6 flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm  md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">

          {/* Search By Email Or Name */}
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={nameOrEmailParam}
              onChange={(e) => setParamsHandler("q", e.target.value)}
              placeholder="Search by name or email …"
              className="pl-9 bg-muted/30 border border-border/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-primary/25"
            />
            {nameOrEmailParam && (
              <Button
                type="button"
                variant="link"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setParamsHandler("q", "")}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Select Patner Role */}
          <Select value={roleParam} onValueChange={(value) => setParamsHandler("role", value)}
          >
            <SelectTrigger className="w-full md:max-w-sm bg-muted/30 border border-border/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-primary/25" >
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Roles</SelectItem>
              <SelectItem value="PLAYER">Players</SelectItem>
              <SelectItem value="COACH">Coaches</SelectItem>
            </SelectContent>
          </Select>

          {/* Select Requested Partners */}
          <Select value={reqestedPartnerParam} onValueChange={(value) => setParamsHandler("req", value)}>
            <SelectTrigger className="w-full md:max-w-sm bg-muted/30 border border-border/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-primary/25">
              <SelectValue placeholder="Request status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="REQUESTED">Requested</SelectItem>
              <SelectItem value="NOT_REQUESTED">Not Requested</SelectItem>
            </SelectContent>
          </Select>

        </div>
        <Badge variant="destructive" className="w-fit bg-white text-black border-1 border-black">
          {filtered.length} results
        </Badge>
        <Button type="button" className="bg-red-500 text-white hover:bg-red-600 hover:text-white cursor-pointer" onClick={clearAll}>
          Clear
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border p-10 text-center bg-white shadow-sm">
          <div className="text-lg font-medium text-red-500">No matches</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Try a different search or clear filters.
          </div>
          <div className="mt-4">
            <Button type="button" className="bg-red-500 text-white hover:bg-red-600 hover:text-white cursor-pointer" onClick={clearAll}>
              Clear Filters
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((user) => (
            <FindPartner
              key={user.id}
              id={user.id}
              name={user.name}
              role={user.role}
              image={user.image ?? null}
              initialRequested={requestedSet.has(user.id)}
            />
          ))}
        </div>
      )
      }
    </div >
  )
}