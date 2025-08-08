import { DonationStep1Provider } from "@/src/core/donor/hooks/donate/step1Context";
import { DonationStep2Provider } from "@/src/core/donor/hooks/donate/step2Context";
import { DonationStep3Provider } from "@/src/core/donor/hooks/donate/step3Context";
import { Stack } from "expo-router";
import React from "react";

const DonateLayout = () => {
  return (
    <DonationStep1Provider>
      <DonationStep2Provider>
        <DonationStep3Provider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="step1" />
            <Stack.Screen name="step2" />
            <Stack.Screen name="step3" />
            <Stack.Screen name="step4" />
          </Stack>
        </DonationStep3Provider>
      </DonationStep2Provider>
    </DonationStep1Provider>
  );
};

export default DonateLayout;
