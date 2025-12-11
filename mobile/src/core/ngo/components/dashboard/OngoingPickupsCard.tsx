import { BottomUpModal, PoppinsText } from "@/src/components";
import { useAlertModal } from "@/src/hooks/AlertModalContext";
import { BORDER_RADIUS, COLORS, FONT, FONT_SIZE, SPACING } from "@/src/themes";
import {
  AvailableDonation,
  DonationType,
  FoodItem,
  RequestedCarehome,
} from "@/src/types/donor";
import getDonationName from "@/src/utils/getDonationName";
import getMinimumExpiry from "@/src/utils/getMinExpiry";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Status from "../../../donor/components/dashboard/Status";
import ProgressBar from "../../../donor/components/ProgressBar";
import OutlineButton from "@/src/components/OutlineButton";
import { useEffect, useState } from "react";
import MapScreen from "@/src/components/MapScreen";
import { LocationGeocodedAddress } from "expo-location";

type OngoingDonationCardProps = {
  donation: AvailableDonation;
};

type DetailsProps = {
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
};
type FoodItemsType = (Omit<FoodItem, "expiryDate"> & {
  expiryDate?: string;
})[];
const OngoingDonationCard = ({ donation }: OngoingDonationCardProps) => {
  const { showModal } = useAlertModal();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [locationDetails, setLocationDetails] =
    useState<LocationGeocodedAddress | null>(null);
  const Details = ({ text, icon }: DetailsProps) => (
    <View style={{ flexDirection: "row", gap: 5 }}>
      <Ionicons name={icon} size={20} color={COLORS.purple} />
      <PoppinsText>{text}</PoppinsText>
    </View>
  );

  useEffect(() => {
    alert(donation.carehomeConfirmedDelivery);
  }, []);

  const CarehomeDetails = ({
    requestedCarehomes,
  }: {
    requestedCarehomes: RequestedCarehome[] | undefined;
  }) => {
    if (!requestedCarehomes || !requestedCarehomes.length) {
      return (
        <View>
          <PoppinsText>Requested Carehomes: </PoppinsText>
          <View
            style={{
              gap: 10,
              padding: 20,
              paddingVertical: 30,
              borderRadius: BORDER_RADIUS,
              borderColor: COLORS.outlineGray,
              borderWidth: 1,
            }}
          >
            <PoppinsText
              style={{ textAlign: "center", color: COLORS.outlineGray }}
            >
              No Carehomes Requested
            </PoppinsText>
          </View>
        </View>
      );
    }

    return (
      <View>
        <PoppinsText>Requested Carehomes: </PoppinsText>
        {requestedCarehomes.map((carehome, idx) => (
          <View key={idx} style={{ flexDirection: "row", gap: 10 }}>
            <PoppinsText>{idx + 1}. </PoppinsText>
            <PoppinsText>{carehome.name}</PoppinsText>
          </View>
        ))}
      </View>
    );
  };

  const calculateTotalMeals = (foodItems: FoodItemsType) =>
    foodItems.reduce((acc, item) => acc + item.quantity, 0);

  const getInformationOfTheFood = (foodItems: FoodItemsType): string => {
    let str = "";
    foodItems.forEach((item, idx) => {
      str += `${item.name} - ${item.quantity} ${item.unit}`;
      if (idx === foodItems.length - 1) return;
      str += "\n";
    });
    return str ?? "None";
  };

  const calculatePickupProgress = (
    ngoPickedUp: boolean,
    donorConfirmed: boolean,
  ) => {
    if (ngoPickedUp && !donorConfirmed) return 50;
    if (ngoPickedUp && donorConfirmed) return 100;
    return 0;
  };

  return (
    <View style={s.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 5,
        }}
      >
        <View>
          <PoppinsText
            style={{ fontSize: FONT_SIZE.medium, fontFamily: FONT.SEMI_BOLD }}
          >
            {getDonationName(donation)}
          </PoppinsText>
        </View>
        <View>
          <Status status={donation.status} />
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <Ionicons name="time-outline" size={20} />
        <PoppinsText>
          {getMinimumExpiry(donation.foodItems)
            ? "Expires in " + getMinimumExpiry(donation.foodItems) + " days"
            : "Expires Today"}
        </PoppinsText>
      </View>
      <View>
        {donation.status != "assigned" ? (
          <>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <PoppinsText>Pickup progress</PoppinsText>
              <PoppinsText>
                {calculatePickupProgress(
                  donation.ngoPickedUp ?? false,
                  donation.donorConfirmedPickup ?? false,
                )}
                %
              </PoppinsText>
            </View>
            <ProgressBar
              progress={calculatePickupProgress(
                donation.ngoPickedUp ?? false,
                donation.donorConfirmedPickup ?? false,
              )}
            />
          </>
        ) : (
          <>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <PoppinsText>Delivery progress</PoppinsText>
              <PoppinsText>
                {calculatePickupProgress(
                  donation.ngoDelivered ?? false,
                  donation.carehomeConfirmedDelivery ?? false,
                )}
                %
              </PoppinsText>
            </View>
            <ProgressBar
              progress={calculatePickupProgress(
                donation.ngoDelivered ?? false,
                donation.carehomeConfirmedDelivery ?? false,
              )}
            />
          </>
        )}
        {!donation.donorConfirmedPickup && (
          <PoppinsText
            style={{
              backgroundColor: COLORS.bgGreen,
              color: COLORS.green,
              padding: 4,
              borderRadius: BORDER_RADIUS,
              textAlign: "center",
              marginTop: 15,
            }}
          >
            Donor confirmation for pickup is pending
          </PoppinsText>
        )}

        {!donation.carehomeConfirmedDelivery && (
          <PoppinsText
            style={{
              backgroundColor: COLORS.bgGreen,
              color: COLORS.green,
              padding: 4,
              borderRadius: BORDER_RADIUS,
              textAlign: "center",
              marginTop: 15,
            }}
          >
            Carehome confirmation for delivery is pending
          </PoppinsText>
        )}
      </View>
      <OutlineButton
        onPress={() => {
          setIsModalVisible(true);
        }}
        text={"View Details"}
      />
      <BottomUpModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        style={{ height: 800 }}
      >
        <View style={s.modal}>
          <View style={{ alignItems: "center" }}>
            <PoppinsText
              style={{
                fontFamily: FONT.BOLD,
                fontSize: FONT_SIZE.large,
              }}
            >
              {getDonationName(donation)}
            </PoppinsText>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <PoppinsText>
                {calculateTotalMeals(donation.foodItems)}
                Meals
              </PoppinsText>
              <Status status={donation.status} />
            </View>
          </View>
          <Details
            text={getInformationOfTheFood(donation.foodItems)}
            icon={"information-circle-outline"}
          />
          <Details
            text={donation.pickupAddress.address}
            icon={"location-outline"}
          />
          <Details
            text={`Expires: ${getMinimumExpiry(donation.foodItems)} days`}
            icon={"calendar-clear-outline"}
          />
          <Details text={donation.donorInfo.phone} icon={"call-outline"} />
          <View style={{}}>
            <PoppinsText>Pickup Location</PoppinsText>
            <View
              style={{
                borderRadius: BORDER_RADIUS,
                height: 300,
                overflow: "hidden",
              }}
            >
              <MapScreen
                locationDetails={locationDetails}
                setLocationDetails={setLocationDetails}
                defaultMarker={{
                  latitude: donation.donationCoordinates[1],
                  longitude: donation.donationCoordinates[0],
                }}
              />
            </View>
          </View>
          <CarehomeDetails requestedCarehomes={donation.requestedCarehomes} />
        </View>
      </BottomUpModal>
    </View>
  );
};

export default OngoingDonationCard;

const s = StyleSheet.create({
  container: {
    paddingVertical: SPACING.cardVertical / 2,
    paddingHorizontal: SPACING.cardHorizontal / 2,
    borderWidth: 1,
    borderColor: COLORS.gray,
    gap: 10,
    borderRadius: BORDER_RADIUS,
  },
  modal: {
    paddingVertical: SPACING.cardVertical,
    paddingHorizontal: SPACING.cardHorizontal,
    paddingTop: SPACING.cardVertical * 2,
    gap: 15,
  },
});
