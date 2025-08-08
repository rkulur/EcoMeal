import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../assets/images/ecomeal_logo_v2.png";
import { COLORS, FONT, FONT_SIZE, GRADIENT_PRIMARY, SPACING } from "../themes";
import PoppinsHeadText from "./PoppinsHeadText";

const PageHeader = () => {
  return (
    <View style={s.header}>
      <View style={s.logoView}>
        <Image source={logo} style={s.logo} />
        <PoppinsHeadText>EcoMeal</PoppinsHeadText>
      </View>
      <View>
        <View style={s.notificationContainer}>
          <Ionicons name="notifications-outline" size={30} />
          <LinearGradient
            colors={GRADIENT_PRIMARY}
            style={s.notificationIndicator}
          >
            <Text style={s.notificationNum}>99</Text>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default PageHeader;

const s = StyleSheet.create({
  header: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.page,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  },
  logo: {
    width: 38,
    height: 38,
  },
  logoView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  notificationContainer: {
    flexDirection: "row",
    position: "relative",
  },
  notificationIndicator: {
    borderRadius: 9999999999,
    width: 20,
    height: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 25,
    top: -5,
  },
  notificationNum: {
    color: "white",
    fontSize: FONT_SIZE.xsmall,
    fontFamily: FONT.BOLD,
  },
});
