import { PoppinsText } from "@/src/components";
import { BORDER_RADIUS, COLORS, FONT, FONT_SIZE, SPACING } from "@/src/themes";
import { DonationHistoryListType } from "@/src/types/donor";
import { diffSummaryAndCloseness } from "@/src/utils/differenceAndClosenessOfDates";
import getDonationName from "@/src/utils/getDonationName";
import { StyleSheet, View } from "react-native";
import ProgressBar from "../ProgressBar";
import Status from "./Status";

const DonationCard = ({ donation }: { donation: DonationHistoryListType }) => {
  return (
    <View style={s.container}>
      <View style={s.topHalf}>
        <View style={s.dtnDetailsCont}>
          <PoppinsText
            style={{
              fontSize: FONT_SIZE.medium,
              fontFamily: FONT.SEMI_BOLD,
              lineHeight: 20,
            }}
          >
            {getDonationName(donation)}
          </PoppinsText>
          <PoppinsText>{donation.foodItems.length} meals</PoppinsText>
        </View>
        <Status status={donation.status} />
      </View>
      {donation.foodItems.map((item, idx) => (
        <View style={{ gap: 5 }} key={idx}>
          <PoppinsText>{item.name}</PoppinsText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <PoppinsText
              style={{ fontWeight: "bold", fontSize: FONT_SIZE.xsmall }}
            >
              Freshness
            </PoppinsText>
            <PoppinsText
              style={{ fontWeight: "bold", fontSize: FONT_SIZE.xsmall }}
            >
              Expires in{" "}
              {diffSummaryAndCloseness(item.expiryDate!, new Date()).difference}
            </PoppinsText>
          </View>
          <ProgressBar
            progress={
              diffSummaryAndCloseness(item.expiryDate!, new Date()).closeness
            }
          />
        </View>
      ))}
    </View>
  );
};

export default DonationCard;

const s = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.outlineGray,
    paddingHorizontal: SPACING.cardHorizontal / 2,
    paddingVertical: SPACING.cardVertical / 2,
    borderRadius: BORDER_RADIUS,
    gap: 10,
  },
  topHalf: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dtnDetailsCont: {},
  donationState: {
    borderRadius: 99999,
    paddingHorizontal: 8,
  },
  donationStateText: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: FONT_SIZE.xsmall,
  },
});
