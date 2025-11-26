import { Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, View } from "react-native";
import {
  BORDER_RADIUS,
  COLORS,
  FONT,
  FONT_SIZE,
  GRADIENT_PRIMARY,
  GRADIENT_SECONDARY,
  HEIGHT,
  LINE_HEIGHT,
  SPACING,
} from "../themes";
import GradientButton from "./GradientButton";
import GradientText from "./GradientText";
import PoppinsText from "./PoppinsText";
import { useAlertModal } from "../hooks/AlertModalContext";

const SimpleAlertModal = () => {
  const { isVisible, setIsVisible, heading, message } = useAlertModal();
  if (!isVisible) return null;
  return (
    <BlurView
      style={[s.container, { display: !isVisible ? "none" : "flex" }]}
      intensity={10}
      tint="default"
      experimentalBlurMethod="dimezisBlurView"
    >
      <LinearGradient colors={GRADIENT_SECONDARY} style={s.modal}>
        <GradientText
          style={{
            fontSize: FONT_SIZE.xlarge,
            fontFamily: FONT.BOLD,
            lineHeight: LINE_HEIGHT.heading,
          }}
          text={heading}
        />
        <PoppinsText style={{ textAlign: "center" }}>{message}</PoppinsText>
        <View style={{ height: HEIGHT.button, width: "100%" }}>
          <GradientButton
            onPress={() => setIsVisible(false)}
            text={"Got it"}
            style={{ flex: 1 }}
            gradient={GRADIENT_PRIMARY}
          ></GradientButton>
        </View>
        <Pressable style={s.cancelSymbol} onPress={() => setIsVisible(false)}>
          <Entypo name="cross" size={25} color={COLORS.outlineGray} />
        </Pressable>
      </LinearGradient>
    </BlurView>
  );
};

export default SimpleAlertModal;

const s = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    borderRadius: BORDER_RADIUS,
    width: "85%",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.3)",
    paddingHorizontal: SPACING.cardHorizontal,
    paddingVertical: SPACING.cardVertical,
    backgroundColor: "white",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.outlineGray,
  },
  cancelSymbol: {
    position: "absolute",
    right: "2%",
    top: "5%",
  },
});
