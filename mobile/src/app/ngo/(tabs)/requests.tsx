import { PoppinsText } from "@/src/components";
import GradientButton from "@/src/components/GradientButton";
import PageHeader from "@/src/components/PageHeader";
import SimpleAlertModal from "@/src/components/SimpleAlertModal";
import getAvailableDonations from "@/src/core/api";
import FilterTabs from "@/src/core/donor/components/FilterTabs";
import claimDonation from "@/src/core/ngo/api/claimDonation";
import markAsPickedUp from "@/src/core/ngo/api/markAsPickedUp";
import Subheading from "@/src/core/ngo/components/dashboard/Subheading";
import RequestCard from "@/src/core/ngo/components/requests/RequestsCard";
import { useAlertModal } from "@/src/hooks/AlertModalContext";
import {
  BORDER_RADIUS,
  COLORS,
  GRADIENT_PRIMARY,
  HEIGHT,
  SPACING,
} from "@/src/themes";
import { AvailableDonation } from "@/src/types/donor";
import getMinimumExpiry from "@/src/utils/getMinExpiry";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Requests = () => {
  const filters = ["Available", "Pending"] as const;
  type FilterType = (typeof filters)[number];
  const [currFilter, setCurrFilter] = useState<FilterType>("Available");

  const [availableDonations, setAvailableDonations] = useState<
    AvailableDonation[]
  >([]);

  const [pendingDonations, setPendingDonations] = useState<AvailableDonation[]>(
    [],
  );

  const { showModal } = useAlertModal();
  const router = useRouter();
  const [donationClaimed, setDonationClaimed] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (currFilter == "Available") {
        getAvlDonations();
      } else {
        getPendDonations();
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const getAvlDonations = async () => {
    const res = await getAvailableDonations("ngo");
    if (!res.ok) {
      alert(res.error);
      return;
    }
    setAvailableDonations(res.data.length ? res.data : []);
  };

  const getPendDonations = async () => {
    const res = await getAvailableDonations("ngo", "pending");
    if (!res.ok) {
      alert(res.error);
      return;
    }
    setPendingDonations(res.data.length ? res.data : []);
  };

  const handleMarkAsPickedUp = (donationId: string) => {
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
            const res = await markAsPickedUp(donationId);
            if (!res.ok) {
              console.log(res.error);
              showModal("Something went wrong!", res.message ?? res.error);
              return;
            }
            showModal(
              "Pickup Confirmed!",
              "The donation has been marked as picked up. Thank you for helping us reduce food waste and support those in need!",
            );
            setDonationClaimed(true);
          },
        },
      ],
      { cancelable: true },
    );
  };

  useEffect(() => {
    getAvlDonations();
    getPendDonations();
  }, [donationClaimed]);

  function PendingDonationsComponent({
    pendingDonations,
  }: {
    pendingDonations: AvailableDonation[];
  }) {
    if (!pendingDonations.length) {
      return (
        <View
          style={{
            gap: 10,
            padding: 20,
            paddingVertical: 250,
            borderRadius: BORDER_RADIUS,
            borderColor: COLORS.outlineGray,
            borderWidth: 1,
          }}
        >
          <PoppinsText
            style={{ textAlign: "center", color: COLORS.outlineGray }}
          >
            No Pending Donations
          </PoppinsText>
        </View>
      );
    }

    return (
      <View style={{ gap: 10 }}>
        {pendingDonations.map((donation, idx) => (
          <RequestCard donation={donation} key={idx}>
            <GradientButton
              onPress={() => handleMarkAsPickedUp(donation._id)}
              text={"Mark as Picked Up"}
              gradient={GRADIENT_PRIMARY}
            />
          </RequestCard>
        ))}
      </View>
    );
  }

  function AvailableDonationsComponent({
    availableDonations,
  }: {
    availableDonations: AvailableDonation[];
  }) {
    if (!availableDonations.length) {
      return (
        <View
          style={{
            gap: 10,
            padding: 20,
            paddingVertical: 250,
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
      );
    }

    const handleOnPress = async (donationId: string) => {
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
      <View style={{ gap: 10 }}>
        {availableDonations.map((donation, idx) => (
          <RequestCard donation={donation} key={idx}>
            <GradientButton
              onPress={() => handleOnPress(donation._id)}
              text={"Accept"}
              gradient={GRADIENT_PRIMARY}
            />
          </RequestCard>
        ))}
      </View>
    );
  }

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
          <View style={{ gap: 20 }}>
            <FilterTabs
              filters={filters}
              currFilter={currFilter}
              setCurrFilter={setCurrFilter}
            />
            {currFilter === "Available" && (
              <AvailableDonationsComponent
                availableDonations={availableDonations}
              />
            )}
            {currFilter === "Pending" && (
              <PendingDonationsComponent pendingDonations={pendingDonations} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Requests;

const s = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.page,
    paddingTop: SPACING.page,
    height: "100%",
  },
  subcontainer: {
    gap: 20,
  },
});
