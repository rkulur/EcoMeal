import { PoppinsHeadText } from "@/src/components";
import PageHeader from "@/src/components/PageHeader";
import getDonationHistory from "@/src/core/donor/api/history";
import DisplayDonation from "@/src/core/donor/components/history/DisplayDonation";
import ImpactAtGlance from "@/src/core/donor/components/history/ImpactAtGlance";
import SearchBar from "@/src/core/donor/components/history/SearchBar";
import { HEIGHT, SPACING } from "@/src/themes";
import { DonationHistoryListType } from "@/src/types/donor";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const History = () => {
  const [searchString, setSearchString] = useState("");

  const [donationHistory, setDonationHistory] = useState<
    DonationHistoryListType[] | null
  >(null);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      getHistory();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const getHistory = async () => {
    const res = await getDonationHistory();
    if (!res.ok) {
      alert(JSON.stringify(res.error));
      return;
    }
    console.log(JSON.stringify(res.data));
    setDonationHistory(res.data);
  };
  useEffect(() => {
    getHistory();
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
          <DisplayDonation donationHistory={donationHistory} />
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
