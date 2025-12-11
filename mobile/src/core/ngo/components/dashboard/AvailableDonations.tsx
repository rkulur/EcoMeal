import { BottomUpModal, PoppinsText } from "@/src/components";
import OutlineButton from "@/src/components/OutlineButton";
import {
  BORDER_RADIUS,
  COLORS,
  FONT,
  FONT_SIZE,
  GRADIENT_PRIMARY,
  SPACING,
} from "@/src/themes";
import { Alert, StyleSheet, View } from "react-native";
import AvailableDonationCard from "./AvailableDonationCard";
import Subheading from "./Subheading";
import {
  AvailableDonation,
  FoodItem,
  RequestedCarehome,
} from "@/src/types/donor";
import GradientButton from "@/src/components/GradientButton";
import { router, useRouter } from "expo-router";
import React, { useState } from "react";
import getDonationName from "@/src/utils/getDonationName";
import Status from "@/src/core/donor/components/dashboard/Status";
import MapScreen from "@/src/components/MapScreen";
import { Ionicons } from "@expo/vector-icons";
import getMinimumExpiry from "@/src/utils/getMinExpiry";
import { LocationGeocodedAddress } from "expo-location";
import claimDonation from "../../api/claimDonation";
import { useAlertModal } from "@/src/hooks/AlertModalContext";

type AvailableDonationsProps = {
  donations: AvailableDonation[];
};
const AvailableDonations = ({ donations }: AvailableDonationsProps) => {
  if (!donations || !donations.length) {
    return (
      <View style={s.container}>
        <Subheading title={"Available Donations"} />
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
            No Available Donations
          </PoppinsText>
        </View>
      </View>
    );
  }
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  type FoodItemsType = (Omit<FoodItem, "expiryDate"> & {
    expiryDate?: string;
  })[];

  const getInformationOfTheFood = (foodItems: FoodItemsType): string => {
    let str = "";
    foodItems.forEach((item, idx) => {
      str += `${item.name} - ${item.quantity} ${item.unit}`;
      if (idx === foodItems.length - 1) return;
      str += "\n";
    });
    return str ?? "None";
  };

  const { showModal } = useAlertModal();

  const calculateTotalMeals = (foodItems: FoodItemsType) =>
    foodItems.reduce((acc, item) => acc + item.quantity, 0);

  const [locationDetails, setLocationDetails] =
    useState<LocationGeocodedAddress | null>(null);
  const [donationClaimed, setDonationClaimed] = useState(false);

  const handleDonationAccept = async (donationId: string) => {
    Alert.alert(
      "Confirm Acceptance",
      "Are you sure you want to accept this donation?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Accept",
          style: "default",
          onPress: async () => {
            const res = await claimDonation(donationId);
            if (!res.ok) {
              console.log(res.error);
              showModal("Something went wrong!", res.message ?? res.error);
              return;
            }
            showModal(
              "Donation Accepted",
              "Donation claimed successfully! Your effort helps us bring food to those in need.",
            );
            setDonationClaimed(true);
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={s.container}>
      <Subheading title="Available Donations" />
      {donations ? (
        donations.map((donation, idx) => (
          <AvailableDonationCard key={idx} donation={donation}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <OutlineButton
                onPress={() => {
                  setIsModalVisible(true);
                }}
                text={"View Details"}
              />
              <GradientButton
                onPress={() => handleDonationAccept(donation._id)}
                text={"Accept"}
                style={{ flex: 1 }}
                gradient={GRADIENT_PRIMARY}
              />
            </View>
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
                <Details
                  text={donation.donorInfo.phone}
                  icon={"call-outline"}
                />
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
                <CarehomeDetails
                  requestedCarehomes={donation.requestedCarehomes}
                />
              </View>
            </BottomUpModal>
          </AvailableDonationCard>
        ))
      ) : (
        <PoppinsText>No Available Donations</PoppinsText>
      )}
      <OutlineButton
        onPress={() => router.push("/ngo/requests")}
        text={"View all"}
      />
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
  modal: {
    paddingVertical: SPACING.cardVertical,
    paddingHorizontal: SPACING.cardHorizontal,
    paddingTop: SPACING.cardVertical * 2,
    gap: 15,
  },
});
