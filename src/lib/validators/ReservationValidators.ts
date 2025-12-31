import { z } from "zod";

export const CreateReservationValidator = z.object({
  courtId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // "2026-01-01"
  startTime: z.string().regex(/^\d{2}:\d{2}$/), // "15:00"
  endTime: z.string().regex(/^\d{2}:\d{2}$/), // "16:00"
  note: z.string().max(500).optional(),
});

export type CreateReservationData = z.infer<typeof CreateReservationValidator>;