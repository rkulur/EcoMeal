import { PoppinsHeadText, PoppinsText } from "@/src/components";
import {
  BORDER_RADIUS,
  FONT,
  FONT_SIZE,
  GRADIENT_SECONDARY_REVERSED,
  LINE_HEIGHT,
  SPACING,
} from "@/src/themes";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";

type InfoCardProps = {
  icon: ReactNode;
  title: string;
  count: number;
};

const InfoCard = ({ icon, title, count }: InfoCardProps) => {
  return (
    <LinearGradient style={s.container} colors={GRADIENT_SECONDARY_REVERSED}>
      {icon}
      <PoppinsText style={{ textAlign: "center" }}>{title}</PoppinsText>
      <PoppinsHeadText style={s.heading}>{count}</PoppinsHeadText>
    </LinearGradient>
  );
};

export default InfoCard;

const s = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
    paddingHorizontal: SPACING.cardVertical / 2,
    paddingVertical: SPACING.cardHorizontal / 2,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    width: "47%",
  },
  heading: {
    lineHeight: LINE_HEIGHT.heading,
    fontSize: FONT_SIZE.xxlarge,
    fontFamily: FONT.SEMI_BOLD,
  },
});
