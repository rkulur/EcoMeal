import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { BORDER_RADIUS, COLORS, FONT, FONT_SIZE, HEIGHT } from "../themes";
import PoppinsText from "./PoppinsText";
import { useState } from "react";

interface InputBoxProps extends TextInputProps {
  label: string;
  onChangeText: (text: string) => void;
  value?: string;
  canEdit?: boolean;
}
const InputBox = ({
  label,
  keyboardType,
  onChangeText,
  style,
  value,
  canEdit,
}: InputBoxProps) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={[styles.view]}>
      <PoppinsText style={[styles.label, style]}>{label}</PoppinsText>
      <TextInput
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        editable={canEdit}
        style={[
          styles.input,
          style,
          { borderColor: isFocus ? "black" : COLORS.outlineGray },
        ]}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  view: {
    gap: 3,
  },
  label: {
    fontSize: FONT_SIZE.medium,
  },
  input: {
    padding: 10,
    borderRadius: BORDER_RADIUS,
    borderColor: "#000000",
    borderWidth: 1,
    height: HEIGHT.input,
    fontFamily: FONT.REGULAR,
    backgroundColor: COLORS.white,
  },
});
