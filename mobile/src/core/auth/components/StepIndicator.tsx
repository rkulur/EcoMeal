import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  BORDER_RADIUS,
  COLORS,
  GRADIENT_PRIMARY,
  GRADIENT_SECONDARY,
} from "../../../themes";

type StepIndicatorProps = {
  currStep?: boolean;
};
export default function StepIndicator({
  currStep: isCurrStep = false,
}: StepIndicatorProps) {
  const color = "rgba(0,0,0,0.05)";
  return (
    <Pressable>
      <LinearGradient
        colors={isCurrStep ? GRADIENT_PRIMARY : GRADIENT_SECONDARY}
        style={styles.container}
      >
        <LinearGradient
          colors={[color, "transparent"]}
          style={styles.shadowTop}
        />
        <LinearGradient
          colors={["transparent", color]}
          style={styles.shadowBottom}
        />
        <LinearGradient
          colors={[color, "transparent"]}
          style={styles.shadowLeft}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <LinearGradient
          colors={["transparent", color]}
          style={styles.shadowRight}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </LinearGradient>
    </Pressable>
  );
}

const height = 3;

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
    borderRadius: BORDER_RADIUS / 2,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  shadowTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height,
  },
  shadowBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height,
  },
  shadowLeft: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: height,
  },
  shadowRight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: height,
  },
});
