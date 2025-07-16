import React from "react";
import { Text, StyleSheet } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { GRADIENT_PRIMARY } from "../themes";
import PoppinsText from "./PoppinsText";

type Props = {
  text: string;
  style?: object;
  colors?: string[];
};

export default function GradientText({ text, style }: Props) {
  return (
    <MaskedView
      maskElement={
        <PoppinsText style={[style, styles.maskText]}>{text}</PoppinsText>
      }
    >
      <LinearGradient colors={GRADIENT_PRIMARY}>
        <PoppinsText style={[style, styles.invisibleText]}>{text}</PoppinsText>
      </LinearGradient>
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  maskText: {
    backgroundColor: "transparent",
    textDecorationLine: "underline",
  },
  invisibleText: {
    opacity: 0,
  },
});
