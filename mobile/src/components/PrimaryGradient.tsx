import { LinearGradient } from "expo-linear-gradient";
import {
  Button,
  Pressable,
  Text,
  TouchableOpacity,
  ViewProps,
} from "react-native";
import { GRADIENT_PRIMARY } from "../themes";
import PoppinsText from "./PoppinsText";

type PrimaryGradientProps = { text: string } & ViewProps;

const PrimaryButton = ({ text, style }: PrimaryGradientProps) => {
  return (
    <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
      <LinearGradient colors={GRADIENT_PRIMARY} style={[style]}>
        <PoppinsText style={{ color: "#fff" }}>{text}</PoppinsText>
      </LinearGradient>
    </Pressable>
  );
};

export default PrimaryButton;
