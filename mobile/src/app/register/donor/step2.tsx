import InputBox from "@/src/components/InputBox";
import PoppinsText from "@/src/components/PoppinsText";
import Button from "@/src/core/auth/components/Button";
import StepSkeleton from "@/src/core/auth/components/StepSkeleton";
import { useStep2DonorData } from "@/src/core/auth/hooks/donor/step2Context";
import { step2Schema } from "@/src/validation/donor/donorRegistration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { z } from "zod";

type step2Type = z.infer<typeof step2Schema>;
const DonorRegistrationStep2 = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<step2Type>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      location: {
        state: "Karnataka",
        district: "Dakshina Kannada",
        city: "Mangalore",
        pincode: "575000",
      },
    },
  });

  const { data, setData } = useStep2DonorData();
  const router = useRouter();

  const onSubmit = (data: step2Type) => {
    setData(data);
    alert("Step 2 completed");
    router.push("/register/donor/step3");
  };
  return (
    <StepSkeleton totalSteps={3} currStep={2} heading="Where can we find you?">
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox label={"State"} value={value} onChangeText={onChange} />
          );
        }}
        name={"location.state"}
      />
      {errors.location?.state && (
        <PoppinsText>{errors.location?.state.message}</PoppinsText>
      )}
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox
              label={"District"}
              value={value}
              onChangeText={onChange}
            />
          );
        }}
        name={"location.district"}
      />
      {errors.location?.district && (
        <PoppinsText>{errors.location?.district.message}</PoppinsText>
      )}
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox label={"City"} value={value} onChangeText={onChange} />
          );
        }}
        name={"location.city"}
      />
      {errors.location?.city && (
        <PoppinsText>{errors.location?.city.message}</PoppinsText>
      )}
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox
              label={"Pincode"}
              value={value}
              onChangeText={onChange}
              keyboardType="name-phone-pad"
            />
          );
        }}
        name={"location.pincode"}
      />
      {errors.location?.pincode && (
        <PoppinsText>{errors.location?.pincode.message}</PoppinsText>
      )}
      <Button
        totalSteps={3}
        currStep={2}
        onPress={handleSubmit(onSubmit, (err) => alert(JSON.stringify(err)))}
      />
    </StepSkeleton>
  );
};

export default DonorRegistrationStep2;

const styles = StyleSheet.create({});
