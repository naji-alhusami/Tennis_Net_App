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
export function formatDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = twoDigitNumber(date.getMonth() + 1);
  const day = twoDigitNumber(date.getDate());

  return `${year}-${month}-${day}`;
}
