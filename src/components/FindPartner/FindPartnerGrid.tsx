// "use client"

// import { useActionState } from "react"
// import Image from "next/image"
// import { friendRequestAction } from "../../../actions/friendRequestAction"
// import { Button } from "@/components/ui/button"
// import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { getNameInitials } from "@/lib/utils/getNameInitials"

// type FindPartnerProps = {
//   id: string
//   name: string | null
//   image?: string | null
//   initialRequested: boolean
// }

// type FriendRequestState = {
//   status: "idle" | "requested"
//   message: string
//   error: string
// }

// export default function FindPartner({
//   id,
//   name,
//   image,
//   initialRequested,
// }: FindPartnerProps) {
//   const initialState: FriendRequestState = {
//     status: initialRequested ? "requested" : "idle",
//     message: "",
//     error: "",
//   }

//   const userInitials = getNameInitials(name)

//   const [state, formAction, pending] = useActionState(friendRequestAction, initialState)

//   const requestSent = state.status === "requested"

//   return (
//     <Card className="flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
//       <CardHeader className="w-full flex flex-col items-center">
//         <div className="h-20 w-20 rounded-full overflow-hidden border mb-3">
//           {image ? (
//             <Image
//               src={image}
//               alt={name ?? "Player"}
//               className="h-full w-full object-cover"
//               width={100}
//               height={100}
//             />
//           ) : (
//             <div className="h-full w-full flex items-center justify-center text-2xl font-semibold bg-muted">
//               {userInitials}
//             </div>
//           )}
//         </div>

//         <CardTitle className="capitalize font-bold text-xl">{name}</CardTitle>
//       </CardHeader>

//       <div className="min-h-[1.5rem]">
//         {state.error && <p className="text-red-500 text-sm mt-1 font-bold">{state.error}</p>}
//         {state.message && <p className="text-green-600 text-sm mt-1 font-bold">{state.message}</p>}
//       </div>

//       <CardFooter className="w-full pt-0">
//         <form action={formAction} className="w-full">
//           <input type="hidden" name="userId" value={id} />
//           <Button
//             disabled={pending}
//             name="intent"
//             value={requestSent ? "cancel" : "send"}
//             variant={requestSent ? "destructive" : "default"}
//             className="w-full cursor-pointer"
//           >
//             {pending
//               ? requestSent
//                 ? "Canceling..."
//                 : "Sending..."
//               : requestSent
//                 ? "Cancel request"
//                 : "Add Friend"}
//           </Button>
//         </form>
//       </CardFooter>
//     </Card>
//   )
// }
"use client"

import { useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"

import FindPartner from "@/components/FindPartner/FindPartner" // ✅ card component
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
import type { UserRole } from "@prisma/client"

type User = {
  id: string
  name: string | null
  email: string | null
  role: UserRole | null
  image?: string | null
}

export default function FindPartnerGrid({
  users,
  requestedIds,
}: {
  users: User[]
  requestedIds: string[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()

  const requestedSet = useMemo(() => new Set(requestedIds), [requestedIds])

  const qParam = sp.get("q") ?? ""
  const roleParam = sp.get("role") ?? "ALL"
  const reqParam = sp.get("req") ?? "ALL"

  const setParams = (patch: Record<string, string | null>) => {
    const params = new URLSearchParams(sp.toString())
    for (const [k, v] of Object.entries(patch)) {
      if (!v || v === "ALL" || v === "") params.delete(k)
      else params.set(k, v)
    }
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const filtered = useMemo(() => {
    const query = qParam.trim().toLowerCase()
    return users.filter((u) => {
      if (roleParam !== "ALL" && u.role !== roleParam) return false

      const isRequested = requestedSet.has(u.id)
      if (reqParam === "REQUESTED" && !isRequested) return false
      if (reqParam === "NOT_REQUESTED" && isRequested) return false

      if (!query) return true
      const hay = `${u.name ?? ""} ${u.email ?? ""}`.toLowerCase()
      return hay.includes(query)
    })
  }, [users, qParam, roleParam, reqParam, requestedSet])

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

      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border- bg-white p-4 shadow-sm  md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={qParam}
              onChange={(e) => setParams({ q: e.target.value })}
              placeholder="Search by name or email…"
              className="pl-9 bg-muted/30 border border-border/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-primary/25"
            />
            {qParam && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={() => setParams({ q: "" })}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <Select value={roleParam} onValueChange={(v) => setParams({ role: v })}>
            <SelectTrigger className="w-full md:max-w-sm bg-muted/30 border border-border/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] focus-visible:ring-2 focus-visible:ring-primary/25" >
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All roles</SelectItem>
              <SelectItem value="PLAYER">Players</SelectItem>
              <SelectItem value="COACH">Coaches</SelectItem>
            </SelectContent>
          </Select>

          <Select value={reqParam} onValueChange={(v) => setParams({ req: v })}>
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder="Request status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="REQUESTED">Requested</SelectItem>
              <SelectItem value="NOT_REQUESTED">Not requested</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Badge variant="destructive" className="w-fit bg-white text-black border-1 border-black">
          {filtered.length} results
        </Badge>
        <Button type="button" variant="outline" className="bg-red-500 text-white hover:bg-red-600 hover:text-white cursor-pointer" onClick={clearAll}>
          Clear
        </Button>
      </div>

      {
        filtered.length === 0 ? (
          <div className="rounded-2xl border p-10 text-center">
            <div className="text-lg font-medium">No matches</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Try a different search or clear filters.
            </div>
            <div className="mt-4">
              <Button type="button" variant="secondary" onClick={clearAll}>
                Clear filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((u) => (
              <FindPartner
                key={u.id}
                id={u.id}
                name={u.name}
                role={u.role}
                image={u.image ?? null}
                initialRequested={requestedSet.has(u.id)}
              />
            ))}
          </div>
        )
      }
    </div >
  )
}