import { BottomUpModal, PoppinsText } from "@/src/components";
import DefaultProfile from "@/src/components/DefaultProfile";
import CarehomeDropdown from "@/src/components/Dropdown";
import GradientButton from "@/src/components/GradientButton";
import MapScreen from "@/src/components/MapScreen";
import OutlineButton from "@/src/components/OutlineButton";
import Status from "@/src/core/donor/components/dashboard/Status";
import { useAlertModal } from "@/src/hooks/AlertModalContext";
import {
  BORDER_RADIUS,
  COLORS,
  FONT,
  FONT_SIZE,
  GRADIENT_PRIMARY,
  SPACING,
} from "@/src/themes";
import { FoodItem, RequestedCarehome } from "@/src/types/donor";
import { AvailableDonation } from "@/src/types/donor";
import getDonationName from "@/src/utils/getDonationName";
import getMinimumExpiry from "@/src/utils/getMinExpiry";
import { Ionicons } from "@expo/vector-icons";
import { LocationGeocodedAddress } from "expo-location";
import { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";

type DetailsProps = {
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
};
const Details = ({ text, icon }: DetailsProps) => (
  <View style={{ flexDirection: "row", gap: 5 }}>
    <Ionicons name={icon} size={20} color={COLORS.purple} />
    <PoppinsText>{text}</PoppinsText>
  </View>
);

type RequestCardProps = {
  donation: AvailableDonation;
  children?: ReactNode;
};

type FoodItemsType = (Omit<FoodItem, "expiryDate"> & { expiryDate?: string })[];

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

const RequestCard = ({ donation, children }: RequestCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [locationDetails, setLocationDetails] =
    useState<LocationGeocodedAddress | null>(null);

  const { showModal } = useAlertModal();

  const getInformationOfTheFood = (foodItems: FoodItemsType): string => {
    let str = "";
    foodItems.forEach((item, idx) => {
      str += `${item.name} - ${item.quantity} ${item.unit}`;
      if (idx === foodItems.length - 1) return;
      str += "\n";
    });
    return str ?? "None";
  };

  const calculateTotalMeals = (foodItems: FoodItemsType) =>
    foodItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <View style={s.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <PoppinsText
            style={{ fontFamily: FONT.SEMI_BOLD, fontSize: FONT_SIZE.xmedium }}
          >
            {getDonationName(donation, 25)}
          </PoppinsText>
          <PoppinsText>
            {calculateTotalMeals(donation.foodItems)} meals
          </PoppinsText>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 3, flex: 1 }}>
        <Ionicons name="location-outline" size={20} color={COLORS.purple} />
        <PoppinsText style={{ flexShrink: 1, flexWrap: "wrap" }}>
          {donation.pickupAddress.address}
        </PoppinsText>
        <PoppinsText>{(donation.distance / 1000).toFixed(2)} Km</PoppinsText>
      </View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Ionicons name="time-outline" size={20} color={COLORS.purple} />
        <PoppinsText>
          Expires in {getMinimumExpiry(donation.foodItems)} days
        </PoppinsText>
      </View>
      <OutlineButton
        onPress={() => {
          setIsModalVisible(true);
        }}
        text={"View Details"}
      />
      {children}
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

export default RequestCard;

const s = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.outlineGray,
    borderRadius: BORDER_RADIUS,
    paddingVertical: SPACING.cardHorizontal / 1.5,
    paddingHorizontal: SPACING.cardVertical / 1.5,
    gap: 10,
  },
  modal: {
    paddingVertical: SPACING.cardVertical,
    paddingHorizontal: SPACING.cardHorizontal,
    paddingTop: SPACING.cardVertical * 2,
    gap: 15,
  },
});
