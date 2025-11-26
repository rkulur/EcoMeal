import { ImageInput, InputBox, PoppinsText } from "@/src/components";
import SimpleAlertModal from "@/src/components/SimpleAlertModal";
import { registerDonor } from "@/src/core/auth/api/register";
import { useAuth } from "@/src/core/auth/AuthProvider";
import StepButtons from "@/src/core/auth/components/RegisterButton";
import RegistrationStepSkeleton from "@/src/core/auth/components/StepSkeleton";
import { useStep1DonorData } from "@/src/core/auth/hooks/donor/step1Context";
import { useStep2DonorData } from "@/src/core/auth/hooks/donor/step2Context";
import { useStep3DonorData } from "@/src/core/auth/hooks/donor/step3Context";
import { Role } from "@/src/core/auth/types";
import { useAlertModal } from "@/src/hooks/AlertModalContext";
import { BORDER_RADIUS, COLORS } from "@/src/themes";
import { uploadImgToCloud } from "@/src/utils/supabase";
import {
  DonorRegistrationType,
  step3Schema,
} from "@/src/validation/register/donor/donorRegistration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { z } from "zod";

type step3Type = z.infer<typeof step3Schema>;
const DonorRegistrationStep3 = () => {
  const { signIn } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<step3Type>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      profilePicture: "",
    },
  });

  const { data: data1 } = useStep1DonorData();
  const { data: data2 } = useStep2DonorData();
  const { data: data3, setData: setData3 } = useStep3DonorData();

  const { isVisible, setIsVisible, showModal } = useAlertModal();
  const [regData, setRegData] = useState<{ token: string; role: Role } | null>(
    null,
  );

  const onSubmit = async (data: step3Type) => {
    setData3(data);
    let url;
    if (data.profilePicture) {
      url = await uploadImgToCloud({
        bucket: "ecomeal",
        resizedURI: data.profilePicture,
        folder: "profilePicture",
      });
    }

    const donorData = {
      ...data1,
      ...data2,
      ...data3,
      profilePicture: url ?? "",
    } as DonorRegistrationType;

    const res = await registerDonor(donorData);
    if (!res.ok) {
      alert(res.error.message);
      console.log(res.error.stack);
      return;
    }
    const { token, role } = res.data;
    setRegData({ token, role });
    showModal(
      "Registration successfull",
      "Your registration is complete! You can now start contributing to reducing food waste through Ecomeal.",
    );
  };

  useEffect(() => {
    if (regData && !isVisible) {
      signIn(regData.token, regData.role);
    }
  }, [regData, isVisible]);
  return (
    <>
      <RegistrationStepSkeleton
        totalSteps={3}
        currStep={3}
        heading="Build trust and impact"
      >
        <Controller
          control={control}
          render={function ({ field: { value, onChange } }) {
            return (
              <View style={{ display: "flex", gap: 8 }}>
                <PoppinsText>Add Profile Picture</PoppinsText>
                <ImageInput value={value} onChange={onChange} />
              </View>
            );
          }}
          name={"profilePicture"}
        />
        {errors.profilePicture && (
          <PoppinsText>{errors.profilePicture.message}</PoppinsText>
        )}
        <StepButtons
          totalSteps={3}
          currStep={3}
          onPress={handleSubmit(onSubmit, (err) => alert(JSON.stringify(err)))}
        />
      </RegistrationStepSkeleton>
    </>
  );
};

export default DonorRegistrationStep3;

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
