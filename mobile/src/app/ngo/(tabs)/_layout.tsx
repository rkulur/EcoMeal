import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const DonorTabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="dashboard" options={{ headerShown: false }} />
      <Tabs.Screen name="requests" options={{ headerShown: false }} />
      <Tabs.Screen name="pickups" options={{ headerShown: false }} />
      <Tabs.Screen name="reports" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default DonorTabsLayout;

const styles = StyleSheet.create({});
