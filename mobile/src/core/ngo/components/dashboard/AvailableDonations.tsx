import { PoppinsText } from "@/src/components";
import OutlineButton from "@/src/components/OutlineButton";
import { BORDER_RADIUS, COLORS, GRADIENT_PRIMARY, SPACING } from "@/src/themes";
import { StyleSheet, View } from "react-native";
import AvailableDonationCard from "./AvailableDonationCard";
import Subheading from "./Subheading";
import { AvailableDonation } from "@/src/types/donor";
import GradientButton from "@/src/components/GradientButton";
import { router, useRouter } from "expo-router";

type AvailableDonationsProps = {
  donations: AvailableDonation[];
};
const AvailableDonations = ({ donations }: AvailableDonationsProps) => {
  const router = useRouter();
  return (
    <View style={s.container}>
      <Subheading title="Available Donations" />
      {donations ? (
        donations.map((donation, idx) => (
          <AvailableDonationCard key={idx} donation={donation}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <OutlineButton onPress={() => null} text={"View Details"} />
              <GradientButton
                onPress={() => null}
                text={"Accept"}
                style={{ flex: 1 }}
                gradient={GRADIENT_PRIMARY}
              />
            </View>
          </AvailableDonationCard>
        ))
      ) : (
        <PoppinsText>No Available Donations</PoppinsText>
      )}
      <OutlineButton
        onPress={() => router.push("/ngo/requests")}
        text={"View all"}
      />
    </View>
  );
};

export default AvailableDonations;

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
