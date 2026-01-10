import { z } from "zod";

export const CreateReservationValidator = z.object({
  courtType: z.enum(["HARD", "CLAY"]),
  courtLocation: z.enum(["INDOOR", "OUTDOOR"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "time must be HH:mm"),
  players: z.array(z.string()).default([]),
  durationMinutes: z.number().int().positive(),
  note: z.string().optional(),
});

export type CreateReservationInput = z.infer<typeof CreateReservationValidator>;
