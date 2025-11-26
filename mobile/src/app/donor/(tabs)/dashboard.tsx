import GradientButton from "@/src/components/GradientButton";
import PageHeader from "@/src/components/PageHeader";
import Welcome from "@/src/components/Welcome";
import getDonationHistory from "@/src/core/donor/api/history";
import ActiveDonations from "@/src/core/donor/components/dashboard/ActiveDonations";
import DonationHistory from "@/src/core/donor/components/dashboard/DonationHistory";
import Impact from "@/src/core/donor/components/dashboard/Impact";
import { GRADIENT_SECONDARY, HEIGHT, SPACING } from "@/src/themes";
import { DonationHistoryListType } from "@/src/types/donor";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  const [donations, setDonations] = useState<DonationHistoryListType[] | null>(
    null,
  );
  const activeDonations = donations?.filter((donation) =>
    ["pending", "accepted", "assigned", "picked_up"].includes(donation.status),
  );
  const donationHistory = donations?.filter((donation) =>
    ["delivered", "cancelled", "expired"].includes(donation.status),
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      getDonations();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const router = useRouter();

  async function getDonations() {
    const res = await getDonationHistory();
    if (!res.ok) {
      alert(JSON.stringify(res.error));
      return;
    }
    console.log(JSON.stringify(res.data));
    setDonations(res.data);
  }

  useEffect(() => {
    getDonations();
  }, []);
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
          <Welcome username={"Donor"}>
            <GradientButton
              text="Donate Food Now"
              gradient={GRADIENT_SECONDARY}
              onPress={() => {
                router.navigate("/donor/donate");
              }}
              style={{ height: HEIGHT.button }}
            />
          </Welcome>
          <Impact noOfDonations={0} noOfMeals={0} noOfNgosHelped={0} />
          <ActiveDonations donations={activeDonations} />
          <DonationHistory donations={donationHistory} />
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
