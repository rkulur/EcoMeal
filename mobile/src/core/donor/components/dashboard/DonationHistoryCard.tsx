import { PoppinsText } from "@/src/components";
import { BORDER_RADIUS, COLORS, FONT, FONT_SIZE, SPACING } from "@/src/themes";
import { StyleSheet, View } from "react-native";
import Status from "./Status";

type DonationHistoryCardProps = {
  name: string;
  meals: number;
  status:
    | "pending"
    | "accepted"
    | "assigned"
    | "picked_up"
    | "delivered"
    | "expired"
    | "cancelled";
};
const DonationHistoryCard = ({
  name,
  meals,
  status,
}: DonationHistoryCardProps) => {
  return (
    <View style={s.topHalf}>
      <View style={s.dtnDetailsCont}>
        <PoppinsText
          style={{
            fontSize: FONT_SIZE.medium,
            fontFamily: FONT.SEMI_BOLD,
            lineHeight: 20,
          }}
        >
          {name}
        </PoppinsText>
        <PoppinsText>{meals} meals</PoppinsText>
      </View>
      <View>
        <Status status={status} />
      </View>
    </View>
  );
};

export default DonationHistoryCard;

const s = StyleSheet.create({
  topHalf: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: COLORS.outlineGray,
    borderWidth: 1,
    paddingHorizontal: SPACING.cardHorizontal / 2,
    paddingVertical: SPACING.cardVertical / 2,
    borderRadius: BORDER_RADIUS,
    gap: 10,
  },
  dtnDetailsCont: {},
  donationState: {
    borderRadius: 99999,
    paddingHorizontal: 8,
  },
  donationStateText: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: FONT_SIZE.small,
  },
});
