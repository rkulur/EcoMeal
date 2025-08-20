import { CustomSelect, InputBox, PoppinsText } from "@/src/components";
import {
  BORDER_RADIUS,
  COLORS,
  FONT,
  FONT_SIZE,
  HEIGHT,
  SPACING,
} from "@/src/themes";
import { Ionicons } from "@expo/vector-icons";
import { FieldErrors } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import QuantityField from "../../donor/components/donate/QuantityField";

type RequestFoodFormProps = {
  requestedItem: {
    name: string;
    quantity: number;
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
  onChange: (...event: any[]) => void;
  count?: number;
  remove: () => void;
  errors: FieldErrors<{
    foodItems: {
      name: string;
      quantity: number;
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
    }[];
  }>;
};
const RequestFoodForm = ({
  requestedItem,
  onChange,
  count = 1,
  remove,
}: RequestFoodFormProps) => {
  const categoryOptions = [
    { label: "Plates", value: "plates" },
    { label: "Servings", value: "servings" },
    { label: "Packets", value: "packets" },
    { label: "Containers", value: "containers" },
    { label: "Trays", value: "trays" },
    { label: "Bowls", value: "bowls" },
    { label: "Boxes", value: "boxes" },
    { label: "Liters", value: "liters" },
    { label: "Ml", value: "ml" },
  ];

  return (
    <View style={s.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            borderRadius: BORDER_RADIUS,
            backgroundColor: COLORS.hoverGray,
            paddingHorizontal: 10,
            paddingVertical: 6,
          }}
        >
          <PoppinsText style={{ fontFamily: FONT.SEMI_BOLD }}>
            Item {count}
          </PoppinsText>
        </View>
        <Ionicons
          name="trash-bin"
          size={20}
          color={COLORS.red}
          onPress={remove}
        />
      </View>
      <InputBox
        label="Food Name"
        onChangeText={(text) => onChange({ ...requestedItem, name: text })}
        value={requestedItem?.name}
        style={s.inputText}
      />
      <View style={s.subcontainer}>
        <QuantityField foodItem={requestedItem} onChange={onChange} />
        <CustomSelect
          label="Unit"
          categoryOptions={categoryOptions}
          value={requestedItem?.unit}
          onValueChange={(text) => onChange({ ...requestedItem, unit: text })}
        />
      </View>
    </View>
  );
};

export default RequestFoodForm;

const s = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: COLORS.white,
    position: "relative",
    padding: SPACING.cardHorizontal,
    borderWidth: 1,
    borderColor: COLORS.outlineGray,
    borderRadius: BORDER_RADIUS,
  },
  subcontainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
  },
  inputText: {
    fontSize: FONT_SIZE.medium,
    borderColor: COLORS.outlineGray,
  },
  input: {
    padding: 10,
    borderRadius: BORDER_RADIUS,
    borderColor: "#000000",
    borderWidth: 1,
    height: HEIGHT.input,
    fontFamily: FONT.REGULAR,
    flex: 1,
    backgroundColor: COLORS.white,
  },
  expiryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
});
