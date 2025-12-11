import { PoppinsText } from "@/src/components";
import { BORDER_RADIUS, COLORS, SPACING } from "@/src/themes";
import { AvailableDonation } from "@/src/types/donor";
import { StyleSheet, View } from "react-native";
import OngoingPickupsCard from "./OngoingPickupsCard";
import Subheading from "./Subheading";

type PastDonationProps = {
  pickups: AvailableDonation[];
};

const PastDonation = ({ pickups }: PastDonationProps) => {
  if (!pickups.length) {
    return (
      <View style={s.container}>
        <Subheading title={"Past Donations"} />
        <View
          style={{
            gap: 10,
            padding: 20,
            paddingVertical: 100,
            borderRadius: BORDER_RADIUS,
            borderColor: COLORS.outlineGray,
            borderWidth: 1,
          }}
        >
          <PoppinsText
            style={{ textAlign: "center", color: COLORS.outlineGray }}
          >
            No Past Donations
          </PoppinsText>
        </View>
      </View>
    );
  }
  return (
    <View style={s.container}>
      <Subheading title={"Past Donations"} />
      {pickups ? (
        pickups.map((pickup, idx) => (
          <OngoingPickupsCard key={idx} donation={pickup} />
        ))
      ) : (
        <PoppinsText>No past donations</PoppinsText>
      )}
    </View>
  );
};

export default PastDonation;

const s = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.cardHorizontal,
    paddingVertical: SPACING.cardVertical,
    paddingTop: SPACING.cardVertical - 10,
    borderRadius: BORDER_RADIUS,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
    gap: 10,
  },
});
