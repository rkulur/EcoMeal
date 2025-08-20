import { PoppinsHeadText, PoppinsText } from "@/src/components";
import {
  BORDER_RADIUS,
  COLORS,
  FONT,
  FONT_SIZE,
  GRADIENT_SECONDARY,
  GRADIENT_SECONDARY_REVERSED,
  LINE_HEIGHT,
  SPACING,
} from "@/src/themes";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

const ImpactReports = () => {
  return (
    <View style={s.container}>
      <View style={s.infoContainer}>
        <View style={s.info}>
          <PoppinsText
            style={{ fontFamily: FONT.SEMI_BOLD, fontSize: FONT_SIZE.medium }}
          >
            Total meals served
          </PoppinsText>
          <PoppinsText style={s.heading}>1,250</PoppinsText>
        </View>
        <View>
          <LinearGradient
            colors={GRADIENT_SECONDARY_REVERSED}
            style={{
              padding: 10,
              borderRadius: 9999,
              boxShadow: "0px 2px 3px rgba(0,0,0,0.2)",
            }}
          >
            <Ionicons name="pie-chart-outline" size={30} />
          </LinearGradient>
        </View>
      </View>
      <View style={s.infoContainer}>
        <View style={s.info}>
          <PoppinsText
            style={{ fontFamily: FONT.SEMI_BOLD, fontSize: FONT_SIZE.medium }}
          >
            Food Received
          </PoppinsText>
          <PoppinsText style={s.heading}>325 Kg</PoppinsText>
        </View>
        <View>
          <LinearGradient
            colors={GRADIENT_SECONDARY_REVERSED}
            style={{
              padding: 10,
              borderRadius: 9999,
              boxShadow: "0px 2px 3px rgba(0,0,0,0.2)",
            }}
          >
            <Feather name="box" size={30} />
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default ImpactReports;

const s = StyleSheet.create({
  container: {
    gap: 10,
    borderRadius: BORDER_RADIUS,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    justifyContent: "center",
  },
  heading: {
    lineHeight: LINE_HEIGHT.heading,
    fontSize: FONT_SIZE.xlarge,
    fontFamily: FONT.SEMI_BOLD,
  },
  subheading: {
    fontSize: FONT_SIZE.small,
  },
});
