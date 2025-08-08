import { GradientText, PoppinsText } from "@/src/components";
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
import { FlatList, StyleSheet, Text, View } from "react-native";
import { CompletedAchievement } from "./CompletedAchievement";
import { IncompleteAchievement } from "./IncompleteAchievement";

const Achievements = () => {
  const donationSizes = [1, 5, 10, 25, 50, 100, 250, 500, 1000];
  return (
    <FlatList
      style={s.container}
      data={donationSizes}
      renderItem={({ item }) => {
        if (item === 1) return <CompletedAchievement donationSize={item} />;
        return <IncompleteAchievement donationSize={item} />;
      }}
      horizontal
    />
  );
};

export default Achievements;

const s = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    borderColor: COLORS.outlineGray,
    flexDirection: "row",
    padding: 10,
    gap: 10,
  },
});
