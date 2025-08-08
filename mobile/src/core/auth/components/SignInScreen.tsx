import { PoppinsText } from "@/src/components";
import { BORDER_RADIUS, COLORS } from "@/src/themes";
import { FontAwesome5 } from "@expo/vector-icons";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

const SignInScreen = () => {
  const clientId = process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID;
  if (!clientId) {
    throw Error("Client ID is neccessary for Google authentication");
  }
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ["email", "profile"],
      redirectUri: makeRedirectUri({
        scheme: "ecomeal",
        path: "register",
      }),
    },
    discovery,
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      console.log(code);
    }
  }, [response]);
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          styles.googleLogin,
          { opacity: pressed ? 0.8 : 1 },
        ]}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <FontAwesome5 name="google" size={16} />
        <PoppinsText>Login with Google</PoppinsText>
      </Pressable>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  googleLogin: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    padding: 13,
    borderRadius: BORDER_RADIUS,
    boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
});
