import GradientButton from "@/src/components/GradientButton";
import PageHeader from "@/src/components/PageHeader";
import getDonationHistory from "@/src/core/donor/api/history";
import ActiveDonations from "@/src/core/donor/components/dashboard/ActiveDonations";
import DonationHistory from "@/src/core/donor/components/dashboard/DonationHistory";
import Impact from "@/src/core/donor/components/dashboard/Impact";
import Welcome from "@/src/components/Welcome";
import { GRADIENT_SECONDARY, HEIGHT, SPACING } from "@/src/themes";
import { DonationHistoryListType } from "@/src/validation/donate.schema";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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

  const router = useRouter();

  useEffect(() => {
    const getDonations = async () => {
      const res = await getDonationHistory();
      if (!res.ok) {
        alert(JSON.stringify(res.error));
        return;
      }
      console.log(JSON.stringify(res.data));
      setDonations(res.data);
    };
    getDonations();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <PageHeader />
      <ScrollView
        style={s.container}
        contentContainerStyle={{ paddingBottom: HEIGHT.tabBar + SPACING.page }}
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
          <Impact noOfDonations={8} noOfMeals={1252} noOfNgosHelped={12} />
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
