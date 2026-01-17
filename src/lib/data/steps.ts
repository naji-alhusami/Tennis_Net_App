// Defines all the Steps and as const for making the values fixed
export const BOOKING_STEPS = [
  { key: "court", label: "Court" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "players", label: "Players" },
  { key: "confirm", label: "Confirm" },
] as const;

export type StepKey = (typeof BOOKING_STEPS)[number]["key"];
