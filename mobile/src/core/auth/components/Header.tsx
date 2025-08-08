import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../../../assets/images/ecomeal_logo_v2.png";
import PoppinsHeadText from "@/src/components/PoppinsHeadText";

const Header = () => {
  return (
    <View style={s.view}>
      <Image source={logo} style={s.logo} />
      <PoppinsHeadText style={{ fontSize: 37 }}>EcoMeal</PoppinsHeadText>
    </View>
  );
};

export default Header;

const s = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 48,
    height: 48,
  },
});
