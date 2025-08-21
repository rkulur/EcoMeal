import { PoppinsHeadText } from "@/src/components";
import PageHeader from "@/src/components/PageHeader";
import DisplayDeliveries from "@/src/core/carehome/components/DisplayDeliveries";
import FilterTabs from "@/src/core/donor/components/FilterTabs";
import HistoryCard from "@/src/core/donor/components/history/HistoryCard";
import SearchBar from "@/src/core/donor/components/history/SearchBar";
import { COLORS, HEIGHT, SPACING } from "@/src/themes";
import { DonationHistoryListType } from "@/src/validation/donate.schema";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Deliveries = () => {
  const [searchString, setSearchString] = useState("");
  const filter = ["Ongoing", "Past"] as const;
  const [currFilter, setCurrFilter] =
    useState<(typeof filter)[number]>("Ongoing");

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <PageHeader />
      <ScrollView
        style={s.container}
        contentContainerStyle={{ paddingBottom: HEIGHT.tabBar + SPACING.page }}
      >
        <View style={{ gap: 20 }}>
          <PoppinsHeadText style={{ textAlign: "center" }}>
            Deliveries
          </PoppinsHeadText>
          <SearchBar
            value={searchString}
            onChange={setSearchString}
            placeholder="Enter donation name"
          />
          <FilterTabs
            filters={filter}
            currFilter={currFilter}
            setCurrFilter={setCurrFilter}
          />
          <DisplayDeliveries />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Deliveries;

const s = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.page,
    paddingTop: SPACING.page,
    height: "100%",
  },
});
