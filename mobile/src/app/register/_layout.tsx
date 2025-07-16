import { DonorStep1Provider } from "@/src/core/auth/hooks/donor/step1Context";
import { DonorStep2Provider } from "@/src/core/auth/hooks/donor/step2Context";
import { DonorStep3Provider } from "@/src/core/auth/hooks/donor/step3Context";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const RegisterLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="donor" options={{ headerShown: false }} />
      <Stack.Screen name="ngo" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RegisterLayout;

const styles = StyleSheet.create({});
