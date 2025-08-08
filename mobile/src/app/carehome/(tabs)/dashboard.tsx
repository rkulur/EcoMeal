import PageHeader from "@/src/components/PageHeader";
import getCarehomeHistory from "@/src/core/donor/api/history";
import ActiveCarehomes from "@/src/core/donor/components/dashboard/ActiveCarehomes";
import CarehomeHistory from "@/src/core/donor/components/dashboard/CarehomeHistory";
import Impact from "@/src/core/donor/components/dashboard/Impact";
import Welcome from "@/src/components/Welcome";
import { HEIGHT, SPACING } from "@/src/themes";
import { CarehomeHistoryListType } from "@/src/validation/donate.schema";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardCard from "@/src/components/DashboardCard";
import IncomingFoodCard from "@/src/core/carehome/components/IncomingFoodCard";

const Dashboard = () => {
  const [carehomes, setCarehomes] = useState<CarehomeHistoryListType[] | null>(
    null,
  );
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <PageHeader />
      <ScrollView
        style={s.container}
        contentContainerStyle={{ paddingBottom: HEIGHT.tabBar + SPACING.page }}
      >
        <View style={s.subcontainer}>
          <Welcome username={"Carehome"} />
          <DashboardCard
            heading={"Incoming Food Deliveries"}
            subheading={"Track food in transit & expected arrival"}
          >
            <IncomingFoodCard />
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
