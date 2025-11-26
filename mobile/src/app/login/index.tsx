import GradientText from "@/src/components/GradientText";
import InputBox from "@/src/components/InputBox";
import Line from "@/src/components/Line";
import PoppinsHeadText from "@/src/components/PoppinsHeadText";
import PoppinsText from "@/src/components/PoppinsText";
import PrimaryButton from "@/src/components/PrimaryGradient";
import { useAuth } from "@/src/core/auth/AuthProvider";
import login from "@/src/core/auth/api/login";
import { useAlertModal } from "@/src/hooks/AlertModalContext";
import { BORDER_RADIUS, COLORS, FONT, FONT_SIZE, SPACING } from "@/src/themes";
import { loginSchema, loginType } from "@/src/validation/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, RelativePathString } from "expo-router";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import ecomealLogo from "../../assets/images/ecomeal_logo_v2.png";
import SimpleAlertModal from "@/src/components/SimpleAlertModal";
import { useForm, Controller } from "react-hook-form";

const Login = () => {
  const { control, handleSubmit } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "carehome@gmail.com",
      password: "securepassword",
    },
  });
  const { signIn } = useAuth();
  const { showModal } = useAlertModal();
  const onSumbit = async (submitData: loginType) => {
    const res = await login(submitData);
    if (!res.ok) {
      showModal(
        "Ooops!",
        res.error.message ?? "Something went wrong! Please try again",
      );
      console.log(res.error);
      return;
    }
    const { token, role } = res.data;
    signIn(token, role);
  };

  return (
    <>
      <SafeAreaView style={[styles.view]}>
        <View>
          <View style={{ alignItems: "center" }}>
            <Image source={ecomealLogo} style={styles.logo} />
          </View>
          <View>
            <PoppinsHeadText style={styles.heading}>
              Welcome to EcoMeal
            </PoppinsHeadText>
            <PoppinsText style={styles.subheading}>
              A platform connecting donors, NGOs, carehomes and composters to
              make difference together
            </PoppinsText>
          </View>
        </View>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <InputBox
              label="Email"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <InputBox
              label="Password"
              onChangeText={onChange}
              keyboardType="visible-password"
              value={value}
            />
          )}
        />
        <PrimaryButton
          text="Login"
          style={{
            padding: 16,
            alignItems: "center",
            borderRadius: BORDER_RADIUS,
          }}
          onPress={handleSubmit(onSumbit, (err) => console.log(err))}
        />
        <View style={styles.division}>
          <Line />
          <PoppinsText>or</PoppinsText>
          <Line />
        </View>
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
            style={{ fontFamily: FONT.BOLD }}
          >
            <GradientText
              text="Register"
              style={{ textDecorationLine: "underline" }}
            />
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
    height: "100%",
    paddingLeft: SPACING.page,
    paddingRight: SPACING.page,
    paddingTop: SPACING.page * 2,
    fontFamily: FONT.REGULAR,
    gap: 20,
  },
  logo: {
    height: 70,
    width: 70,
  },
  heading: {
    fontSize: FONT_SIZE.xxlarge,
    textAlign: "center",
  },
  subheading: {
    fontSize: FONT_SIZE.medium,
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
