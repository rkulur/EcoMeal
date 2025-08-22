import GradientButton from "@/src/components/GradientButton";
import PageHeader from "@/src/components/PageHeader";
import Welcome from "@/src/components/Welcome";
import AvailableDonations from "@/src/core/ngo/components/AvailableDonations";
import InfoSection from "@/src/core/ngo/components/InfoSection";
import {
  FONT,
  FONT_SIZE,
  GRADIENT_SECONDARY,
  HEIGHT,
  LINE_HEIGHT,
  SPACING,
} from "@/src/themes";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  const router = useRouter();
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
          <AvailableDonations />
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
