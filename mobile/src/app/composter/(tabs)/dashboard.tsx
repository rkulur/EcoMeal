import { PoppinsText } from "@/src/components";
import DashboardCard from "@/src/components/DashboardCard";
import PageHeader from "@/src/components/PageHeader";
import Welcome from "@/src/components/Welcome";
import getOngoingDeliveries from "@/src/core/carehome/api/getOngoingDeliveries";
import getCarehomeDetails from "@/src/core/carehome/api/getPersonalDetails";
import ImpactReports from "@/src/core/carehome/components/ImpactReports";
import IncomingFoodCard from "@/src/core/carehome/components/IncomingFoodCard";
import getExpiredDonations from "@/src/core/composter/api/getExpiredDonations";
import getComposterDetails from "@/src/core/composter/api/getPersonalDetails";
import { BORDER_RADIUS, COLORS, HEIGHT, SPACING } from "@/src/themes";
import { PersonalDetails } from "@/src/types/carehome";
import { DonationType } from "@/src/types/donor";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  const [incomingDonations, setIncomingDonations] = useState<DonationType[]>();
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>();
  useEffect(() => {
    const getIncomingDonations = async () => {
      const res = await getExpiredDonations();
      if (!res.ok) {
        alert(res.message);
        console.log(res.error);
        return;
      }
      setIncomingDonations(res.data);
    };

    const getPersonalDetails = async () => {
      const res = await getComposterDetails();
      if (!res.ok) {
        // alert(res.message);
        console.log(res.error);
        return;
      }
      setPersonalDetails(res.data);
    };

    getIncomingDonations();
    getPersonalDetails();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <PageHeader />
      <ScrollView
        style={s.container}
        contentContainerStyle={{ paddingBottom: HEIGHT.tabBar + SPACING.page }}
      >
        <View style={s.subcontainer}>
          <Welcome username={personalDetails?.name ?? "Composter"} />
          <DashboardCard
            heading={"Expired Donations"}
            subheading={"Get the list of all expired donations"}
          >
            <View>
              {!incomingDonations ||
                (!incomingDonations.length && (
                  <View
                    style={{
                      gap: 10,
                      padding: 20,
                      paddingVertical: 120,
                      borderRadius: BORDER_RADIUS,
                      borderColor: COLORS.outlineGray,
                      borderWidth: 1,
                    }}
                  >
                    <PoppinsText
                      style={{ textAlign: "center", color: COLORS.outlineGray }}
                    >
                      No Incoming Deliveries
                    </PoppinsText>
                  </View>
                ))}

              {/* {incomingDonations?.map((donation, idx) => ( */}
              {/*   <IncomingFoodCard key={idx} donation={donation} /> */}
              {/* ))} */}
            </View>
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
