import { PoppinsText } from "@/src/components";
import { BORDER_RADIUS, COLORS, FONT_SIZE, SPACING } from "@/src/themes";
import { DonationHistoryListType } from "@/src/validation/donate.schema";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import getDonationHistory from "../../api/history";
import FilterTabs from "../FilterTabs";
import HistoryCard from "./HistoryCard";
import { useRouter } from "expo-router";

const DisplayDonation = () => {
  const filterArr = ["All", "Pending", "Completed", "Expired"] as const;
  type Filter = (typeof filterArr)[number];
  const [currFilter, setCurrFilter] = useState<Filter>("All");
  const [donationHistory, setDonationHistory] = useState<
    DonationHistoryListType[] | null
  >(null);
  const router = useRouter();

  const normalizeStatus = (
    status:
      | "delivered"
      | "cancelled"
      | "pending"
      | "accepted"
      | "assigned"
      | "picked_up"
      | "expired",
  ) => {
    if (["delivered", "cancelled"].includes(status)) return "completed";
    if (["accepted", "assigned", "picked_up"].includes(status)) {
      return "pending";
    }
    return status;
  };

  const filterDonation = (
    donation: DonationHistoryListType[],
    currFilter: (typeof filterArr)[number],
  ) => {
    if (currFilter === "All") return donation;
    let status = currFilter.charAt(0).toLowerCase() + currFilter.substring(1);
    return donation.filter((item) => normalizeStatus(item.status) === status);
  };

  useEffect(() => {
    const getHistory = async () => {
      const res = await getDonationHistory();
      if (!res.ok) {
        alert(JSON.stringify(res.error));
        return;
      }
      console.log(JSON.stringify(res.data));
      setDonationHistory(res.data);
    };
    getHistory();
  }, []);
  return (
    <View style={{ gap: 10 }}>
      <FilterTabs
        filters={filterArr}
        currFilter={currFilter}
        setCurrFilter={setCurrFilter}
      />
      {donationHistory?.length ? (
        filterDonation(donationHistory, currFilter).map((donation, idx) => (
          <Pressable
            onPress={() => router.push(`/donor/history/${donation._id}`)}
            key={idx}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.hoverGray : COLORS.white,
              },
            ]}
          >
            <HistoryCard donation={donation} />
          </Pressable>
        ))
      ) : (
        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.outlineGray,
            borderRadius: BORDER_RADIUS,
            padding: 40,
          }}
        >
          <PoppinsText style={{ textAlign: "center" }}>
            No history of donation
          </PoppinsText>
        </View>
      )}
    </View>
  );
};

export default DisplayDonation;

const s = StyleSheet.create({
  topHalf: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dtnDetailsCont: {
    gap: 5,
  },
  donationState: {
    borderRadius: 99999,
    paddingHorizontal: 8,
  },
  donationStateText: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: FONT_SIZE.xsmall,
  },
  container: {
    borderRadius: BORDER_RADIUS,
    borderColor: COLORS.outlineGray,
    borderWidth: 1,
    paddingVertical: SPACING.cardVertical / 1.5,
    paddingHorizontal: SPACING.cardHorizontal / 1.5,
    gap: 10,
  },
});
