import { PoppinsText } from "@/src/components";
import DefaultProfile from "@/src/components/DefaultProfile";
import {
  BORDER_RADIUS,
  FONT,
  FONT_SIZE,
  GRADIENT_SECONDARY_REVERSED,
  SPACING,
} from "@/src/themes";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
type DonorCardProps = {
  donorName: string;
  joinDate: Date;
};

const getMonthByNumber = (month: number) => {
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[month + 1];
};

const DonorCard = ({ donorName, joinDate }: DonorCardProps) => {
  return (
    <View
      style={{
        borderRadius: BORDER_RADIUS,
        overflow: "hidden",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
      }}
    >
      <LinearGradient colors={GRADIENT_SECONDARY_REVERSED} style={s.donorCard}>
        <DefaultProfile src={null} height={100} width={100} />
        <View>
          <PoppinsText
            style={{
              fontFamily: FONT.BOLD,
              fontSize: FONT_SIZE.large,
            }}
          >
            {donorName}
          </PoppinsText>
          <PoppinsText>
            {"Since " +
              getMonthByNumber(joinDate.getMonth()) +
              " " +
              joinDate.getUTCFullYear()}
          </PoppinsText>
        </View>
      </LinearGradient>
    </View>
  );
};

export default DonorCard;

const s = StyleSheet.create({
  donorCard: {
    flexDirection: "row",
    paddingVertical: SPACING.cardVertical,
    paddingHorizontal: SPACING.cardHorizontal,
    gap: 10,
  },
});
