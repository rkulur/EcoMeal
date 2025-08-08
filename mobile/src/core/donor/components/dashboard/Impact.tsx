import { PoppinsHeadText, PoppinsText } from "@/src/components";
import GradientButton from "@/src/components/GradientButton";
import {
  BORDER_RADIUS,
  COLORS,
  FONT,
  FONT_SIZE,
  GRADIENT_SECONDARY,
  HEIGHT,
  LINE_HEIGHT,
  SPACING,
} from "@/src/themes";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import HeadingWithSubtext from "../HeadingWithSubtext";
import OutlineButton from "@/src/components/OutlineButton";

type ImpactProps = {
  noOfDonations: number;
  noOfMeals: number;
  noOfNgosHelped: number;
};
const Impact = ({ noOfMeals, noOfDonations, noOfNgosHelped }: ImpactProps) => {
  const router = useRouter();
  return (
    <View style={[s.container]}>
      <HeadingWithSubtext
        heading="Your Impact"
        subheading="See the difference you're making"
      />
      <View style={s.infoContainer}>
        <View style={s.info}>
          <PoppinsHeadText style={s.heading}>{noOfDonations}</PoppinsHeadText>
          <PoppinsText style={s.subheading}>Donations</PoppinsText>
        </View>
        <View style={s.info}>
          <PoppinsHeadText style={s.heading}>{noOfMeals}</PoppinsHeadText>
          <PoppinsText style={s.subheading}>Meals</PoppinsText>
        </View>
        <View style={s.info}>
          <PoppinsHeadText style={s.heading}>{noOfNgosHelped}</PoppinsHeadText>
          <PoppinsText style={s.subheading}>NGOs Helped</PoppinsText>
        </View>
      </View>
      <OutlineButton
        text="View Detailed Impact"
        onPress={() => router.navigate("/donor/impact")}
      />
    </View>
  );
};

export default Impact;

const s = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.cardHorizontal,
    paddingVertical: SPACING.cardVertical,
    paddingTop: SPACING.cardVertical - 10,
    borderRadius: BORDER_RADIUS,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
    gap: 20,
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
    fontSize: FONT_SIZE.xxlarge,
    fontFamily: FONT.SEMI_BOLD,
  },
  subheading: {},
  button: {
    height: HEIGHT.button,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
});
