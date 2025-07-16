import { NgoStep1Provider } from "@/src/core/auth/hooks/ngo/step1Context";
import { NgoStep2Provider } from "@/src/core/auth/hooks/ngo/step2Context";
import { NgoStep3Provider } from "@/src/core/auth/hooks/ngo/step3Context";
import { NgoStep4Provider } from "@/src/core/auth/hooks/ngo/step4Context";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const RegisterNgoLayout = () => {
  return (
    <NgoStep1Provider>
      <NgoStep2Provider>
        <NgoStep3Provider>
          <NgoStep4Provider>
            <Stack>
              <Stack.Screen name="step1" options={{ headerShown: false }} />
              <Stack.Screen name="step2" options={{ headerShown: false }} />
              <Stack.Screen name="step3" options={{ headerShown: false }} />
              <Stack.Screen name="step4" options={{ headerShown: false }} />
            </Stack>
          </NgoStep4Provider>
        </NgoStep3Provider>
      </NgoStep2Provider>
    </NgoStep1Provider>
  );
};

export default RegisterNgoLayout;

const styles = StyleSheet.create({});
