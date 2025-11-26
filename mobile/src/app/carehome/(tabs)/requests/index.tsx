import { PoppinsHeadText, PoppinsText } from "@/src/components";
import GradientButton from "@/src/components/GradientButton";
import OutlineButton from "@/src/components/OutlineButton";
import PageHeader from "@/src/components/PageHeader";
import SimpleAlertModal from "@/src/components/SimpleAlertModal";
import getAvailableDonations from "@/src/core/api";
import requestDonation from "@/src/core/carehome/api/requestDonation";
import AvailableDonationCard from "@/src/core/ngo/components/dashboard/AvailableDonationCard";
import { useAlertModal } from "@/src/hooks/AlertModalContext";
import {
  BORDER_RADIUS,
  COLORS,
  GRADIENT_PRIMARY,
  HEIGHT,
  SPACING,
} from "@/src/themes";
import { AvailableDonation } from "@/src/types/donor";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Requests = () => {
  const [availableDonations, setAvailableDonations] =
    useState<AvailableDonation[]>();
  const router = useRouter();
  const [foodRequested, setFoodRequested] = useState(false);

  const handleViewDetails = (donationId: string) => {
    router.push(`/carehome/requests/${donationId}`);
  };

  const { showModal, isVisible } = useAlertModal();

  const handleRequestFood = async (donationId: string) => {
    const res = await requestDonation(donationId);
    if (!res.ok) {
      showModal("Something went wrong!", res.message);
      console.log(res.error);
    }
    showModal(
      "Donation Requested Successfully",
      "Your request has been sent to the NGO. You’ll be notified once it’s approved or assigned!",
    );
    setFoodRequested(true);
  };

  useEffect(() => {
    if (foodRequested && !isVisible) {
      router.back();
      router.navigate("/carehome/dashboard");
    }
  }, [foodRequested]);

  async function getDonations() {
    const res = await getAvailableDonations("carehome");
    if (!res.ok) {
      alert(res.message);
      console.log(res.error);
      return;
    }
    setAvailableDonations(res.data);
  }

  useEffect(() => {
    getDonations();
  }, []);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <PageHeader />
        <ScrollView
          style={s.container}
          contentContainerStyle={{
            paddingBottom: HEIGHT.tabBar + SPACING.page,
            gap: 10,
          }}
        >
          <PoppinsHeadText style={{ textAlign: "center" }}>
            Request Food
          </PoppinsHeadText>
          <View style={s.subContainer}>
            {availableDonations && availableDonations.length > 0 ? (
              availableDonations.map((donation, idx) => (
                <AvailableDonationCard key={idx} donation={donation}>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <OutlineButton
                      onPress={() => handleViewDetails(donation._id)}
                      text={"View Details"}
                    />
                    <GradientButton
                      onPress={() => handleRequestFood(donation._id)}
                      text={"Request"}
                      style={{ flex: 1 }}
                      gradient={GRADIENT_PRIMARY}
                    />
                  </View>
                </AvailableDonationCard>
              ))
            ) : (
              <View
                style={{
                  gap: 10,
                  padding: 20,
                  paddingVertical: 300,
                  borderRadius: BORDER_RADIUS,
                  borderColor: COLORS.outlineGray,
                  borderWidth: 1,
                }}
              >
                <PoppinsText
                  style={{ textAlign: "center", color: COLORS.outlineGray }}
                >
                  No Donations Available
                </PoppinsText>
              </View>
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
    padding: 20,
    gap: 10,
  },
  subContainer: {
    backgroundColor: COLORS.white,
    // paddingHorizontal: SPACING.cardHorizontal,
    paddingVertical: SPACING.cardVertical,
    paddingTop: SPACING.cardVertical - 10,
    borderRadius: BORDER_RADIUS,
    // boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
    gap: 10,
  },
});
