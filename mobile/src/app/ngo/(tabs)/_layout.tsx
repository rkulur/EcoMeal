import TabBar from "@/src/components/TabBar";
import { COLORS, FONT, FONT_SIZE } from "@/src/themes";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const NgoTabsLayout = () => {
  return (
    <Tabs
      tabBar={(props) => (
        <TabBar
          {...props}
          iconNames={["home", "sync-circle", "map", "pie-chart"]}
        />
      )}
      screenOptions={{
        tabBarLabelStyle: s.tabBarLabel,
        tabBarActiveTintColor: COLORS.white,
        tabBarActiveBackgroundColor: COLORS.purple,
        headerShown: false,
      }}
    >
      <Tabs.Screen name="dashboard" options={{ headerShown: false }} />
      <Tabs.Screen name="requests" options={{ headerShown: false }} />
      <Tabs.Screen name="pickups" options={{ headerShown: false }} />
      <Tabs.Screen name="reports" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default NgoTabsLayout;

const s = StyleSheet.create({
  tabBarLabel: {
    fontFamily: FONT.REGULAR,
    fontSize: FONT_SIZE.small,
  },
});
