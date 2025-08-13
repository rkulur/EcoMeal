import { PoppinsText } from "@/src/components";
import OutlineButton from "@/src/components/OutlineButton";
import { BORDER_RADIUS, COLORS, FONT, FONT_SIZE, SPACING } from "@/src/themes";
import {
  DonationHistoryListType,
  DonationType,
} from "@/src/validation/donate.schema";
import { StyleSheet, View } from "react-native";
import Status from "../../donor/components/dashboard/Status";
type IncomingFoodCardProps = {
  donation?: DonationHistoryListType;
};

const IncomingFoodCard = ({ donation }: IncomingFoodCardProps) => {
  return (
    <View style={s.incomingFoodCard}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <PoppinsText
            style={{
              fontFamily: FONT.SEMI_BOLD,
              fontSize: FONT_SIZE.xmedium,
            }}
          >
            {"Delivery"}
          </PoppinsText>
          <PoppinsText>NGO: {donation?.acceptedBy?.name}</PoppinsText>
        </View>
        <View>
          <Status status={donation?.status} />
        </View>
      </View>
      <PoppinsText
        style={{
          fontFamily: FONT.SEMI_BOLD,
        }}
      >
        {"Items"}
      </PoppinsText>
      <View>
        {donation?.foodItems.map((item, idx) => (
          <View
            key={idx}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <PoppinsText>{item.name}</PoppinsText>
            <PoppinsText>{item.quantity + " " + item.unit}</PoppinsText>
          </View>
        ))}
      </View>
      <OutlineButton onPress={() => null} text={"View Details"} />
    </View>
  );
};

export default IncomingFoodCard;

const s = StyleSheet.create({
  incomingFoodCard: {
    paddingVertical: SPACING.cardVertical / 2,
    paddingHorizontal: SPACING.cardHorizontal / 2,
    gap: 5,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    borderColor: COLORS.outlineGray,
  },
});
