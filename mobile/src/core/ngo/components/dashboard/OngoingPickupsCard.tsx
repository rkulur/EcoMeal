import { PoppinsText } from "@/src/components";
import {
  BORDER_RADIUS,
  FONT,
  FONT_SIZE,
  GRADIENT_SECONDARY_REVERSED,
  SPACING,
} from "@/src/themes";
import getDonationName from "@/src/utils/getDonationName";
import getMinimumExpiry from "@/src/utils/getMinExpiry";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Status from "../../../donor/components/dashboard/Status";
import GradientButton from "@/src/components/GradientButton";
import ProgressBar from "../../../donor/components/ProgressBar";
import { AvailableDonation, DonationType } from "@/src/types/donor";
import { useAlertModal } from "@/src/hooks/AlertModalContext";

type OngoingDonationCardProps = {
  donation: DonationType;
};
const OngoingDonationCard = ({ donation }: OngoingDonationCardProps) => {
  const { showModal } = useAlertModal();
  return (
    <View style={s.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <PoppinsText
            style={{ fontSize: FONT_SIZE.xmedium, fontFamily: FONT.SEMI_BOLD }}
          >
            {getDonationName(donation)}
          </PoppinsText>
          {
            //TODO: Calculate the Km
          }
          <PoppinsText>{donation.donor + "- Km"}</PoppinsText>
        </View>
        <View>
          <Status status={donation.status} />
        </View>
      </View>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <PoppinsText>Pickup progress</PoppinsText>
          <PoppinsText>75%</PoppinsText>
        </View>
        <ProgressBar progress={75} />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Ionicons name="time-outline" size={20} />
          <PoppinsText style={{ fontSize: FONT_SIZE.medium }}>
            {getMinimumExpiry(donation.foodItems)
              ? "Expires in " + getMinimumExpiry(donation.foodItems) + " days"
              : "Expires Today"}
          </PoppinsText>
        </View>
        <GradientButton
          onPress={() => {
            showModal("Ooops!", "No data to show");
          }}
          text={"Details"}
          style={{ flex: 0.5 }}
          gradient={GRADIENT_SECONDARY_REVERSED}
        />
      </View>
    </View>
  );
};

export default OngoingDonationCard;

const s = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    paddingVertical: SPACING.cardVertical,
    paddingHorizontal: SPACING.cardHorizontal,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    gap: 10,
  },
});
