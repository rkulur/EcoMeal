import { PoppinsText } from "@/src/components";
import { StyleSheet, View } from "react-native";
import OngoingPickupsCard from "./OngoingPickupsCard";
import Subheading from "./Subheading";

// TODO: Fill up the type
export type PickupType = {
  pickups: string[];
};

type OngoingPickupsProps = {
  pickups: PickupType;
};

const OngoingPickups = ({ pickups }: PickupType) => {
  return (
    <View style={{ gap: 10 }}>
      <Subheading title={"Ongoing Pickups"} onPress={() => null} />
      {pickups ? (
        pickups.map((pickup, idx) => (
          <OngoingPickupsCard
            key={idx}
            donation={{
              _id: "",
              donor: "Donor",
              foodItems: [
                {
                  name: "food1",
                  quantity: 12,
                  unit: "plates",
                  expiryDate: new Date(),
                },
                {
                  name: "food2",
                  quantity: 12,
                  unit: "boxes",
                  expiryDate: new Date(),
                },
              ],
              pickupAddress: {
                address: "",
                landmark: undefined,
                coordinates: {
                  lat: undefined,
                  lng: undefined,
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

const styles = StyleSheet.create({});
