import { PoppinsHeadText } from "@/src/components";
import PageHeader from "@/src/components/PageHeader";
import { HEIGHT, SPACING } from "@/src/themes";
import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from "../ProgressBar";
import DonationStepsIndicator from "./StepsIndicator";

type DonationStepSkeletonProps = {
  currStep: 1 | 2 | 3 | 4;
  children: ReactNode;
};
const DonationStepSkeleton = ({
  currStep,
  children,
}: DonationStepSkeletonProps) => {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <PageHeader />
      <ScrollView
        style={s.container}
        contentContainerStyle={{ paddingBottom: HEIGHT.tabBar + SPACING.page }}
      >
        <View style={{ gap: 10 }}>
          <PoppinsHeadText style={{ textAlign: "center" }}>
            Donate Food
          </PoppinsHeadText>
          <DonationStepsIndicator
            currStep={currStep}
            stepTitle={["Food Details", "Location", "Images", "Confirm"]}
          />
          <ProgressBar progress={25 * currStep} />
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DonationStepSkeleton;

const s = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.page,
    paddingTop: SPACING.page,
    height: "100%",
  },
});
