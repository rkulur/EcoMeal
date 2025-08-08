import { BORDER_RADIUS, COLORS, FONT } from "@/src/themes";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";

type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
};
const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <View style={s.container}>
      <Ionicons name="search" size={20} />
      <TextInput
        placeholder="Search donations"
        value={value}
        onChangeText={(text) => onChange(text)}
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
