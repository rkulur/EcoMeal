import TabBar from "@/src/components/TabBar";
import FoodRequestContextProvider from "@/src/core/carehome/hooks/requestFoodContext";
import { COLORS, FONT, FONT_SIZE } from "@/src/themes";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const DonorTabsLayout = () => {
  return (
    <FoodRequestContextProvider>
      <Tabs
        tabBar={(props) => (
          <TabBar
            {...props}
            iconNames={["home", "fast-food", "cube", "pie-chart"]}
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
        <Tabs.Screen name="deliveries" options={{ headerShown: false }} />
        <Tabs.Screen name="reports" options={{ headerShown: false }} />
      </Tabs>
    </FoodRequestContextProvider>
  );
};

export default DonorTabsLayout;

const s = StyleSheet.create({
  tabBarLabel: {
    fontFamily: FONT.REGULAR,
    fontSize: FONT_SIZE.small,
  },
});
