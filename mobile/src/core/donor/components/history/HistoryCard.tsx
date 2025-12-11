import DefaultProfile from "@/src/components/DefaultProfile";
import PoppinsText from "@/src/components/PoppinsText";
import { useAlertModal } from "@/src/hooks/AlertModalContext";
import {
  BORDER_RADIUS,
  COLORS,
  FONT,
  FONT_SIZE,
  GRADIENT_PRIMARY,
  SPACING,
} from "@/src/themes";
import { DonationHistoryListType } from "@/src/types/donor";
import { formatDateTime } from "@/src/utils/formatDateTime";
import { Alert, StyleSheet, View } from "react-native";
import Status from "../dashboard/Status";
import GradientButton from "@/src/components/GradientButton";
import confirmPickup from "../../api/confirmPickup";

type HistoryCardProps = {
  donation: DonationHistoryListType;
};
const HistoryCard = ({ donation }: HistoryCardProps) => {
  const { showModal } = useAlertModal();

  const handleConfirmPickup = (donationId: string) => {
    Alert.alert(
      "Confirm Pickup",
      "Are you sure the donation has been picked up?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "default",
          onPress: async () => {
            const res = await confirmPickup(donationId);
            if (!res.ok) {
              console.log(res.error);
              showModal("Something went wrong!", res.message ?? res.error);
              return;
            }
            showModal(
              "Pickup Confirmed!",
              "The donation has been marked as picked up. Thank you for helping us reduce food waste and support those in need!",
            );
          },
        },
      ],
      { cancelable: true },
    );
  };

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
      {donation?.ngoPickedUp &&
        ["pending", "accepted"].includes(donation.status) && (
          <GradientButton
            onPress={() => handleConfirmPickup(donation._id)}
            text={"Confirm Pickup ?"}
            gradient={GRADIENT_PRIMARY}
          />
        )}
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
