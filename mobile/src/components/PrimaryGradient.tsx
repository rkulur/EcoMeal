import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ViewProps } from "react-native";
import { GRADIENT_PRIMARY } from "../themes";
import PoppinsText from "./PoppinsText";

type PrimaryGradientProps = { text: string; onPress: () => void } & ViewProps;

const PrimaryButton = ({ text, style, onPress }: PrimaryGradientProps) => {
  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
      onPress={onPress}
    >
      <LinearGradient colors={GRADIENT_PRIMARY} style={[style]}>
        <PoppinsText style={{ color: "#fff" }}>{text}</PoppinsText>
      </LinearGradient>
    </Pressable>
  );
};

export default PrimaryButton;
