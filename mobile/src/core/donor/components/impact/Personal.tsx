import { StyleSheet, Text, View } from "react-native";
import InfoCard from "./InfoCard";
import { PoppinsText } from "@/src/components";
import ProgressBar from "../ProgressBar";

const Personal = () => {
  return (
    <View style={{ gap: 20 }}>
      <InfoCard heading={"Total Donations"} value={"15"} iconName={"pie-chart"}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <PoppinsText>Progress to next badge</PoppinsText>
          <PoppinsText>15/20</PoppinsText>
        </View>
        <ProgressBar progress={(15 * 100) / 20} />
      </InfoCard>
      <InfoCard heading={"Meals Provided"} value={"500"} iconName={"fast-food"}>
        <PoppinsText>
          That's enough to feed a family of 4 for 125 days
        </PoppinsText>
      </InfoCard>
      <InfoCard
        heading={"Food Waste Prevented"}
        value={"30 Kg"}
        iconName={"trophy"}
      >
        <PoppinsText>You've helped save 30kg of food from landfill</PoppinsText>
      </InfoCard>
    </View>
  );
};

export default Personal;

const s = StyleSheet.create({});
