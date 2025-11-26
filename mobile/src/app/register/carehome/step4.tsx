import { ImageInput, InputBox, PoppinsText } from "@/src/components";
import SimpleAlertModal from "@/src/components/SimpleAlertModal";
import { registerCarehome } from "@/src/core/auth/api/register";
import { useAuth } from "@/src/core/auth/AuthProvider";
import StepButtons from "@/src/core/auth/components/RegisterButton";
import RegistrationStepSkeleton from "@/src/core/auth/components/StepSkeleton";
import {
  useStep1CarehomeData,
  useStep2CarehomeData,
  useStep3CarehomeData,
  useStep4CarehomeData,
} from "@/src/core/auth/hooks/carehome";
import { Role } from "@/src/core/auth/types";
import { useAlertModal } from "@/src/hooks/AlertModalContext";
import { BORDER_RADIUS, COLORS } from "@/src/themes";
import { uploadImgToCloud } from "@/src/utils/supabase";
import {
  CarehomeRegistrationType,
  step4Schema,
} from "@/src/validation/register/carehome/carehomeRegistration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { z } from "zod";

type step4Type = z.infer<typeof step4Schema>;
const CarehomeRegistrationstep4 = () => {
  const { signIn } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<step4Type>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      profilePicture: "",
    },
  });

  const { isVisible, showModal } = useAlertModal();
  const [regData, setRegData] = useState<{ token: string; role: Role } | null>(
    null,
  );

  const { data: data1 } = useStep1CarehomeData();
  const { data: data2 } = useStep2CarehomeData();
  const { data: data3 } = useStep3CarehomeData();
  const { data: data4, setData: setData4 } = useStep4CarehomeData();

  const onSubmit = async (data: step4Type) => {
    setData4(data);
    let url;
    if (data.profilePicture) {
      url = await uploadImgToCloud({
        bucket: "ecomeal",
        resizedURI: data.profilePicture!,
        folder: "profilePicture",
      });
    }

    const carehomeData = {
      ...data1,
      ...data2,
      ...data3,
      ...data4,
      profilePicture: url ?? "",
    } as CarehomeRegistrationType;

    const res = await registerCarehome(carehomeData);
    if (!res.ok) {
      if (isAxiosError(res.error)) {
        showModal("Something went wrong!", res.message);
      }
      showModal("Something went wrong!", res.message);
      return;
    }
    const { token, role } = res.data;
    setRegData({ token, role });
    showModal(
      "Registration Successful",
      "Your Care Home has been successfully registered. You can now log in to start receiving donations and managing requests!",
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
        totalSteps={4}
        currStep={4}
        heading="Verify and Finalize"
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

export default CarehomeRegistrationstep4;

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
