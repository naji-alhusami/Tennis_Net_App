import { z } from "zod"

export const CreateReservationValidator = z.object({
  courtType: z.enum(["CLAY", "HARD"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  time: z.string().regex(/^\d{2}:\d{2}$/), // "11:00"
  players: z.array(z.string()).default([]),
  durationMinutes: z.number().int().positive().default(60),
  note: z.string().max(500).optional(),
})

export type CreateReservationData = z.infer<typeof CreateReservationValidator>
