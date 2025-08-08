import PoppinsText from "@/src/components/PoppinsText";
import { BORDER_RADIUS, COLORS, GRADIENT_PRIMARY } from "@/src/themes";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

type StepButtonProps = {
  totalSteps: number;
  currStep: number;
  onPress: (e: GestureResponderEvent) => void;
};
const StepButtons = ({ totalSteps, currStep, onPress }: StepButtonProps) => {
  const router = useRouter();
  if (currStep === 1) {
    return (
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.8 : 1,
            transform: [
              { scaleX: pressed ? 0.95 : 1 },
              { scaleY: pressed ? 0.95 : 1 },
            ],
          },
          s.next,
        ]}
        onPress={onPress}
      >
        <LinearGradient colors={GRADIENT_PRIMARY} style={s.nextGradient}>
          <PoppinsText style={s.text}>Next</PoppinsText>
        </LinearGradient>
      </Pressable>
    );
  }

  if (currStep === totalSteps) {
    return (
      <View style={s.container}>
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.8 : 1,
              transform: [
                { scaleX: pressed ? 0.95 : 1 },
                { scaleY: pressed ? 0.95 : 1 },
              ],
            },
            s.googleLogin,
          ]}
          onPress={() => router.back()}
        >
          <PoppinsText>Go back</PoppinsText>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.8 : 1,
              transform: [
                { scaleX: pressed ? 0.95 : 1 },
                { scaleY: pressed ? 0.95 : 1 },
              ],
            },
            s.googleLogin,
            s.submit,
          ]}
          onPress={onPress}
        >
          <LinearGradient colors={GRADIENT_PRIMARY} style={s.submitGradient}>
            <PoppinsText style={s.text}>Submit</PoppinsText>
          </LinearGradient>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <Pressable
        style={({ pressed }) => [s.googleLogin, { opacity: pressed ? 0.8 : 1 }]}
        onPress={() => router.back()}
      >
        <PoppinsText>Go back</PoppinsText>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          s.googleLogin,
          { opacity: pressed ? 0.8 : 1 },
          s.submit,
        ]}
        onPress={onPress}
      >
        <LinearGradient colors={GRADIENT_PRIMARY} style={s.submitGradient}>
          <PoppinsText style={s.text}>Next</PoppinsText>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default StepButtons;

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  googleLogin: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
    flex: 1,
  },
  next: {
    height: 50,
    borderRadius: BORDER_RADIUS,
  },
  nextGradient: {
    height: 50,
    display: "flex",
    justifyContent: "center",
    borderRadius: BORDER_RADIUS,
  },
  submit: {
    height: 50,
    borderRadius: BORDER_RADIUS,
    display: "flex",
    flex: 1.5,
  },
  submitGradient: {
    height: 50,
    display: "flex",
    justifyContent: "center",
    flex: 1,
    borderRadius: BORDER_RADIUS,
  },
});
