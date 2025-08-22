import { PoppinsHeadText, PoppinsText } from "@/src/components";
import { FONT, FONT_SIZE } from "@/src/themes";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

const AvailableDonations = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PoppinsText style={s.container}>Available Donations</PoppinsText>
        <Pressable
          style={{
            flexDirection: "row",
            gap: 5,
          }}
          onPress={() => null}
        >
          <PoppinsText>View all</PoppinsText>
          <AntDesign name="right" style={{ marginTop: 4 }} />
        </Pressable>
      </View>
    </View>
  );
};

export default AvailableDonations;

const s = StyleSheet.create({
  container: {
    fontSize: FONT_SIZE.xmedium,
    fontFamily: FONT.SEMI_BOLD,
  },
});
