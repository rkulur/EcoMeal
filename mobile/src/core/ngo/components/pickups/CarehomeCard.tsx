import { BottomUpModal, PoppinsText } from "@/src/components";
import GradientButton from "@/src/components/GradientButton";
import MapScreen from "@/src/components/MapScreen";
import OutlineButton from "@/src/components/OutlineButton";
import { useAlertModal } from "@/src/hooks/AlertModalContext";
import {
  BORDER_RADIUS,
  COLORS,
  FONT,
  FONT_SIZE,
  GRADIENT_PRIMARY,
  HEIGHT,
  SPACING,
} from "@/src/themes";
import { CarehomeDetails } from "@/src/types/carehome";
import { RequestedCarehome } from "@/src/types/donor";
import { formatDateTime } from "@/src/utils/formatDateTime";
import { Ionicons } from "@expo/vector-icons";
import { LocationGeocodedAddress } from "expo-location";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import assignDonation from "../../api/assignCarehome";
import getCarehomeDetails from "../../api/getCarehomeDetails";

type CarehomeCardProps = {
  carehome: RequestedCarehome;
  donationId: string;
};

type DetailsProps = {
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const CarehomeCard = ({ carehome, donationId }: CarehomeCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [locationDetails, setLocationDetails] =
    useState<LocationGeocodedAddress | null>(null);
  const { showModal } = useAlertModal();
  const [carehomeDetails, setCarehomeDetails] =
    useState<CarehomeDetails | null>(null);

  function handleCarehomeAssignment(donationId: string, carehomeId: string) {
    Alert.alert(
      "Confirm Assignment",
      "Are you sure about this donation assignment",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "default",
          onPress: async () => {
            const res = await assignDonation(donationId, carehomeId);
            if (!res.ok) {
              console.log(res.error);
              showModal("Something went wrong!", res.message ?? res.error);
              return;
            }
            showModal(
              `Donation Assignment Successful`,
              "You have successfully assigned the donation to the carehome.",
            );
          },
        },
      ],
      { cancelable: true },
    );
  }
  const Details = ({ text, icon }: DetailsProps) => (
    <View style={{ flexDirection: "row", gap: 5 }}>
      <Ionicons name={icon} size={20} color={COLORS.purple} />
      <PoppinsText>{text}</PoppinsText>
    </View>
  );

  const getChDetails = async (carehomeId: string) => {
    const res = await getCarehomeDetails(carehomeId);
    if (!res.ok) {
      alert(res.error);
      return;
    }
    setCarehomeDetails(res.data);
  };

  useEffect(() => {
    getChDetails(carehome.carehomeId);
  }, []);

  const getAddressFromLocation = (location: {
    city: string;
    district: string;
    state: string;
    pincode: string;
  }) =>
    `${location.city}, ${location.district}, ${location.state}, ${location.pincode}`;

  if (!carehomeDetails) {
    return null;
  }

  return (
    <View style={s.card}>
      <PoppinsText style={s.name}>{carehomeDetails.name}</PoppinsText>
      <PoppinsText style={s.details}>📧 {carehomeDetails.email}</PoppinsText>
      <PoppinsText style={s.details}>📞 {carehomeDetails.phone}</PoppinsText>
      <PoppinsText style={s.details}>
        Requested: {formatDateTime(new Date(carehome.requestedAt))}
      </PoppinsText>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <OutlineButton
          text="View details"
          onPress={() => setIsModalVisible(true)}
        />
        <GradientButton
          onPress={() =>
            handleCarehomeAssignment(donationId, carehome.carehomeId)
          }
          text={"Assign"}
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
              {carehomeDetails.name}
            </PoppinsText>
          </View>
          <Details text={`Email: ${carehomeDetails.email}`} icon={"mail"} />
          <Details text={`Phone no.: ${carehomeDetails.phone}`} icon={"call"} />
          <Details
            text={`Address: ${getAddressFromLocation(carehomeDetails.location)}`}
            icon={"home"}
          />
          <Details
            text={`Food types required: ${carehomeDetails.foodTypeRequired.join(", ")}`}
            icon={"fast-food"}
          />
          <Details
            text={`Dietary restrictions: ${carehomeDetails.dietaryRestrictions!.join(", ")}`}
            icon="document"
          />
          <Details
            text={`No of residents: ${carehomeDetails.noOfResidents}`}
            icon="document"
          />
          <View style={{}}>
            <Details text={`Pickup Location:`} icon="location" />
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
                  latitude: carehomeDetails.locationGeo.coordinates[1],
                  longitude: carehomeDetails.locationGeo.coordinates[0],
                }}
              />
            </View>
          </View>
          <View style={{ height: HEIGHT.button }}>
            <GradientButton
              onPress={() =>
                handleCarehomeAssignment(donationId, carehome.carehomeId)
              }
              text={"Assign"}
              style={{ flex: 1 }}
              gradient={GRADIENT_PRIMARY}
            />
          </View>
        </View>
      </BottomUpModal>
    </View>
  );
};

export default CarehomeCard;

const s = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.page,
    paddingTop: SPACING.page,
    height: "100%",
  },
  subcontainer: {
    gap: 20,
  },
  carehomeContainer: {
    marginTop: SPACING.page / 4,
    gap: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.outlineGray,
    borderRadius: BORDER_RADIUS, // 8px radius (already defined in your theme)
    padding: SPACING.cardVertical / 2,
    backgroundColor: "white",
    gap: 4,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  details: {
    fontSize: 13,
  },
  button: {
    marginTop: 8,
  },
  modal: {
    paddingVertical: SPACING.cardVertical,
    paddingHorizontal: SPACING.cardHorizontal,
    paddingTop: SPACING.cardVertical * 2,
    gap: 15,
  },
});
