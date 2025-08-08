import { ComposterStep1Provider } from "@/src/core/auth/hooks/composter/step1Context";
import { ComposterStep2Provider } from "@/src/core/auth/hooks/composter/step2Context";
import { ComposterStep3Provider } from "@/src/core/auth/hooks/composter/step3Context";
import { ComposterStep4Provider } from "@/src/core/auth/hooks/composter/step4Context";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const RegisterComposterLayout = () => {
  return (
    <ComposterStep1Provider>
      <ComposterStep2Provider>
        <ComposterStep3Provider>
          <Stack>
            <Stack.Screen name="step1" options={{ headerShown: false }} />
            <Stack.Screen name="step2" options={{ headerShown: false }} />
            <Stack.Screen name="step3" options={{ headerShown: false }} />
          </Stack>
        </ComposterStep3Provider>
      </ComposterStep2Provider>
    </ComposterStep1Provider>
  );
};

export default RegisterComposterLayout;

const styles = StyleSheet.create({});
