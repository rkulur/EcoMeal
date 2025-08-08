import { StyleSheet, Text, View } from "react-native";
import HeadingWithSubtext from "../HeadingWithSubtext";
import DonationHistoryCard from "./DonationHistoryCard";
import OutlineButton from "@/src/components/OutlineButton";
import { BORDER_RADIUS, COLORS, SPACING } from "@/src/themes";
import { PoppinsText } from "@/src/components";
import { DonationHistoryListType } from "@/src/validation/donate.schema";
import getDonationName from "@/src/utils/getDonationName";

type DonationHistoryProps = {
  donations?: DonationHistoryListType[];
};
const DonationHistory = ({ donations }: DonationHistoryProps) => {
  if (!donations || donations.length === 0) {
    return (
      <View style={s.container}>
        <HeadingWithSubtext
          heading="Donation History"
          subheading="Your past contributions"
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
            No donation history
          </PoppinsText>
        </View>
      </View>
    );
  }
  return (
    <View style={s.container}>
      <HeadingWithSubtext
        heading="Donation History"
        subheading="Your past contributions"
      />
      <View style={{ gap: 10 }}>
        {donations.map((donation, idx) => (
          <DonationHistoryCard
            name={getDonationName(donation)}
            meals={donation.foodItems.length}
            status={donation.status}
            key={idx}
          />
        ))}
      </View>
      <OutlineButton text="View Full History" onPress={() => null} />
    </View>
  );
};

export default DonationHistory;

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
