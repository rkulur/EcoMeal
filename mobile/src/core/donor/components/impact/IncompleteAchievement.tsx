import { PoppinsText } from "@/src/components";
import { BORDER_RADIUS, COLORS, FONT, FONT_SIZE } from "@/src/themes";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

type IncompleteAchievementProps = {
  donationSize: number;
};
export const IncompleteAchievement = ({
  donationSize,
}: IncompleteAchievementProps) => (
  <View
    style={{
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderRadius: BORDER_RADIUS,
      borderColor: COLORS.outlineGray,
      backgroundColor: COLORS.lightGray,
      marginRight: 20,
    }}
  >
    <View style={{ flexDirection: "row" }}>
      <Ionicons
        name="medal-outline"
        style={{
          backgroundColor: COLORS.hoverGray,
          padding: 10,
          borderRadius: 9999999,
        }}
        size={40}
        color={COLORS.outlineGray}
      />
    </View>
    <PoppinsText
      style={{ fontFamily: FONT.SEMI_BOLD, fontSize: FONT_SIZE.medium }}
    >
      {donationSize === 1 ? "First" : donationSize}
    </PoppinsText>
    <PoppinsText>{donationSize > 1 ? "Donations" : "Donation"}</PoppinsText>
  </View>
);
