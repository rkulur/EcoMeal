import { FoodItem } from "../types/donor";
import { getDaysDifferenceFromToday } from "./getDaysDifferenceFromToday";

type FoodItemProps = Omit<FoodItem, "expiryDate"> & { expiryDate?: string };

export default function getMinimumExpiry(
  foodItems: FoodItem[] | FoodItemProps[],
) {
  let min = 0;

  foodItems.forEach((item) => {
    if (!item.expiryDate) return;
    let expiryDate = new Date(item.expiryDate);
    min = Math.min(getDaysDifferenceFromToday(expiryDate), min);
  });

  return min;
}
