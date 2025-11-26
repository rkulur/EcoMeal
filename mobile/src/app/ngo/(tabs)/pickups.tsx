import { PoppinsHeadText, PoppinsText } from "@/src/components";
import GradientButton from "@/src/components/GradientButton";
import OutlineButton from "@/src/components/OutlineButton";
import PageHeader from "@/src/components/PageHeader";
import SimpleAlertModal from "@/src/components/SimpleAlertModal";
import getPickedUpDonations from "@/src/core/ngo/api/getPickedUpDonations";
import setDonationExpiry from "@/src/core/ngo/api/setDonationExpiry";
import AvailableDonationCard from "@/src/core/ngo/components/dashboard/AvailableDonationCard";
import Subheading from "@/src/core/ngo/components/dashboard/Subheading";
import { useAlertModal } from "@/src/hooks/AlertModalContext";
import {
  BORDER_RADIUS,
  COLORS,
  GRADIENT_PRIMARY,
  GRADIENT_SECONDARY,
  GRADIENT_SECONDARY_REVERSED,
  HEIGHT,
  SPACING,
} from "@/src/themes";
import { AvailableDonation, DonationType } from "@/src/types/donor";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NoPickedUpDonations = () => {
  return (
    <View
      style={{
        gap: 10,
        padding: 20,
        marginTop: 20,
        paddingVertical: 255,
        borderRadius: BORDER_RADIUS,
        borderColor: COLORS.outlineGray,
        borderWidth: 1,
      }}
    >
      <PoppinsText style={{ textAlign: "center", color: COLORS.outlineGray }}>
        No Picked Up Donations
      </PoppinsText>
    </View>
  );
};

type PickedUpDonationType = {
  donations: AvailableDonation[];
};
const PickedUpDonations = ({ donations }: PickedUpDonationType) => {
  const { showModal } = useAlertModal();
  const handleExpiry = (donationId: string) => {
    Alert.alert(
      "Confirm Expiry",
      "Are you sure the donation has been expired ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "default",
          onPress: async () => {
            const res = await setDonationExpiry(donationId);
            if (!res.ok) {
              console.log(res.error);
              showModal("Something went wrong!", res.message ?? res.error);
              return;
            }
            showModal(
              "Donation Marked as Expired",
              "You have successfully marked this donation as expired. It will no longer be available for pickup.",
            );
          },
        },
      ],
      { cancelable: true },
    );
  };

  return donations.map((donation, idx) => (
    <AvailableDonationCard key={idx} donation={donation}>
      <View style={s.carehomeContainer}>
        {donation.requestedCarehomes?.map((carehome, idx) => (
          <View key={idx} style={s.card}>
            <PoppinsText style={s.name}>{carehome.name}</PoppinsText>
            <PoppinsText style={s.details}>📧 {carehome.email}</PoppinsText>
            <PoppinsText style={s.details}>📞 {carehome.phone}</PoppinsText>
            <PoppinsText style={s.details}>
              Requested: {new Date(carehome.requestedAt).toLocaleString()}
            </PoppinsText>

            <OutlineButton
              text="Assign"
              onPress={() => console.log("Assigned to:", carehome.name)}
              style={s.button}
            />
          </View>
        ))}
      </View>
      {/* <View style={{ flexDirection: "row", gap: 10 }}> */}
      {/*   <OutlineButton onPress={() => null} text={"View Details"} /> */}
      {/*   <GradientButton */}
      {/*     onPress={() => null} */}
      {/*     text={"Accept"} */}
      {/*     style={{ flex: 1 }} */}
      {/*     gradient={GRADIENT_PRIMARY} */}
      {/*   /> */}
      {/* </View> */}

      <GradientButton
        onPress={() => handleExpiry(donation._id)}
        text={"Mark as Expired"}
        style={{ flex: 1 }}
        gradient={GRADIENT_PRIMARY}
      />
    </AvailableDonationCard>
  ));
};

const Pickups = () => {
  const [donationAssigned, setDonationAssigned] = useState(false);
  const [pickedUpDonations, setPickedUpDonations] = useState<
    AvailableDonation[]
  >([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      getPUDonations();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const getPUDonations = async () => {
    const res = await getPickedUpDonations();
    if (!res.ok) {
      alert(res.error);
      return;
    }
    setPickedUpDonations(res.data.length ? res.data : []);
  };

  useEffect(() => {
    getPUDonations();
  }, [donationAssigned]);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
        <PageHeader />
        <ScrollView
          style={s.container}
          contentContainerStyle={{
            paddingBottom: HEIGHT.tabBar + SPACING.page,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Subheading title="Picked Up Donations" />
          {!pickedUpDonations || !pickedUpDonations.length ? (
            <NoPickedUpDonations />
          ) : (
            <PickedUpDonations donations={pickedUpDonations} />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Pickups;

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
});
