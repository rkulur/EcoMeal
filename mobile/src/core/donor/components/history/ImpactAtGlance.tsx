import { PoppinsHeadText, PoppinsText } from "@/src/components";
import {
  BORDER_RADIUS,
  FONT,
  FONT_SIZE,
  GRADIENT_SECONDARY,
  GRADIENT_SECONDARY_REVERSED,
  LINE_HEIGHT,
  SPACING,
} from "@/src/themes";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

type ImpactProps = {
  noOfDonations: number;
  noOfMeals: number;
  noOfNgosHelped: number;
};
const ImpactAtGlance = ({
  noOfDonations,
  noOfMeals,
  noOfNgosHelped,
}: ImpactProps) => {
  return (
    <View
      style={{
        borderRadius: BORDER_RADIUS,
        overflow: "hidden",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      <LinearGradient colors={GRADIENT_SECONDARY_REVERSED} style={s.container}>
        <PoppinsText
          style={{ fontFamily: FONT.SEMI_BOLD, fontSize: FONT_SIZE.xmedium }}
        >
          Your Impact at a Glance
        </PoppinsText>
        <View style={s.infoContainer}>
          <View style={s.info}>
            <PoppinsHeadText style={s.heading}>{noOfDonations}</PoppinsHeadText>
            <PoppinsText style={s.subheading}>Total Donations</PoppinsText>
          </View>
          <View style={s.info}>
            <PoppinsHeadText style={s.heading}>{noOfMeals}</PoppinsHeadText>
            <PoppinsText style={s.subheading}>Total Meals</PoppinsText>
          </View>
          <View style={s.info}>
            <PoppinsHeadText style={s.heading}>
              {noOfNgosHelped}
            </PoppinsHeadText>
            <PoppinsText style={s.subheading}>NGOs Helped</PoppinsText>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ImpactAtGlance;

const s = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  info: {
    alignItems: "center",
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
