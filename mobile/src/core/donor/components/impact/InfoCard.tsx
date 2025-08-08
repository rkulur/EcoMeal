import { PoppinsHeadText, PoppinsText } from "@/src/components";
import { BORDER_RADIUS, COLORS, FONT_SIZE, SPACING } from "@/src/themes";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "../ProgressBar";
import { ReactNode } from "react";
import { GlyphMap } from "@expo/vector-icons/build/createIconSet";
type InfoCardProps = {
  heading: string;
  value: string;
  iconName: keyof typeof Ionicons.glyphMap;
  children: ReactNode;
};
const InfoCard = ({ heading, value, iconName, children }: InfoCardProps) => {
  const currDonation = 15;
  const totalDonation = 20;
  return (
    <View style={s.infoCard}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <PoppinsText style={{ fontSize: FONT_SIZE.medium }}>
          {heading}
        </PoppinsText>
        <Ionicons name={iconName} size={25} />
      </View>
      <PoppinsHeadText style={{ fontSize: FONT_SIZE.xxlarge }}>
        {value}
      </PoppinsHeadText>
      {children}
    </View>
  );
};

export default InfoCard;

const s = StyleSheet.create({
  infoCard: {
    paddingVertical: SPACING.cardVertical,
    paddingHorizontal: SPACING.cardHorizontal,
    borderWidth: 1,
    borderColor: COLORS.outlineGray,
    borderRadius: BORDER_RADIUS,
  },
});
