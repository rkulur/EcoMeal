import { GRADIENT_PRIMARY, GRADIENT_SECONDARY, HEIGHT } from "@/src/themes";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

type ProgressBarProps = {
  progress: number;
};
const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <View style={s.container}>
      <LinearGradient colors={GRADIENT_SECONDARY} style={s.track}>
        <LinearGradient
          colors={GRADIENT_PRIMARY}
          style={{ height: HEIGHT.progressBar, width: `${progress}%` }}
        />
      </LinearGradient>
    </View>
  );
};

export default ProgressBar;

const s = StyleSheet.create({
  container: {
    borderRadius: 99999,
    overflow: "hidden",
    height: HEIGHT.progressBar,
  },
  track: {},
  progress: {},
});
