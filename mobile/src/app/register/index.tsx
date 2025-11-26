import PoppinsHeadText from "@/src/components/PoppinsHeadText";
import RegisterCard from "@/src/core/auth/components/RegisterCard";
import { SPACING } from "@/src/themes";
import { RelativePathString } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  return (
    <SafeAreaView style={[s.view, { backgroundColor: "white" }]}>
      <PoppinsHeadText style={{ textAlign: "center" }}>
        Register as a?
      </PoppinsHeadText>
      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        <RegisterCard
          heading="Donor"
          subheading="Support causes you care about and track your impact"
          points={["Make donations", "Track your donation history"]}
          href={"/register/donor/step1" as RelativePathString}
        />
        <RegisterCard
          heading="NGO"
          subheading="Connect with donors and expand your reach"
          points={["Connect with regular donors", "Share impact Stories"]}
          href={"/register/ngo/step1" as RelativePathString}
        />
        <RegisterCard
          heading="Care Home"
          subheading="Care for seniors with reliable support."
          points={["Receive surplus meals", "Track donations"]}
          href={"/register/carehome/step1" as RelativePathString}
        />
        <RegisterCard
          heading="Composter"
          subheading="Turn surplus food into compost sustainably."
          points={["Collect expired food", "Track your impact"]}
          href={"/register/composter/step1" as RelativePathString}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const s = StyleSheet.create({
  view: {
    padding: SPACING.page,
  },
  scroll: {
    padding: 12,
    gap: 36,
  },
});
