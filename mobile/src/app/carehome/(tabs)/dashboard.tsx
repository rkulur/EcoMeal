import DashboardCard from "@/src/components/DashboardCard";
import PageHeader from "@/src/components/PageHeader";
import Welcome from "@/src/components/Welcome";
import ImpactReports from "@/src/core/carehome/components/ImpactReports";
import IncomingFoodCard from "@/src/core/carehome/components/IncomingFoodCard";
import { HEIGHT, SPACING } from "@/src/themes";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  useEffect(() => {});
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
          <DashboardCard
            heading={"Impact Reports"}
            subheading={"Food received & people served"}
          >
            <ImpactReports />
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
