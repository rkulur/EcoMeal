import { BORDER_RADIUS, COLORS, FONT } from "@/src/themes";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface SearchBarProps extends TextInputProps {
  value: string;
  onChange: (text: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <View style={s.container}>
      <Ionicons name="search" size={20} />
      <TextInput
        {...props}
        value={props.value}
        onChangeText={(text) => props.onChange(text)}
        style={s.input}
      />
    </View>
  );
};

export default SearchBar;

const s = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.outlineGray,
    borderWidth: 1,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: BORDER_RADIUS,
  },
  input: {
    fontFamily: FONT.REGULAR,
    flex: 1,
  },
});
