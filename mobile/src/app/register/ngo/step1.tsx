import { InputBox, PoppinsText } from "@/src/components";
import StepButtons from "@/src/core/auth/components/RegisterButton";
import RegistrationStepSkeleton from "@/src/core/auth/components/StepSkeleton";
import { useStep1NgoData } from "@/src/core/auth/hooks/ngo/step1Context";
import { step1Schema } from "@/src/validation/register/ngo/ngoRegistration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { z } from "zod";

type step1Type = z.infer<typeof step1Schema>;

export default function NgoRegistrationStep1() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<step1Type>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: "Orpanhelp",
      email: "orpanhelp@gmail.com",
      password: "securepassword",
      confirmPassword: "securepassword",
      phone: 9938884992,
      role: "ngo",
    },
  });

  const { setData } = useStep1NgoData();

  const onSubmit = (data: step1Type) => {
    setData(data);
    router.push("/register/ngo/step2");
  };
  return (
    <>
      <RegistrationStepSkeleton
        totalSteps={4}
        currStep={1}
        heading="Tell us about your mission!"
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
