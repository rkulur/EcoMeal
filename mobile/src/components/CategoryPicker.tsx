import { StyleSheet, Text, View } from "react-native";
import PoppinsText from "./PoppinsText";
import { Picker } from "@react-native-picker/picker";
import { BORDER_RADIUS } from "../themes";

type CustomPickerProps = {
  value: string | undefined;
  label: string;
  onValueChange: (text: string) => void;
  categoryOptions: { label: string; value: string }[];
};
const CustomPicker = ({
  label,
  onValueChange,
  categoryOptions,
  value,
}: CustomPickerProps) => {
  return (
    <View>
      <PoppinsText>{label}</PoppinsText>
      <View style={s.categoryPicker}>
        <Picker selectedValue={value} onValueChange={onValueChange}>
          <Picker.Item label="Choose..." value="" style={s.pickerItem} />
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

export default CustomPicker;

const s = StyleSheet.create({
  categoryPicker: {
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    fontFamily: "Poppins_400Regular",
  },
  pickerItem: {
    fontFamily: "Poppins_400Regular",
  },
});
