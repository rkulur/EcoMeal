import { StyleSheet, Text, View } from "react-native";
import InfoCard from "./InfoCard";
import { PoppinsText } from "@/src/components";
import { FONT, FONT_SIZE } from "@/src/themes";

const Community = () => {
  return (
    <View style={{ gap: 10 }}>
      <InfoCard heading={"NGOs Helped"} value={"15"} iconName={"people"}>
        <PoppinsText>
          Your donations have supported 5 local organizations
        </PoppinsText>
      </InfoCard>
      <View>
        <PoppinsText>Community Leaderboard</PoppinsText>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <PoppinsText>1</PoppinsText>
            <PoppinsText>Sarah M</PoppinsText>
          </View>
          <PoppinsText>22 Donations</PoppinsText>
        </View>
      </View>
    </View>
  );
};

export default Community;

const styles = StyleSheet.create({});
