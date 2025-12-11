import PageHeader from "@/src/components/PageHeader";
import SimpleAlertModal from "@/src/components/SimpleAlertModal";
import Welcome from "@/src/components/Welcome";
import getAvailableDonations from "@/src/core/api";
import getOngoingPickups from "@/src/core/ngo/api/getOngoingPickups";
import getPastDonations from "@/src/core/ngo/api/getPastDonations";
import AvailableDonations from "@/src/core/ngo/components/dashboard/AvailableDonations";
import InfoSection from "@/src/core/ngo/components/dashboard/InfoSection";
import OngoingPickups from "@/src/core/ngo/components/dashboard/OngoingPickups";
import PastDonation from "@/src/core/ngo/components/dashboard/PastDonations";
import { HEIGHT, SPACING } from "@/src/themes";
import { AvailableDonation, DonationType } from "@/src/types/donor";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  const router = useRouter();

  const [availableDonations, setAvailableDonations] = useState<
    AvailableDonation[]
  >([]);
  const [ongoingDonations, setOngoingDonations] = useState<AvailableDonation[]>(
    [],
  );
  const [pastDonations, setPastDonations] = useState<AvailableDonation[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      getDonations();
      getOngoingDonations();
      getPDonations();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const getDonations = async () => {
    const res = await getAvailableDonations("ngo");
    if (!res.ok) {
      alert(res.error);
      return;
    }
    setAvailableDonations(res.data.length ? res.data : []);
  };

  const getOngoingDonations = async () => {
    const res = await getOngoingPickups();
    if (!res.ok) {
      alert(res.error);
      return;
    }
    setOngoingDonations(res.data.length ? res.data : []);
  };

  const getPDonations = async () => {
    const res = await getPastDonations();
    if (!res.ok) {
      alert(res.error);
      return;
    }
    setPastDonations(res.data.length ? res.data : []);
  };

  useEffect(() => {
    getOngoingDonations();
    getDonations();
    getPDonations();
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
          <Welcome username={"Ngo"} />
          <InfoSection />
          <AvailableDonations donations={availableDonations} />
          <OngoingPickups pickups={ongoingDonations} />
          <PastDonation pickups={pastDonations} />
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
