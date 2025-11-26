import { PoppinsText } from "@/src/components";
import { StyleSheet, View } from "react-native";
import OngoingPickupsCard from "./OngoingPickupsCard";
import Subheading from "./Subheading";
import { BORDER_RADIUS, COLORS, SPACING } from "@/src/themes";

// TODO: Fill up the type
export type PickupType = {
  pickups: string[];
};

type OngoingPickupsProps = {
  pickups: PickupType;
};

const OngoingPickups = ({ pickups }: PickupType) => {
  if (!pickups.length) {
    return (
      <View style={s.container}>
        <Subheading title={"Ongoing Pickups"} />
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
            No Ongoing Pickups
          </PoppinsText>
        </View>
      </View>
    );
  }
  return (
    <View style={s.container}>
      <Subheading title={"Ongoing Pickups"} />
      {pickups ? (
        pickups.map((pickup, idx) => (
          <OngoingPickupsCard
            key={idx}
            donation={{
              _id: "",
              donor: "",
              foodItems: [],
              pickupAddress: {
                address: "",
                landmark: undefined,
                coordinates: {
                  lat: undefined,
                  lng: undefined,
                },
              },
              locationGeo: {
                type: "",
                coordinates: {
                  longitude: 0,
                },
              },
              pickupTimePreference: undefined,
              images: [],
              status: "pending",
              acceptedBy: undefined,
              assignedCareHome: undefined,
              assignedRequest: undefined,
              pickupDate: undefined,
              deliveryDate: undefined,
              isExpired: undefined,
              isDeleted: undefined,
              createdAt: undefined,
              updatedAt: undefined,
            }}
          />
        ))
      ) : (
        <PoppinsText>No ongoing pickups</PoppinsText>
      )}
    </View>
  );
};

export default OngoingPickups;

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
