import { StyleSheet, Text, View } from "react-native";
import PoppinsText from "./PoppinsText";
import { Picker } from "@react-native-picker/picker";
import { BORDER_RADIUS, COLORS, FONT, HEIGHT } from "../themes";

type CustomSelectProps = {
  value: string | undefined;
  label: string;
  onValueChange: (text: string) => void;
  categoryOptions: { label: string; value: string }[];
};
const CustomSelect = ({
  label,
  onValueChange,
  categoryOptions,
  value,
}: CustomSelectProps) => {
  return (
    <View style={{ flex: 1 }}>
      <PoppinsText>{label}</PoppinsText>
      <View style={s.categoryPicker}>
        <Picker selectedValue={value} onValueChange={onValueChange}>
          {categoryOptions.map((opt) => (
            <Picker.Item
              key={opt.value}
              label={opt.label}
              value={opt.value}
              style={s.pickerItem}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default CustomSelect;

const s = StyleSheet.create({
  categoryPicker: {
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLORS.outlineGray,
    fontFamily: FONT.REGULAR,
    backgroundColor: COLORS.white,
  },
  pickerItem: {
    fontFamily: FONT.REGULAR,
  },
});
