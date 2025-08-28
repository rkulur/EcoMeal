import { BORDER_RADIUS, COLORS, FONT, FONT_SIZE, SPACING } from "@/src/themes";
import { StyleSheet, View } from "react-native";
import Subheading from "./Subheading";
import AvailableDonationCard from "./AvailableDonationCard";
import { date } from "zod";
import { DonationType } from "@/src/validation/donate.schema";
import { PoppinsText } from "@/src/components";
import { useEffect, useState } from "react";
import getAvailableDonations, {
  AvailableDonation,
} from "../../api/getAvailaleDonations";
import OutlineButton from "@/src/components/OutlineButton";

type AvailableDonationsProps = {
  donations: AvailableDonation[];
};
const AvailableDonations = ({ donations }: AvailableDonationsProps) => {
  return (
    <View style={s.container}>
      <Subheading title="Available Donations" />
      {donations ? (
        donations.map((donation, idx) => (
          <AvailableDonationCard key={idx} donation={donation} />
        ))
      ) : (
        <PoppinsText>No Available Donations</PoppinsText>
      )}
      <OutlineButton onPress={() => null} text={"View all"} />
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
