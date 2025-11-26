import { StyleSheet, Text, View } from "react-native";
import InfoCard from "./InfoCard";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@/src/themes";

const InfoSection = () => {
  return (
    <View style={s.container}>
      <InfoCard
        icon={<Feather name="package" size={50} />}
        title={"Pending Requests"}
        count={0}
      />
      <InfoCard
        icon={
          <Ionicons
            name="checkmark-circle-outline"
            size={50}
            color={COLORS.green}
          />
        }
        title={"Accepted Donations"}
        count={0}
      />
      <InfoCard
        icon={
          <MaterialCommunityIcons
            name="food-variant"
            size={50}
            color={COLORS.blue}
          />
        }
        title={"Meals served"}
        count={0}
      />
      <InfoCard
        icon={<Ionicons name="leaf" size={50} color={COLORS.green} />}
        title={"Impact"}
        count={0}
      />
    </View>
  );
};

export default InfoSection;

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    justifyContent: "space-between",
  },
});
