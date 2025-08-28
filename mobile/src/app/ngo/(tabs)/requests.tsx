import { PoppinsText } from "@/src/components";
import PageHeader from "@/src/components/PageHeader";
import FilterTabs from "@/src/core/donor/components/FilterTabs";
import getAvailableDonations, {
  AvailableDonation,
} from "@/src/core/ngo/api/getAvailaleDonations";
import RequestsCard from "@/src/core/ngo/components/requests/RequestsCard";
import { HEIGHT, SPACING } from "@/src/themes";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Requests = () => {
  const filters = ["Available", "Pending", "Approved"] as const;
  type FilterType = (typeof filters)[number];
  const [currFilter, setCurrFilter] = useState<FilterType>("Available");

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

  function pendingDonationsComponent() {
    return (
      <View>
        <PoppinsText>Pending Donations</PoppinsText>
      </View>
    );
  }

  function approvedDonationsComponent() {
    return (
      <View>
        <PoppinsText>Approved Donations</PoppinsText>
      </View>
    );
  }
  function availableDonationsComponent(
    availableDonations: AvailableDonation[],
  ) {
    return (
      <View style={{ gap: 10 }}>
        {availableDonations.map((donation, idx) => (
          <RequestsCard donation={donation} key={idx} />
        ))}
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <PageHeader />
      <ScrollView
        style={s.container}
        contentContainerStyle={{ paddingBottom: HEIGHT.tabBar + SPACING.page }}
      >
        <View style={{ gap: 20 }}>
          <FilterTabs
            filters={filters}
            currFilter={currFilter}
            setCurrFilter={setCurrFilter}
          />
          {currFilter === "Available" &&
            availableDonationsComponent(availableDonations)}
          {currFilter === "Pending" && pendingDonationsComponent()}
          {currFilter === "Approved" && approvedDonationsComponent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Requests;

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
