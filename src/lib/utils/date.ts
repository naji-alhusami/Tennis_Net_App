// Returns today's date at local midnight (00:00:00.000)
export function getStartOfToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return today;
}

// Returns a new Date shifted by the given number of days
export function addDaysToDate(baseDate: Date, daysToAdd: number): Date {
  const resultDate = new Date(baseDate);
  resultDate.setDate(resultDate.getDate() + daysToAdd);

  return resultDate;
}

// Returns the given date at local end of day (23:59:59.999)
export function getEndOfDay(date: Date): Date {
  const endOfDayDate = new Date(date);
  endOfDayDate.setHours(23, 59, 59, 999);

  return endOfDayDate;
}

// Add 0 to the time : 9:0 -> 09:00
export function twoDigitNumber(number: number): string {
  return String(number).padStart(2, "0");
}

// Formats a Date to a local ISO date string (YYYY-MM-DD).
export function formatDateToYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = twoDigitNumber(date.getMonth() + 1);
  const day = twoDigitNumber(date.getDate());

  return `${year}-${month}-${day}`;
}

// dateISO = "2026-01-22" and timeHHmm = "09:00" => Date representing 2026-01-22 09:00 (local)
export function toDateTimeLocal(dateISO: string, timeHHmm: string) {
  const [y, m, d] = dateISO.split("-").map(Number);
  const [hh, mm] = timeHHmm.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm, 0, 0);
}

// Adds minutes to a Date and returns a new Date
export function addMinutesToDate(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000);
}

// "2026-01-19" → Date(2026-01-19 00:00:00 local)
export function parseLocalDate(iso: string | null) {
  if (!iso) return undefined;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d);
}

// "HH:MM" -> minutes since midnight (To check if a time is in the past)
export function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}
