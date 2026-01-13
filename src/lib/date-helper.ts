import moment from 'moment-hijri';

// Ramadan is the 9th month, but moment-hijri is 0-indexed, so it's 8.
const RAMADAN_MONTH_INDEX = 8;

/**
 * Gets the current day of Ramadan. Returns null if it's not Ramadan.
 */
export function getRamadanDay(): number | null {
  const now = moment();
  if (now.iMonth() === RAMADAN_MONTH_INDEX) {
    return now.iDate();
  }
  return null;
}

/**
 * Checks if the current date is within Ramadan.
 */
export function isRamadan(): boolean {
  return moment().iMonth() === RAMADAN_MONTH_INDEX;
}

/**
 * Gets the day of the Hijri year (1-355).
 */
export function getHijriDayOfYear(): number {
  const now = moment();
  return now.iDayOfYear();
}

/**
 * Gets the current Hijri date components.
 */
export function getHijriDate(): { day: number, month: number, year: number } {
    const now = moment();
    return {
        day: now.iDate(),
        month: now.iMonth() + 1, // month is 0-indexed, so we add 1 for clarity
        year: now.iYear()
    };
}
