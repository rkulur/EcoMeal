import { AvailableDonation } from "../core/ngo/api/getAvailaleDonations";
import {
  DonationHistoryListType,
  DonationType,
} from "../validation/donate.schema";

export default function getDonationName(
  donation: DonationType | DonationHistoryListType | AvailableDonation,
) {
  const fullString = donation.foodItems.map((item) => item.name).join(", ");

  const maxChars = 20;

  return fullString.length > maxChars
    ? fullString.slice(0, maxChars).trimEnd() + "..."
    : fullString;
}
