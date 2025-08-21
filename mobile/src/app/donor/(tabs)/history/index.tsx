import { PoppinsHeadText } from "@/src/components";
import PageHeader from "@/src/components/PageHeader";
import DisplayDonation from "@/src/core/donor/components/history/DisplayDonation";
import ImpactAtGlance from "@/src/core/donor/components/history/ImpactAtGlance";
import SearchBar from "@/src/core/donor/components/history/SearchBar";
import { HEIGHT, SPACING } from "@/src/themes";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const History = () => {
  const [searchString, setSearchString] = useState("");
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <PageHeader />
      <ScrollView
        style={s.container}
        contentContainerStyle={{ paddingBottom: HEIGHT.tabBar + SPACING.page }}
      >
        <View style={{ gap: 20 }}>
          <PoppinsHeadText style={{ textAlign: "center" }}>
            Donation History
          </PoppinsHeadText>
          <ImpactAtGlance noOfDonations={0} noOfMeals={0} noOfNgosHelped={0} />
          <SearchBar
            value={searchString}
            placeholder="Enter donation"
            onChange={setSearchString}
          />
          <DisplayDonation />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;

const s = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.page,
    paddingTop: SPACING.page,
    height: "100%",
  },
});
