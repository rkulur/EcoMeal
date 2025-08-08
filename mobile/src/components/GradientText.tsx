import React from "react";
import { Text, StyleSheet } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { GRADIENT_PRIMARY, GRADIENT_SECONDARY } from "../themes";
import PoppinsText from "./PoppinsText";

type Props = {
  text: string;
  style?: object;
  gradient?: "primary" | "secondary";
};

export default function GradientText({
  text,
  style,
  gradient = "primary",
}: Props) {
  return (
    <MaskedView
      maskElement={
        <PoppinsText style={[style, styles.maskText]}>{text}</PoppinsText>
      }
    >
      <LinearGradient
        colors={gradient === "primary" ? GRADIENT_PRIMARY : GRADIENT_SECONDARY}
        style={styles.lg}
      >
        <PoppinsText style={[style, styles.invisibleText]}>{text}</PoppinsText>
      </LinearGradient>
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  maskText: {
    backgroundColor: "transparent",
  },
  invisibleText: {
    opacity: 0,
  },
  lg: {},
});
