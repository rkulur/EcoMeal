import { CustomSelect, InputBox, PoppinsText } from "@/src/components";
import SimpleAlertModal from "@/src/components/SimpleAlertModal";
import StepButtons from "@/src/core/auth/components/RegisterButton";
import RegistrationStepSkeleton from "@/src/core/auth/components/StepSkeleton";
import { useStep1DonorData } from "@/src/core/auth/hooks/donor/step1Context";
import { useAlertModal } from "@/src/hooks/AlertModalContext";
import { step1Schema } from "@/src/validation/register/donor/donorRegistration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { z } from "zod";

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
      phone: 8199293300,
      role: "donor",
    },
  });

  const { setData } = useStep1DonorData();

  const onSubmit = (data: step1Type) => {
    setData(data);
    router.push("/register/donor/step2");
  };

  return (
    <>
      <RegistrationStepSkeleton
        totalSteps={3}
        currStep={1}
        heading="Tell us about you!"
      >
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
              keyboardType="number-pad"
              label="Phone number"
              onChangeText={onChange}
              value={value.toString()}
            />
          )}
        />
        {errors.phone && <PoppinsText>{errors.phone.message}</PoppinsText>}
        <StepButtons
          totalSteps={3}
          currStep={1}
          onPress={handleSubmit(onSubmit, (err) => console.log(err))}
        />
      </RegistrationStepSkeleton>
    </>
  );
}

const s = StyleSheet.create({
  container: {
    gap: 20,
    flexGrow: 1,
  },
});
