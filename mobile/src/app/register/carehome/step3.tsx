import { InputBox, PoppinsText } from "@/src/components";
import { useAuth } from "@/src/core/auth/AuthProvider";
import StepButtons from "@/src/core/auth/components/RegisterButton";
import RegistrationStepSkeleton from "@/src/core/auth/components/StepSkeleton";
import { useStep3CarehomeData } from "@/src/core/auth/hooks/carehome/step3Context";
import { BORDER_RADIUS, COLORS } from "@/src/themes";
import { step3Schema } from "@/src/validation/register/carehome/carehomeRegistration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { z } from "zod";

type step3Type = z.infer<typeof step3Schema>;
const CarehomeRegistrationStep3 = () => {
  const { signIn } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<step3Type>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      noOfResidents: 22,
      preferredDeliveryTime: "8pm",
      dietaryRestrictions: "None",
    },
  });
  const { data: data3, setData: setData3 } = useStep3CarehomeData();

  const onSubmit = async (data: step3Type) => {
    setData3(data);
    router.push("/register/carehome/step4");
  };
  return (
    <RegistrationStepSkeleton
      totalSteps={4}
      currStep={3}
      heading="Food and Capacity Details"
    >
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox
              label="No. of residents (Approx.)"
              value={value.toString()}
              onChangeText={onChange}
              keyboardType="number-pad"
            />
          );
        }}
        name={"noOfResidents"}
      />
      {errors.noOfResidents && (
        <PoppinsText>{errors.noOfResidents.message}</PoppinsText>
      )}
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox
              label="Any dietary restrictions (Veg only, No spicy food, etc.)"
              value={value}
              onChangeText={onChange}
            />
          );
        }}
        name={"dietaryRestrictions"}
      />
      {errors.dietaryRestrictions && (
        <PoppinsText>{errors.dietaryRestrictions.message}</PoppinsText>
      )}
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox
              label="Perferred Food delivery time slots"
              value={value}
              onChangeText={onChange}
            />
          );
        }}
        name={"preferredDeliveryTime"}
      />
      {errors.preferredDeliveryTime && (
        <PoppinsText>{errors.preferredDeliveryTime.message}</PoppinsText>
      )}
      <StepButtons
        totalSteps={4}
        currStep={3}
        onPress={handleSubmit(onSubmit, (err) => alert(JSON.stringify(err)))}
      />
    </RegistrationStepSkeleton>
  );
};

export default CarehomeRegistrationStep3;

const s = StyleSheet.create({
  addBtn: {
    width: 75,
    height: 75,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gray,
  },
  plus: {
    color: "gray",
  },
  img: {
    height: 75,
    width: 75,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
  },
  imgView: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
});
