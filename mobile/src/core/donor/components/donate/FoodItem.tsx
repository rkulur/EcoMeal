import { PoppinsText } from "@/src/components";
import { FONT_SIZE } from "@/src/themes";
import { getDaysDifferenceFromToday } from "@/src/utils/getDaysDifferenceFromToday";
import { StyleSheet, Text, View } from "react-native";

type FoodItemProps = {
  foodItem: {
    name: string;
    quantity: number;
    expiryDate: Date;
    unit?:
      | "plates"
      | "servings"
      | "packets"
      | "containers"
      | "trays"
      | "bowls"
      | "boxes"
      | "liters"
      | "ml"
      | undefined;
  };
  count: number;
};

const FoodItem = ({ foodItem, count }: FoodItemProps) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <PoppinsText>{foodItem.name}</PoppinsText>
        <PoppinsText>
          {foodItem.quantity + " " + (foodItem?.unit ?? "")}
        </PoppinsText>
        <PoppinsText style={{ textAlign: "right", fontSize: FONT_SIZE.small }}>
          Expires in {getDaysDifferenceFromToday(foodItem.expiryDate)} days
        </PoppinsText>
      </View>
    </View>
  );
};

export default FoodItem;

const styles = StyleSheet.create({});
