import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";
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
    <LinearGradient
      colors={isCurrStep ? GRADIENT_PRIMARY : GRADIENT_SECONDARY}
      style={styles.container}
    >
      {/* Top */}
      <LinearGradient
        colors={[color, "transparent"]}
        style={styles.shadowTop}
      />

      {/* Bottom */}
      <LinearGradient
        colors={["transparent", color]}
        style={styles.shadowBottom}
      />

      {/* Left */}
      <LinearGradient
        colors={[color, "transparent"]}
        style={styles.shadowLeft}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />

      {/* Right */}
      <LinearGradient
        colors={["transparent", color]}
        style={styles.shadowRight}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </LinearGradient>
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
