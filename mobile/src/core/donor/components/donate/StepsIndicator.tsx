import { PoppinsText } from "@/src/components";
import {
  FONT,
  FONT_SIZE,
  GRADIENT_PRIMARY,
  GRADIENT_SECONDARY,
  HEIGHT,
} from "@/src/themes";
import { LinearGradient } from "expo-linear-gradient";
import { Href } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

type DonationStepsIndicatorProps = {
  currStep: 1 | 2 | 3 | 4;
  stepTitle: [string, string, string, string];
  stepPaths: [Href, Href, Href, Href];
};

const DonationStepsIndicator = ({
  currStep,
  stepTitle,
}: DonationStepsIndicatorProps) => {
  return (
    <View style={s.container}>
      {Array.from({ length: 4 }).map((_, idx) => (
        <View style={{ gap: 10, alignItems: "center" }} key={idx}>
          <Pressable style={s.stepContainer}>
            <LinearGradient
              colors={
                idx + 1 === currStep ? GRADIENT_PRIMARY : GRADIENT_SECONDARY
              }
              style={s.step}
            >
              <PoppinsText
                style={[
                  s.stepNum,
                  { color: idx + 1 === currStep ? "white" : "black" },
                ]}
              >
                {idx + 1}
              </PoppinsText>
            </LinearGradient>
          </Pressable>
          <PoppinsText>{stepTitle[idx]}</PoppinsText>
        </View>
      ))}
    </View>
  );
};

export default DonationStepsIndicator;

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stepContainer: {
    height: HEIGHT.donorStep,
    width: HEIGHT.donorStep,
    borderRadius: 999999999999,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
  },
  step: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNum: {
    fontFamily: FONT.BOLD,
    fontSize: FONT_SIZE.large,
  },
});
