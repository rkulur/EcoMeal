import PageHeader from "@/src/components/PageHeader";
import Welcome from "@/src/components/Welcome";
import getAvailableDonations, {
  AvailableDonation,
} from "@/src/core/ngo/api/getAvailaleDonations";
import AvailableDonations from "@/src/core/ngo/components/dashboard/AvailableDonations";
import InfoSection from "@/src/core/ngo/components/dashboard/InfoSection";
import OngoingPickups from "@/src/core/ngo/components/dashboard/OngoingPickups";
import { HEIGHT, SPACING } from "@/src/themes";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  const router = useRouter();

  const [availableDonations, setAvailableDonations] = useState<
    AvailableDonation[]
  >([]);

  useEffect(() => {
    const getDonations = async () => {
      const res = await getAvailableDonations();
      if (!res.ok) {
        alert(res.error);
        return;
      }
      setAvailableDonations(res.data.length ? res.data : []);
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
          <Welcome username={"Ngo"} />
          <InfoSection />
          <AvailableDonations donations={availableDonations} />
          <OngoingPickups pickups={["one", "two"]} />
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
