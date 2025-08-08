import { PoppinsHeadText, PoppinsText } from "@/src/components";
import {
  BORDER_RADIUS,
  GRADIENT_PRIMARY,
  HEIGHT,
  LINE_HEIGHT,
  SPACING,
} from "@/src/themes";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type WelcomeProps = {
  username: string;
  children?: ReactNode;
};

const Welcome = ({ username, children }: WelcomeProps) => {
  return (
    <View style={s.view}>
      <LinearGradient colors={GRADIENT_PRIMARY} style={s.container}>
        <View style={s.textContainer}>
          <PoppinsHeadText style={s.heading}>
            Welcome {username}!
          </PoppinsHeadText>
          <PoppinsText style={s.subheading}>
            Ready to make a difference today?
          </PoppinsText>
        </View>
        {children}
      </LinearGradient>
    </View>
  );
};

export default Welcome;

const s = StyleSheet.create({
  view: {
    overflow: "hidden",
    borderRadius: BORDER_RADIUS,
    boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
  },
  container: {
    paddingHorizontal: SPACING.cardHorizontal,
    paddingVertical: SPACING.cardVertical,
    paddingTop: SPACING.cardVertical - 10,
    flex: 1,
    gap: 25,
  },
  textContainer: {},
  heading: {
    color: "white",
    lineHeight: LINE_HEIGHT.heading,
  },
  subheading: {
    color: "white",
  },
  button: {
    height: HEIGHT.button,
  },
});
