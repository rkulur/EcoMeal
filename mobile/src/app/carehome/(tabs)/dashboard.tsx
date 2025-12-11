import { PoppinsText } from "@/src/components";
import DashboardCard from "@/src/components/DashboardCard";
import GradientButton from "@/src/components/GradientButton";
import OutlineButton from "@/src/components/OutlineButton";
import PageHeader from "@/src/components/PageHeader";
import Welcome from "@/src/components/Welcome";
import getIncomingDonations from "@/src/core/carehome/api/getIncomingDonations";
import getCarehomeDetails from "@/src/core/carehome/api/getPersonalDetails";
import getRequestedDonations from "@/src/core/carehome/api/getRequestedDonations";
import requestDonation from "@/src/core/carehome/api/requestDonation";
import ImpactReports from "@/src/core/carehome/components/ImpactReports";
import RequestedDonationCard from "@/src/core/carehome/components/RequestedDonationCard";
import AvailableDonationCard from "@/src/core/ngo/components/dashboard/AvailableDonationCard";
import { useAlertModal } from "@/src/hooks/AlertModalContext";
import {
  BORDER_RADIUS,
  COLORS,
  GRADIENT_PRIMARY,
  HEIGHT,
  SPACING,
} from "@/src/themes";
import { PersonalDetails } from "@/src/types/carehome";
import { AvailableDonation, DonationType } from "@/src/types/donor";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  const [incomingDonations, setIncomingDonations] =
    useState<AvailableDonation[]>();
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>();
  const [requestedDonations, setRequestedDonations] =
    useState<DonationType[]>();

  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const { showModal, isVisible } = useAlertModal();
  const [reqSuccess, setReqSuccess] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      getDonationsNearby();
      getReqDonations();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const getDonationsNearby = async () => {
    const res = await getIncomingDonations();
    if (!res.ok) {
      alert(res.message);
      console.log(res.error);
      return;
    }
    setIncomingDonations(res.data);
  };

  const getReqDonations = async () => {
    const res = await getRequestedDonations();
    if (!res.ok) {
      alert(res.message);
      console.log(res.error.cause);
      return;
    }
    setRequestedDonations(res.data);
  };

  const getPersonalDetails = async () => {
    const res = await getCarehomeDetails();
    if (!res.ok) {
      alert(res.message);
      console.log(res.error);
      return;
    }
    setPersonalDetails(res.data);
  };

  const handleDonationRequest = async (donationId: string) => {
    const res = await requestDonation(donationId);
    if (!res.ok) {
      alert(res.message);
      console.log(res.error);
    }
    showModal(
      "Request successful",
      "Donation has been requested successfully and will be shown to the NGOs",
    );
    setReqSuccess(true);
  };

  useEffect(() => {
    getDonationsNearby();
    getPersonalDetails();
    getReqDonations();
  }, [reqSuccess]);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <PageHeader />
      <ScrollView
        style={s.container}
        contentContainerStyle={{ paddingBottom: HEIGHT.tabBar + SPACING.page }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={s.subcontainer}>
          <Welcome username={personalDetails?.name ?? "Carehome"} />
          <DashboardCard
            heading={"Donations Nearby"}
            subheading={"Explore local donations you can request"}
          >
            <View>
              {incomingDonations?.map((donation, idx) => (
                <AvailableDonationCard key={idx} donation={donation}>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <OutlineButton
                      onPress={() =>
                        router.push(`/carehome/requests/${donation._id}`)
                      }
                      text={"View Details"}
                    />
                    <GradientButton
                      onPress={() => {
                        handleDonationRequest(donation._id);
                      }}
                      text={"Request"}
                      style={{ flex: 1 }}
                      gradient={GRADIENT_PRIMARY}
                    />
                  </View>
                </AvailableDonationCard>
              ))}

              {!incomingDonations ||
                (!incomingDonations.length && (
                  <View
                    style={{
                      gap: 10,
                      padding: 20,
                      paddingVertical: 80,
                      borderRadius: BORDER_RADIUS,
                      borderColor: COLORS.outlineGray,
                      borderWidth: 1,
                    }}
                  >
                    <PoppinsText
                      style={{ textAlign: "center", color: COLORS.outlineGray }}
                    >
                      No Incoming Deliveries
                    </PoppinsText>
                  </View>
                ))}
            </View>
          </DashboardCard>

          <DashboardCard
            heading={"Requested Donations"}
            subheading={"Track the status of your requested donations"}
          >
            <View>
              {requestedDonations?.map((donation, idx) => (
                <RequestedDonationCard key={idx} donation={donation}>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <OutlineButton
                      onPress={() =>
                        router.push(`carehome/requests/${donation._id}`)
                      }
                      text={"View Donation Details"}
                    />
                  </View>
                </RequestedDonationCard>
              ))}

              {!requestedDonations ||
                (!requestedDonations.length && (
                  <View
                    style={{
                      gap: 10,
                      padding: 20,
                      paddingVertical: 80,
                      borderRadius: BORDER_RADIUS,
                      borderColor: COLORS.outlineGray,
                      borderWidth: 1,
                    }}
                  >
                    <PoppinsText
                      style={{ textAlign: "center", color: COLORS.outlineGray }}
                    >
                      No donations requested yet!
                    </PoppinsText>
                  </View>
                ))}
            </View>
          </DashboardCard>
          <DashboardCard
            heading={"Impact Reports"}
            subheading={"Food received & people served"}
          >
            <ImpactReports totalMealsServed={0} foodReceived={0} />
          </DashboardCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

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
