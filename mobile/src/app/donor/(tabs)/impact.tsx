import { PoppinsHeadText, PoppinsText } from "@/src/components";
import PageHeader from "@/src/components/PageHeader";
import FilterTabs from "@/src/core/donor/components/FilterTabs";
import Achievements from "@/src/core/donor/components/impact/Achievements";
import Community from "@/src/core/donor/components/impact/Community";
import DonorCard from "@/src/core/donor/components/impact/DonorCard";
import InfoCard from "@/src/core/donor/components/impact/InfoCard";
import Personal from "@/src/core/donor/components/impact/Personal";
import ProgressBar from "@/src/core/donor/components/ProgressBar";
import { FONT, FONT_SIZE, HEIGHT, SPACING } from "@/src/themes";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Impact = () => {
  const filterArr = ["Personal", "Community", "Environmental"];
  const [currFilter, setCurrFilter] =
    useState<(typeof filterArr)[number]>("Personal");
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <PageHeader />
      <ScrollView
        style={s.container}
        contentContainerStyle={{ paddingBottom: HEIGHT.tabBar + SPACING.page }}
      >
        <View style={{ gap: 20 }}>
          <PoppinsHeadText style={{ textAlign: "center" }}>
            Your Impact
          </PoppinsHeadText>
          <DonorCard donorName={"Jane Donor"} joinDate={new Date()} />
          <FilterTabs
            filters={filterArr}
            currFilter={currFilter}
            setCurrFilter={setCurrFilter}
          />
          {currFilter === "Personal" && <Personal />}
          {currFilter === "Community" && <Community />}
          <PoppinsText
            style={{ fontSize: FONT_SIZE.large, fontFamily: FONT.SEMI_BOLD }}
          >
            Your Achievements
          </PoppinsText>
          <Achievements />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Impact;

const s = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.page,
    paddingTop: SPACING.page,
    height: "100%",
  },
});
