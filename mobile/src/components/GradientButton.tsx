import { LinearGradient } from "expo-linear-gradient";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import PoppinsText from "./PoppinsText";
import {
  BORDER_RADIUS,
  GRADIENT_PRIMARY,
  GRADIENT_SECONDARY,
  GRADIENT_SECONDARY_REVERSED,
  HEIGHT,
} from "../themes";
import * as Haptics from "expo-haptics";
import { ReactNode } from "react";

type GradientButtonProps = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  text: string;
  gradient: readonly [string, string];
  children?: ReactNode;
};
const GradientButton = ({
  text,
  onPress,
  style,
  gradient,
  children,
}: GradientButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [style, { opacity: pressed ? 0.8 : 1 }]}
      onPress={() => {
        Haptics.selectionAsync();
        onPress();
      }}
    >
      <LinearGradient
        colors={gradient}
        style={[
          s.gradient,
          {
            boxShadow: `${gradient === GRADIENT_SECONDARY || gradient === GRADIENT_SECONDARY_REVERSED ? "0px 4px 6px rgba(0,0,0,0.2)" : ""}`,
          },
          style,
        ]}
      >
        {children}
        <PoppinsText
          style={[
            s.text,
            {
              color: `${gradient === GRADIENT_PRIMARY ? "white" : "black"}`,
            },
          ]}
        >
          {text}
        </PoppinsText>
      </LinearGradient>
    </Pressable>
  );
};

export default GradientButton;

const s = StyleSheet.create({
  gradient: {
    borderRadius: BORDER_RADIUS,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
    height: HEIGHT.button,
    flex: 1,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
