import OutlineButton from "@/src/components/OutlineButton";
import { BORDER_RADIUS, COLORS, SPACING } from "@/src/themes";
import { DonationHistoryListType } from "@/src/validation/donate.schema";
import { StyleSheet, View } from "react-native";
import HeadingWithSubtext from "../HeadingWithSubtext";
import DonationCard from "./DonationCard";
import { PoppinsText } from "@/src/components";
type ActiveDonationsProps = {
  donations?: DonationHistoryListType[];
};
const ActiveDonations = ({ donations }: ActiveDonationsProps) => {
  if (!donations || donations.length === 0) {
    return (
      <View style={s.container}>
        <HeadingWithSubtext
          heading="Active Donations"
          subheading="Donations awaiting pickup or processing"
        />
        <View
          style={{
            gap: 10,
            padding: 20,
            borderRadius: BORDER_RADIUS,
            borderColor: COLORS.outlineGray,
            borderWidth: 1,
          }}
        >
          <PoppinsText
            style={{ textAlign: "center", color: COLORS.outlineGray }}
          >
            No active donations
          </PoppinsText>
        </View>
      </View>
    );
  }
  return (
    <View style={s.container}>
      <HeadingWithSubtext
        heading="Active Donations"
        subheading="Donations awaiting pickup or processing"
      />
      <View style={{ gap: 10 }}>
        {donations?.map((activeDonation, idx) => (
          <DonationCard donation={activeDonation} key={idx} />
        ))}
      </View>
      <OutlineButton text="View All Active Donations" onPress={() => null} />
    </View>
  );
};

export default ActiveDonations;

const s = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.cardHorizontal,
    paddingVertical: SPACING.cardVertical,
    paddingTop: SPACING.cardVertical - 10,
    borderRadius: BORDER_RADIUS,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
    gap: 20,
  },
});
