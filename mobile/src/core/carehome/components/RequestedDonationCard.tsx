import { PoppinsText } from "@/src/components";
import { BORDER_RADIUS, COLORS, FONT, FONT_SIZE, SPACING } from "@/src/themes";
import { AvailableDonation, DonationType } from "@/src/types/donor";
import getDonationName from "@/src/utils/getDonationName";
import getMinimumExpiry from "@/src/utils/getMinExpiry";
import { Feather, Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Status from "../../donor/components/dashboard/Status";
import { formatDateTime } from "@/src/utils/formatDateTime";

type RequestedDonationCardProps = {
  donation: DonationType;
  children?: ReactNode;
};
const RequestedDonationCard = ({
  donation,
  children,
}: RequestedDonationCardProps) => {
  console.log(donation);
  return (
    <View style={s.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 5,
        }}
      >
        <View>
          <PoppinsText
            style={{ fontSize: FONT_SIZE.medium, fontFamily: FONT.SEMI_BOLD }}
          >
            {getDonationName(donation)}
          </PoppinsText>
        </View>
        <Status
          status={
            donation.requestedCarehomes &&
            donation.requestedCarehomes![0].status
          }
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Ionicons name="calendar" size={18} />
          <PoppinsText style={{ fontSize: FONT_SIZE.small }}>
            Requested on{" "}
            {donation.requestedCarehomes &&
              formatDateTime(
                new Date(donation.requestedCarehomes[0].requestedAt.toString()),
              )}
          </PoppinsText>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <Ionicons name="time-outline" size={18} />
        <PoppinsText style={{}}>
          {getMinimumExpiry(donation.foodItems)
            ? "Expires in " + getMinimumExpiry(donation.foodItems) + " days"
            : "Expires Today"}
        </PoppinsText>
      </View>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <Feather name="user" size={18} />
        <PoppinsText style={{}}>Donation by {donation.donor.name}</PoppinsText>
      </View>
      {children}
    </View>
  );
};

export default RequestedDonationCard;

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
