import { CustomSelect, InputBox, PoppinsText } from "@/src/components";
import { useAuth } from "@/src/core/auth/AuthProvider";
import StepButtons from "@/src/core/auth/components/RegisterButton";
import RegistrationStepSkeleton from "@/src/core/auth/components/StepSkeleton";
import { useStep3NgoData } from "@/src/core/auth/hooks/ngo/step3Context";
import { BORDER_RADIUS, COLORS } from "@/src/themes";
import { step3Schema } from "@/src/validation/register/ngo/ngoRegistration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { z } from "zod";

type step3Type = z.infer<typeof step3Schema>;
const NgoRegistrationStep3 = () => {
  const { signIn } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<step3Type>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      foodTypesAccepted: ["other"],
      servingCapacity: 50,
      preferredPickupTime: "8pm",
    },
  });

  const categoryOptions = [
    { label: "Vegetarian", value: "vegetarian" },
    { label: "Non-vegetarian", value: "non-vegetarian" },
    { label: "Vegan", value: "vegan" },
    { label: "Gluten-free", value: "gluten-free" },
    { label: "Other", value: "other" },
  ];

  const { data: data3, setData: setData3 } = useStep3NgoData();

  const onSubmit = async (data: step3Type) => {
    setData3(data);
    alert("Step 3 completed successfully");
    router.push("/register/ngo/step4");
  };
  return (
    <RegistrationStepSkeleton
      totalSteps={4}
      currStep={3}
      heading="Build trust and impact"
    >
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <CustomSelect
              label="Food types Accepted"
              onValueChange={onChange}
              value={value[0]}
              categoryOptions={categoryOptions}
            />
          );
        }}
        name={"foodTypesAccepted"}
      />
      {errors.foodTypesAccepted && (
        <PoppinsText>{errors.foodTypesAccepted.message}</PoppinsText>
      )}
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox
              label="Approx no of people you feed daily"
              value={value.toString()}
              onChangeText={onChange}
              keyboardType="number-pad"
            />
          );
        }}
        name={"servingCapacity"}
      />
      {errors.servingCapacity && (
        <PoppinsText>{errors.servingCapacity.message}</PoppinsText>
      )}
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox
              label="Best time for pickups"
              value={value}
              onChangeText={onChange}
            />
          );
        }}
        name={"preferredPickupTime"}
      />
      {errors.preferredPickupTime && (
        <PoppinsText>{errors.preferredPickupTime.message}</PoppinsText>
      )}
      <StepButtons
        totalSteps={4}
        currStep={3}
        onPress={handleSubmit(onSubmit, (err) => alert(JSON.stringify(err)))}
      />
    </RegistrationStepSkeleton>
  );
};

export default NgoRegistrationStep3;

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
