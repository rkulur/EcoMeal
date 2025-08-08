import { GradientText } from "@/src/components";
import {
  BORDER_RADIUS,
  COLORS,
  FONT,
  FONT_SIZE,
  GRADIENT_PRIMARY,
  GRADIENT_SECONDARY_REVERSED,
} from "@/src/themes";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

type CompletedAchievementProps = {
  donationSize: number;
};
export const CompletedAchievement = ({
  donationSize: donationNumber,
}: CompletedAchievementProps) => {
  return (
    <LinearGradient
      colors={GRADIENT_SECONDARY_REVERSED}
      style={{
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: BORDER_RADIUS,
        borderColor: COLORS.purple,
        backgroundColor: COLORS.lightGray,
        marginRight: 20,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <LinearGradient
          colors={GRADIENT_PRIMARY}
          style={{
            padding: 10,
            borderRadius: 9999999,
            position: "relative",
          }}
        >
          <Ionicons name="medal" size={40} color={COLORS.white} />
          <Ionicons
            name="checkmark-circle"
            style={{
              position: "absolute",
              right: 0,
              backgroundColor: "white",
              borderRadius: 9999999,
            }}
            size={25}
            color={COLORS.green}
          />
        </LinearGradient>
      </View>
      <GradientText
        text={donationNumber === 1 ? "First" : donationNumber.toString()}
        gradient="primary"
        style={{
          fontFamily: FONT.SEMI_BOLD,
          fontSize: FONT_SIZE.medium,
        }}
      />
      <GradientText
        text={donationNumber > 1 ? "Donations" : "Donation"}
        gradient="primary"
        style={{
          fontFamily: FONT.SEMI_BOLD,
          fontSize: FONT_SIZE.medium,
        }}
      />
    </LinearGradient>
  );
};
