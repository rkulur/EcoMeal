import TabBar from "@/src/components/TabBar";
import { COLORS, FONT, FONT_SIZE } from "@/src/themes";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const DonorTabsLayout = () => {
  return (
    <Tabs
      tabBar={(props) => (
        <TabBar {...props} iconNames={["home", "add", "time", "stats-chart"]} />
      )}
      screenOptions={{
        tabBarLabelStyle: s.tabBarLabel,
        tabBarActiveTintColor: COLORS.white,
        tabBarActiveBackgroundColor: COLORS.purple,
        headerShown: false,
      }}
    >
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="donate" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="impact" />
    </Tabs>
  );
};

export default DonorTabsLayout;

const s = StyleSheet.create({
  tabBarLabel: {
    fontFamily: FONT.REGULAR,
    fontSize: FONT_SIZE.small,
  },
});
