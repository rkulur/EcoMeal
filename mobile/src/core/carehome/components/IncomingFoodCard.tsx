import { PoppinsText } from "@/src/components";
import DefaultProfile from "@/src/components/DefaultProfile";
import {
  BORDER_RADIUS,
  COLORS,
  FONT,
  FONT_SIZE,
  GRADIENT_SECONDARY_REVERSED,
  SPACING,
} from "@/src/themes";
import getDonationName from "@/src/utils/getDonationName";
import {
  DonationHistoryListType,
  DonationType,
} from "@/src/validation/donate.schema";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import DonorCard from "../../donor/components/impact/DonorCard";
import Status from "../../donor/components/dashboard/Status";
import OutlineButton from "@/src/components/OutlineButton";
type IncomingFoodCardProps = {
  donation: DonationHistoryListType;
};

const IncomingFoodCard = ({ donation }: IncomingFoodCardProps) => {
  return (
    <View style={s.incomingFoodCard}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <PoppinsText
            style={{
              fontFamily: FONT.SEMI_BOLD,
              fontSize: FONT_SIZE.xmedium,
            }}
          >
            {"Delivery"}
          </PoppinsText>
          <PoppinsText>ETA: 30min</PoppinsText>
          <PoppinsText>NGO: Helping Hands</PoppinsText>
        </View>
        <View>
          <Status status="assigned" />
        </View>
      </View>
      <PoppinsText
        style={{
          fontFamily: FONT.SEMI_BOLD,
        }}
      >
        {"Items"}
      </PoppinsText>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <PoppinsText>Cooked Meals</PoppinsText>
          <PoppinsText>10 plates</PoppinsText>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <PoppinsText>Cooked Meals</PoppinsText>
          <PoppinsText>10 plates</PoppinsText>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <PoppinsText>Cooked Meals</PoppinsText>
          <PoppinsText>10 plates</PoppinsText>
        </View>
      </View>
      <OutlineButton onPress={() => null} text={"View Details"} />
    </View>
  );
};

export default IncomingFoodCard;

const s = StyleSheet.create({
  incomingFoodCard: {
    paddingVertical: SPACING.cardVertical / 2,
    paddingHorizontal: SPACING.cardHorizontal / 2,
    gap: 5,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    borderColor: COLORS.outlineGray,
  },
});
