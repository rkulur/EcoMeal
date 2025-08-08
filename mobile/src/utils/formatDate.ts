export function formatDateDMY(date: Date, includeTime?: boolean): string {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();

  let result = `${d}/${m}/${y}`;

  if (includeTime) {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    result += `, ${formattedHours}:${minutes} ${ampm}`;
  }

  return result;
}
