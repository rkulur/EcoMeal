/**
 * Parses a "dd/mm/yyyy" string into a JavaScript Date object.
 * Returns a valid Date, or null if the input is invalid.
 */
export function parseDDMMYYYY(input: string): Date | null {
  const parts = input.split("/");
  if (parts.length !== 3) return null;

  const day = Number(parts[0]);
  const month = Number(parts[1]) - 1; // JS months are 0‑based
  const year = Number(parts[2]);

  if (
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year) ||
    month < 0 ||
    month > 11 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }

  const date = new Date(year, month, day);
  // Check if the date matches (handles invalid dates like 31/02)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}
