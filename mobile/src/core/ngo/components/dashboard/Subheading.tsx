import { PoppinsText } from "@/src/components";
import { FONT, FONT_SIZE } from "@/src/themes";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type SubheadingProps = {
  title: string;
};
const Subheading = ({ title }: SubheadingProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <PoppinsText style={s.container}>{title}</PoppinsText>
    </View>
  );
};

export default Subheading;

const s = StyleSheet.create({
  container: {
    fontSize: FONT_SIZE.large,
    fontFamily: FONT.BOLD,
  },
});
