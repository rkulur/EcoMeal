import { PoppinsText } from "@/src/components";
import GradientButton from "@/src/components/GradientButton";
import OutlineButton from "@/src/components/OutlineButton";
import {
  BORDER_RADIUS,
  COLORS,
  FONT,
  FONT_SIZE,
  GRADIENT_PRIMARY,
  SPACING,
} from "@/src/themes";
import getDonationName from "@/src/utils/getDonationName";
import getMinimumExpiry from "@/src/utils/getMinExpiry";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { AvailableDonation } from "../../api/getAvailaleDonations";

type AvailableDonationCardProps = {
  donation: AvailableDonation;
};
const AvailableDonationCard = ({ donation }: AvailableDonationCardProps) => {
  return (
    <View style={s.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <PoppinsText
            style={{ fontSize: FONT_SIZE.medium, fontFamily: FONT.SEMI_BOLD }}
          >
            {getDonationName(donation)}
          </PoppinsText>
          <PoppinsText>
            {donation.donorInfo.name} - {(donation.distance / 1000).toFixed(2)}{" "}
            km
          </PoppinsText>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Ionicons name="time-outline" size={18} />
          <PoppinsText style={{}}>
            {getMinimumExpiry(donation.foodItems)
              ? "Expires in " + getMinimumExpiry(donation.foodItems) + " days"
              : "Expires Today"}
          </PoppinsText>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <OutlineButton onPress={() => null} text={"View Details"} />
        <GradientButton
          onPress={() => null}
          text={"Accept"}
          style={{ flex: 1 }}
          gradient={GRADIENT_PRIMARY}
        />
      </View>
    </View>
  );
};

export default AvailableDonationCard;

const s = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: SPACING.cardHorizontal / 2,
    paddingVertical: SPACING.cardVertical / 2,
    borderWidth: 1,
    borderColor: COLORS.outlineGray,
    gap: 10,
  },
});
