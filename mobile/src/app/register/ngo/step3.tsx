import { api } from "@/src/api/axios";
import CategoryPicker from "@/src/components/CategoryPicker";
import ImageInput from "@/src/components/ImageInput";
import InputBox from "@/src/components/InputBox";
import PoppinsText from "@/src/components/PoppinsText";
import { useAuth } from "@/src/core/auth/AuthProvider";
import Button from "@/src/core/auth/components/Button";
import StepSkeleton from "@/src/core/auth/components/StepSkeleton";
import { useStep1NgoData } from "@/src/core/auth/hooks/ngo/step1Context";
import { useStep2NgoData } from "@/src/core/auth/hooks/ngo/step2Context";
import { useStep3NgoData } from "@/src/core/auth/hooks/ngo/step3Context";
import { BORDER_RADIUS, COLORS } from "@/src/themes";
import { uploadImgToCloud } from "@/src/utils/supabase";
import { step3Schema } from "@/src/validation/ngo/ngoRegistration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
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
      nextPickupTime: "8pm",
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
    <StepSkeleton totalSteps={4} currStep={3} heading="Build trust and impact">
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <CategoryPicker
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
      <Button
        totalSteps={3}
        currStep={3}
        onPress={handleSubmit(onSubmit, (err) => alert(JSON.stringify(err)))}
      />
    </StepSkeleton>
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
