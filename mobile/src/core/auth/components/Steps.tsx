import PoppinsText from "@/src/components/PoppinsText";
import StepIndicator from "@/src/core/auth/components/StepIndicator";
import { StyleSheet, View } from "react-native";

type StepsProps = {
  totalSteps: number;
  currStep: number;
};
const Steps = ({ totalSteps, currStep }: StepsProps) => {
  return (
    <View style={s.view}>
      <View style={s.steps}>
        {Array.from({ length: totalSteps }).map((_, idx) => {
          if (idx + 1 === currStep) return <StepIndicator currStep key={idx} />;
          return <StepIndicator key={idx} />;
        })}
      </View>
      <View>
        <PoppinsText>
          Step {currStep} of {totalSteps}
        </PoppinsText>
      </View>
    </View>
  );
};

export default Steps;

const s = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  steps: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
});
