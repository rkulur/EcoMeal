import { InputBox, PoppinsText } from "@/src/components";
import { registerComposter } from "@/src/core/auth/api/register";
import { useAuth } from "@/src/core/auth/AuthProvider";
import StepButtons from "@/src/core/auth/components/RegisterButton";
import RegistrationStepSkeleton from "@/src/core/auth/components/StepSkeleton";
import { useStep1ComposterData } from "@/src/core/auth/hooks/composter/step1Context";
import { useStep2ComposterData } from "@/src/core/auth/hooks/composter/step2Context";
import { useStep3ComposterData } from "@/src/core/auth/hooks/composter/step3Context";
import {
  ComposterRegistrationType,
  step3Schema,
} from "@/src/validation/register/composter/composterRegistration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type step3Type = z.infer<typeof step3Schema>;
const ComposterRegistrationStep3 = () => {
  const { signIn } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<step3Type>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      capacityKgPerDay: "10",
      acceptedFoodTypes: "All types",
    },
  });

  const { data: data1 } = useStep1ComposterData();
  const { data: data2 } = useStep2ComposterData();
  const { data: data3, setData: setData3 } = useStep3ComposterData();
  const router = useRouter();

  const onSubmit = async (data: step3Type) => {
    setData3(data);
    const composterData = {
      ...data1,
      ...data2,
      ...data3,
    } as ComposterRegistrationType;

    const res = await registerComposter(composterData);
    if (!res.ok) {
      alert(res.error.message);
      console.log(res.error.stack);
      return;
    }

    alert("Registration Successfull");

    const { token, role } = res.data;
    signIn(token, role);
  };
  return (
    <RegistrationStepSkeleton
      totalSteps={3}
      currStep={3}
      heading="More details"
    >
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox
              label={"Capacity of food you can handle (In kgs)"}
              value={value}
              onChangeText={onChange}
            />
          );
        }}
        name={"capacityKgPerDay"}
      />
      {errors.capacityKgPerDay && (
        <PoppinsText>{errors.capacityKgPerDay.message}</PoppinsText>
      )}
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox
              label={"Food types accepted"}
              value={value}
              onChangeText={onChange}
              keyboardType="number-pad"
            />
          );
        }}
        name={"acceptedFoodTypes"}
      />
      {errors.acceptedFoodTypes && (
        <PoppinsText>{errors.acceptedFoodTypes.message}</PoppinsText>
      )}
      <StepButtons
        totalSteps={3}
        currStep={3}
        onPress={handleSubmit(onSubmit, (err) => alert(JSON.stringify(err)))}
      />
    </RegistrationStepSkeleton>
  );
};

export default ComposterRegistrationStep3;
