export function getDaysDifferenceFromToday(inputDate: Date): number {
  const today = new Date();
  const utcToday = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const utcInput = Date.UTC(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate(),
  );
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((utcInput - utcToday) / msPerDay);
}
