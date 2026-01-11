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
