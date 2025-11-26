import { DonationHistoryListType, DonationType } from "../types/donor";
import { AvailableDonation } from "../types/donor";

export default function getDonationName(
  donation: DonationType | DonationHistoryListType | AvailableDonation,
  maxChars?: number,
) {
  const fullString = donation.foodItems.map((item) => item.name).join(", ");

  !maxChars && (maxChars = 20);

  return fullString.length > maxChars
    ? fullString.slice(0, maxChars).trimEnd() + "..."
    : fullString;
}
