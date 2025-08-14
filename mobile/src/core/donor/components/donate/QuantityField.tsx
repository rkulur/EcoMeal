import { InputBox, PoppinsText } from "@/src/components";
import { BORDER_RADIUS, COLORS, FONT_SIZE, HEIGHT } from "@/src/themes";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";

type QuantityFieldProps = {
  onChange: (...event: any[]) => void;
  foodItem: {
    name: string;
    quantity: number;
    expiryDate?: Date;
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
};
const QuantityField = ({ foodItem, onChange }: QuantityFieldProps) => {
  const intervalRef = useRef<number | null>(null);
  const currentQuantity = useRef(foodItem.quantity);

  const handlePress = (type: "increment" | "decrement") => {
    const change = type === "increment" ? 1 : -1;
    const applyChange = () => {
      const next = currentQuantity.current + change;
      if (next < 1) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        return;
      }

      currentQuantity.current = next;
      onChange({ ...foodItem, quantity: currentQuantity.current });
      Haptics.selectionAsync();
    };
    applyChange();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    intervalRef.current = setInterval(() => {
      applyChange();
    }, 150) as unknown as number;
  };

  const handleIncrementPressIn = () => handlePress("increment");
  const handleDecrementPressIn = () => handlePress("decrement");
  const handlePressOut = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <View style={s.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PoppinsText>Quantity</PoppinsText>
        <View
          style={{
            height: HEIGHT.input,
            flex: 1,
            width: "100%",
            borderRadius: BORDER_RADIUS,
            borderColor: COLORS.outlineGray,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PoppinsText> {foodItem.quantity.toString()} </PoppinsText>
        </View>
      </View>
      <View style={{ height: HEIGHT.input, gap: 2 }}>
        <Pressable
          onPressIn={handleIncrementPressIn}
          onPressOut={handlePressOut}
          style={{ padding: 3 }}
        >
          <Ionicons name="arrow-up" size={20} />
        </Pressable>
        <Pressable
          onPressIn={handleDecrementPressIn}
          onPressOut={handlePressOut}
          style={{ padding: 3 }}
        >
          <Ionicons name="arrow-down" size={20} />
        </Pressable>
      </View>
    </View>
  );
};

export default QuantityField;

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  inputText: {
    fontSize: FONT_SIZE.medium,
    borderColor: COLORS.outlineGray,
  },
});
