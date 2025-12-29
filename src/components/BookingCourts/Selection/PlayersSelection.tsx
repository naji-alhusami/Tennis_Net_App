"use client"

export default function PlayersSelection() {
    return <div>test</div>

}

//     return (
//         <Card className="rounded-2xl">
//             <CardHeader className="space-y-1">
//                 {/* <CardTitle className="text-lg">Choose a time</CardTitle> */}
//                 <div className="text-center text-sm text-muted-foreground">
//                     {formatYYYYMMDD(selectedDate)}
//                 </div>
//             </CardHeader>

//             <CardContent>
//                 <div className="max-h-50 overflow-y-auto pr-1">
//                     <div className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-4">
//                         {slots.map((slot) => {
//                             const isBooked = slot.status === "booked"
//                             const isPast = isPastSlotToday(selectedDate, slot.time, now)
//                             const disabled = isBooked || isPast
//                             const selected = values.includes(slot.time)

//                             let bgClass = ""

//                             if (isBooked) {
//                                 bgClass = "bg-red-500 text-white hover:bg-red-500"
//                             } else if (isPast) {
//                                 bgClass = "bg-gray-300 text-gray-600 cursor-not-allowed"
//                             } else {
//                                 bgClass = selected
//                                     ? "bg-green-800 text-white hover:bg-green-800"
//                                     : "bg-green-100 text-green-800 hover:bg-green-200"
//                             }

//                             return (
//                                 <Button
//                                     key={slot.time}
//                                     type="button"
//                                     disabled={disabled}
//                                     onClick={() => onToggle?.(slot.time)}
//                                     className={cn(
//                                         "h-10 rounded-xl justify-center border",
//                                         bgClass
//                                     )}
//                                 >
//                                     {slot.time}
//                                 </Button>
//                             )
//                         })}
//                     </div>
//                 </div>

//                 <div className="mt-4 flex gap-3 text-xs">
//                     <span className="flex items-center gap-2">
//                         <span className="h-3 w-3 rounded bg-green-500" /> Available
//                     </span>
//                     <span className="flex items-center gap-2">
//                         <span className="h-3 w-3 rounded bg-red-500" /> Booked
//                     </span>
//                     <span className="flex items-center gap-2">
//                         <span className="h-3 w-3 rounded bg-gray-400" /> Past
//                     </span>
//                     <span className="flex items-center gap-2">
//                         <span className="h-3 w-3 rounded bg-green-800" /> Selected
//                     </span>
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }
