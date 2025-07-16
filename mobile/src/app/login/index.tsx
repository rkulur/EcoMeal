import InputBox from "@/src/components/InputBox";
import PrimaryButton from "@/src/components/PrimaryGradient";
import { Link, RelativePathString } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import ecomealLogo from "../../assets/images/ecomeal_logo_v2.png";
import { BORDER_RADIUS, COLORS, FONT_SIZE, SPACING } from "@/src/themes";
import PoppinsText from "@/src/components/PoppinsText";
import Line from "@/src/components/Line";
import { FontAwesome5 } from "@expo/vector-icons";
import GradientText from "@/src/components/GradientText";
import { SafeAreaView } from "react-native-safe-area-context";
import PoppinsHeadText from "@/src/components/PoppinsHeadText";

const Login = () => {
  return (
    <SafeAreaView style={styles.view}>
      <View style={{ alignItems: "center" }}>
        <Image source={ecomealLogo} style={styles.logo} />
      </View>
      <View>
        <PoppinsHeadText style={styles.heading}>
          Welcome to EcoMeal
        </PoppinsHeadText>
        <PoppinsText style={styles.subheading}>
          A platform connecting donors, NGOs, carehomes and composters to make
          difference together
        </PoppinsText>
      </View>
      <InputBox
        label="Email"
        keyboardType="email-address"
        onChangeText={(text) => console.log(text)}
      />
      <InputBox
        label="Password"
        onChangeText={(text) => console.log(text)}
        keyboardType="visible-password"
      />
      <PrimaryButton
        text="Login"
        style={{
          padding: 16,
          alignItems: "center",
          borderRadius: BORDER_RADIUS,
        }}
      />
      <View style={styles.division}>
        <Line />
        <PoppinsText>or</PoppinsText>
        <Line />
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.googleLogin,
          { opacity: pressed ? 0.8 : 1 },
        ]}
      >
        <FontAwesome5 name="google" size={16} />
        <PoppinsText>Login with Google</PoppinsText>
      </Pressable>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
          justifyContent: "center",
        }}
      >
        <PoppinsText>Don't have an account?</PoppinsText>
        <Link
          href={"/register" as RelativePathString}
          style={{ fontFamily: "Poppins_700Bold" }}
        >
          <GradientText text="Register" />
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingLeft: SPACING.page,
    paddingRight: SPACING.page,
    paddingTop: SPACING.page / 1.5,
    fontFamily: "Poppins_400Regular",
    gap: 20,
  },
  logo: {
    height: 48,
    width: 48,
  },
  heading: {
    fontSize: FONT_SIZE.heading,
    textAlign: "center",
  },
  subheading: {
    fontSize: FONT_SIZE.subheading,
    textAlign: "center",
  },
  division: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
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
export default Login;
