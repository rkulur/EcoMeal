import { CarehomeStep1Provider } from "@/src/core/auth/hooks/carehome/step1Context";
import { CarehomeStep2Provider } from "@/src/core/auth/hooks/carehome/step2Context";
import { CarehomeStep3Provider } from "@/src/core/auth/hooks/carehome/step3Context";
import { CarehomeStep4Provider } from "@/src/core/auth/hooks/carehome/step4Context";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const RegisterCarehomeLayout = () => {
  return (
    <CarehomeStep1Provider>
      <CarehomeStep2Provider>
        <CarehomeStep3Provider>
          <CarehomeStep4Provider>
            <Stack>
              <Stack.Screen name="step1" options={{ headerShown: false }} />
              <Stack.Screen name="step2" options={{ headerShown: false }} />
              <Stack.Screen name="step3" options={{ headerShown: false }} />
              <Stack.Screen name="step4" options={{ headerShown: false }} />
            </Stack>
          </CarehomeStep4Provider>
        </CarehomeStep3Provider>
      </CarehomeStep2Provider>
    </CarehomeStep1Provider>
  );
};

export default RegisterCarehomeLayout;

const styles = StyleSheet.create({});
