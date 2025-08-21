import DefaultProfile from "@/src/components/DefaultProfile";
import PoppinsText from "@/src/components/PoppinsText";
import { BORDER_RADIUS, COLORS, FONT, FONT_SIZE, SPACING } from "@/src/themes";
import { formatDateTime } from "@/src/utils/formatDateTime";
import { DonationHistoryListType } from "@/src/validation/donate.schema";
import { StyleSheet, View } from "react-native";
import Status from "../dashboard/Status";

type HistoryCardProps = {
  donation: DonationHistoryListType;
};
const HistoryCard = ({ donation }: HistoryCardProps) => {
  return (
    <View style={s.container}>
      <View style={s.topHalf}>
        <View style={s.dtnDetailsCont}>
          <PoppinsText
            style={{
              fontSize: FONT_SIZE.xmedium,
              fontFamily: FONT.BOLD,
              lineHeight: 20,
            }}
          >
            {(() => {
              const fullString = donation.foodItems
                .map((item) => item.name)
                .join(", ");

              const maxChars = 20;

              return fullString.length > maxChars
                ? fullString.slice(0, maxChars).trimEnd() + "..."
                : fullString;
            })()}
          </PoppinsText>
          <PoppinsText>{donation.foodItems.length} meals</PoppinsText>
        </View>
        <View>
          <Status status={donation.status} />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        {donation.acceptedBy ? (
          <>
            <DefaultProfile src={donation.acceptedBy.profilePicture} />
            <PoppinsText
              style={{
                fontSize: FONT_SIZE.medium,
                fontFamily: FONT.SEMI_BOLD,
              }}
            >
              {donation.acceptedBy.name}
            </PoppinsText>
          </>
        ) : (
          <PoppinsText>Donation is not yet assigned to NGO</PoppinsText>
        )}
      </View>
      <PoppinsText>{formatDateTime(new Date(donation.createdAt!))}</PoppinsText>
    </View>
  );
};

export default HistoryCard;

const s = StyleSheet.create({
  topHalf: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dtnDetailsCont: {
    gap: 5,
  },
  donationState: {
    borderRadius: 99999,
    paddingHorizontal: 8,
  },
  donationStateText: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: FONT_SIZE.xsmall,
  },
  container: {
    borderRadius: BORDER_RADIUS,
    borderColor: COLORS.outlineGray,
    borderWidth: 1,
    paddingVertical: SPACING.cardVertical / 1.5,
    paddingHorizontal: SPACING.cardHorizontal / 1.5,
    gap: 10,
  },
});
