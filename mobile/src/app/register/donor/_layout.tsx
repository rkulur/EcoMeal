import { DonorStep1Provider } from "@/src/core/auth/hooks/donor/step1Context";
import { DonorStep2Provider } from "@/src/core/auth/hooks/donor/step2Context";
import { DonorStep3Provider } from "@/src/core/auth/hooks/donor/step3Context";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const RegisterDonorLayout = () => {
  return (
    <DonorStep1Provider>
      <DonorStep2Provider>
        <DonorStep3Provider>
          <Stack>
            <Stack.Screen name="step1" options={{ headerShown: false }} />
            <Stack.Screen name="step2" options={{ headerShown: false }} />
            <Stack.Screen name="step3" options={{ headerShown: false }} />
          </Stack>
        </DonorStep3Provider>
      </DonorStep2Provider>
    </DonorStep1Provider>
  );
};

export default RegisterDonorLayout;

const styles = StyleSheet.create({});
