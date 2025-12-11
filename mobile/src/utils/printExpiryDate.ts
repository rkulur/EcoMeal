import { getDaysDifferenceFromToday } from "./getDaysDifferenceFromToday";

export function printExpiryDate(expiryDate: Date) {
  const inDays = getDaysDifferenceFromToday(expiryDate);

  if (inDays < 0) return -1;
  if (inDays === 0) return "Today";
  if (inDays === 1) return "1 day";
  return `${inDays} days`;
}
