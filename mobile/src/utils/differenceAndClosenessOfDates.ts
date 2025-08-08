type DiffSummary = {
  difference: string;
  closeness: number; // 1–100
};

export function diffSummaryAndCloseness(
  dateA: Date | string | number,
  dateB: Date | string | number,
): DiffSummary {
  const a = new Date(dateA).getTime();
  const b = new Date(dateB).getTime();
  const diffSec = Math.abs(b - a) / 1000;

  const units = [
    { label: "day", secs: 86400 },
    { label: "hour", secs: 3600 },
    { label: "minute", secs: 60 },
    { label: "second", secs: 1 },
  ];

  let diffLabel = "0 seconds";
  for (const { label, secs } of units) {
    const count = Math.floor(diffSec / secs);
    if (count >= 1) {
      diffLabel = `${count} ${label}${count > 1 ? "s" : ""}`;
      break;
    }
  }

  // Closeness: exact match = 100, far apart = closer to 1
  // Using a max span (e.g. 3 days) for scaling
  const maxSpan = 3 * 86400; // seconds
  const capped = Math.min(diffSec, maxSpan);
  const closeness = Math.max(1, Math.round(100 - (capped / maxSpan) * 99));

  return { difference: diffLabel, closeness };
}
