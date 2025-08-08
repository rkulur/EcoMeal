import PoppinsHeadText from "@/src/components/PoppinsHeadText";
import Header from "@/src/core/auth/components/Header";
import Steps from "@/src/core/auth/components/Steps";
import { FONT, SPACING } from "@/src/themes";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type RegistrationStepSkeletonProps = {
  totalSteps: number;
  currStep: number;
  heading: string;
  children: React.ReactNode;
};
const RegistrationStepSkeleton = ({
  totalSteps,
  currStep,
  heading,
  children,
}: RegistrationStepSkeletonProps) => {
  if (currStep > totalSteps)
    throw new Error(
      `currStep (${currStep}) cannot be greater than totalSteps (${totalSteps})`,
    );
  return (
    <SafeAreaView style={[s.view, { backgroundColor: "white" }]}>
      <Header />
      <Steps totalSteps={totalSteps} currStep={currStep} />
      <PoppinsHeadText
        style={{
          fontFamily: FONT.SEMI_BOLD,
          textAlign: "center",
        }}
      >
        {heading}
      </PoppinsHeadText>
      <ScrollView
        contentContainerStyle={s.container}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default RegistrationStepSkeleton;

const s = StyleSheet.create({
  view: {
    padding: SPACING.page,
    gap: 20,
    flex: 1,
  },
  container: {
    gap: 15,
    paddingBottom: 10,
  },
});
