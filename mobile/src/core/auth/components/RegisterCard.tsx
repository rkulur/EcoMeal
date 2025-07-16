import GradientText from "@/src/components/GradientText";
import PoppinsText from "@/src/components/PoppinsText";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZE,
  GRADIENT_SECONDARY,
} from "@/src/themes";
import { LinearGradient } from "expo-linear-gradient";
import { Link, RelativePathString } from "expo-router";
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
      <Link href={href} style={s.registerBtn}>
        <GradientText text={`Register as ${heading}`} />
      </Link>
    </LinearGradient>
  );
};

export default RegisterCard;

const s = StyleSheet.create({
  container: {
    height: 205,
    borderRadius: BORDER_RADIUS,
    padding: 16,
    gap: 4,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
  },
  heading: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
  },
  registerBtn: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: "white",
    padding: 8,
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
});
