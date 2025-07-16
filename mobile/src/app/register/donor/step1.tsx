import CustomPicker from "@/src/components/CategoryPicker";
import InputBox from "@/src/components/InputBox";
import PoppinsText from "@/src/components/PoppinsText";
import Button from "@/src/core/auth/components/Button";
import StepSkeleton from "@/src/core/auth/components/StepSkeleton";
import { useStep1DonorData } from "@/src/core/auth/hooks/donor/step1Context";
import { step1Schema } from "@/src/validation/donor/donorRegistration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Redirect, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { z } from "zod";

const categoryOptions = [
  { label: "Individual", value: "individual" },
  { label: "Restaurant", value: "restaurant" },
  { label: "Hotel", value: "hotel" },
  { label: "Catering", value: "catering" },
  { label: "Other", value: "other" },
];

type step1Type = z.infer<typeof step1Schema>;

export default function DonorRegistrationStep1() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<step1Type>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: "Sunshine",
      email: "sunshine@gmail.com",
      password: "securepassword",
      confirmPassword: "securepassword",
      phone: "securepassword",
      category: "other",
      role: "donor",
    },
  });

  const { setData } = useStep1DonorData();

  const onSubmit = (data: step1Type) => {
    setData(data);
    alert("Step1 completed successfully");
    router.push("/register/donor/step2");
  };
  return (
    <>
      <StepSkeleton totalSteps={3} currStep={1} heading="Tell us about you!">
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <InputBox label="Name" onChangeText={onChange} value={value} />
          )}
        />
        {errors.name && <PoppinsText>{errors.name.message}</PoppinsText>}
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <InputBox label="Email" onChangeText={onChange} value={value} />
          )}
        />
        {errors.email && <PoppinsText>{errors.email.message}</PoppinsText>}
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <InputBox label="Password" onChangeText={onChange} value={value} />
          )}
        />
        {errors.password && (
          <PoppinsText>{errors.password.message}</PoppinsText>
        )}
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <InputBox
              label="Confirm Password"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.confirmPassword && (
          <PoppinsText>{errors.confirmPassword.message}</PoppinsText>
        )}
        <Controller
          control={control}
          name="phone"
          render={({ field: { value, onChange } }) => (
            <InputBox
              label="Phone number"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.phone && <PoppinsText>{errors.phone.message}</PoppinsText>}
        <Controller
          control={control}
          name="category"
          render={({ field: { value, onChange } }) => (
            <CustomPicker
              label="Category"
              onValueChange={onChange}
              categoryOptions={categoryOptions}
              value={value}
            />
          )}
        />
        {errors.category && (
          <PoppinsText>{errors.category.message}</PoppinsText>
        )}

        <Button
          totalSteps={3}
          currStep={1}
          onPress={handleSubmit(onSubmit, (err) => console.log(err))}
        />
      </StepSkeleton>
    </>
  );
}

const s = StyleSheet.create({
  container: {
    gap: 20,
    flexGrow: 1,
  },
});
