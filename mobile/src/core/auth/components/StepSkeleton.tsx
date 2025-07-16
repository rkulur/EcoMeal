import PoppinsHeadText from "@/src/components/PoppinsHeadText";
import Header from "@/src/core/auth/components/Header";
import Steps from "@/src/core/auth/components/Steps";
import { SPACING } from "@/src/themes";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type StepSkeletonProps = {
  totalSteps: number;
  currStep: number;
  heading: string;
  children: React.ReactNode;
};
const StepSkeleton = ({
  totalSteps,
  currStep,
  heading,
  children,
}: StepSkeletonProps) => {
  if (currStep > totalSteps)
    throw new Error(
      `currStep (${currStep}) cannot be greater than totalSteps (${totalSteps})`,
    );
  return (
    <SafeAreaView style={s.view}>
      <Header />
      <Steps totalSteps={totalSteps} currStep={currStep} />
      <PoppinsHeadText
        style={{
          fontFamily: "Poppins_600SemiBold",
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
    </SafeAreaView>
  );
};

export default StepSkeleton;

const s = StyleSheet.create({
  view: {
    padding: SPACING.page,
    gap: 25,
    flex: 1,
  },
  container: {
    gap: 20,
    flexGrow: 1,
    paddingBottom: 10,
  },
});
