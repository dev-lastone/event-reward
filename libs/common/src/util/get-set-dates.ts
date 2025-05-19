export function getSetDates(dates: Date[]) {
  return new Set(dates.map((date) => date.toISOString().split('T')[0]));
}
