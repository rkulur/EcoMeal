import GradientButton from "@/src/components/GradientButton";
import GradientText from "@/src/components/GradientText";
import PoppinsText from "@/src/components/PoppinsText";
import {
  BORDER_RADIUS,
  FONT,
  GRADIENT_PRIMARY,
  GRADIENT_SECONDARY,
  HEIGHT,
} from "@/src/themes";
import { LinearGradient } from "expo-linear-gradient";
import { Link, RelativePathString, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

type RegisterCardProps = {
  heading: string;
  subheading: string;
  points: string[];
  href: RelativePathString;
};

const RegisterCard = ({
  heading,
  subheading,
  points,
  href,
}: RegisterCardProps) => {
  const router = useRouter();
  return (
    <LinearGradient colors={GRADIENT_SECONDARY} style={s.container}>
      <Text style={s.heading}>{heading}</Text>
      <View>
        <PoppinsText>{subheading}</PoppinsText>
        {points &&
          points.map((point, idx) => (
            <PoppinsText key={idx}>
              {"\u2022"} {point}
            </PoppinsText>
          ))}
      </View>
      <GradientButton
        gradient={GRADIENT_PRIMARY}
        text={`Register as a ${heading}`}
        onPress={() => router.navigate(href)}
        style={s.registerBtn}
      />
    </LinearGradient>
  );
};

export default RegisterCard;

const s = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    gap: 4,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    padding: 20,
    paddingBottom: 25,
  },
  heading: {
    fontFamily: FONT.SEMI_BOLD,
    fontSize: 22,
  },
  registerBtn: {
    height: HEIGHT.button,
  },
});
