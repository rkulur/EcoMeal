import {
  KeyboardType,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import PoppinsText from "./PoppinsText";
import { BORDER_RADIUS, FONT_SIZE } from "../themes";

interface InputBoxProps extends TextInputProps {
  label: string;
  onChangeText: (text: string) => void;
}
const InputBox = ({
  label,
  keyboardType,
  onChangeText,
  ...textInputProps
}: InputBoxProps) => {
  return (
    <View style={styles.view}>
      <PoppinsText style={styles.label}>{label}</PoppinsText>
      <TextInput
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        style={styles.input}
        {...textInputProps}
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
    fontSize: FONT_SIZE.subheading,
  },
  input: {
    borderRadius: BORDER_RADIUS,
    borderColor: "#000000",
    borderWidth: 1,
    height: 50,
  },
});
