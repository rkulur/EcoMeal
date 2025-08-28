import { DonationType, FoodItem } from "../validation/donate.schema";
import { getDaysDifferenceFromToday } from "./getDaysDifferenceFromToday";

type FoodItemProps = {
  name: string;
  quantity: number;
  unit:
    | "plates"
    | "servings"
    | "packets"
    | "containers"
    | "trays"
    | "bowls"
    | "boxes"
    | "liters"
    | "ml";
  expiryDate?: string;
};
export default function getMinimumExpiry(foodItems: FoodItemProps[]) {
  let min = 0;

  foodItems.forEach((item) => {
    if (!item.expiryDate) return;
    let expiryDate = new Date(item.expiryDate);
    min = Math.min(getDaysDifferenceFromToday(expiryDate), min);
  });

  return min;
}
