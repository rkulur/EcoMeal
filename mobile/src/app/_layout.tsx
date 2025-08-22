import { Redirect, Stack } from "expo-router";
import { AuthProvider, useAuth } from "../core/auth/AuthProvider";
import * as SplashScreen from "expo-splash-screen";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { useEffect } from "react";
import { AxiosAuthInterceptor } from "../api/ApiInterceptor";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || error) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;
  return (
    <AuthProvider>
      <AxiosAuthInterceptor>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login/index" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="donor" options={{ headerShown: false }} />
          <Stack.Screen name="donor/(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="ngo" options={{ headerShown: false }} />
          <Stack.Screen name="ngo/(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="carehome" options={{ headerShown: false }} />
          <Stack.Screen
            name="carehome/(tabs)"
            options={{ headerShown: false }}
          />
        </Stack>
      </AxiosAuthInterceptor>
    </AuthProvider>
  );
}
