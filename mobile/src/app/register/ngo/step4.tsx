import { InputBox, PoppinsText, ImageInput } from "@/src/components";
import { api } from "@/src/api/axios";
import { useAuth } from "@/src/core/auth/AuthProvider";
import StepButtons from "@/src/core/auth/components/RegisterButton";
import RegistrationStepSkeleton from "@/src/core/auth/components/StepSkeleton";
import {
  useStep1NgoData,
  useStep2NgoData,
  useStep3NgoData,
  useStep4NgoData,
} from "@/src/core/auth/hooks/ngo";
import { BORDER_RADIUS, COLORS } from "@/src/themes";
import { uploadImgToCloud } from "@/src/utils/supabase";
import {
  NgoRegistrationType,
  step4Schema,
} from "@/src/validation/register/ngo/ngoRegistration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { z } from "zod";
import { registerNgo } from "@/src/core/auth/api/register";
import SimpleAlertModal from "@/src/components/SimpleAlertModal";
import { useAlertModal } from "@/src/hooks/AlertModalContext";
import { useEffect, useState } from "react";
import { Role } from "@/src/core/auth/types";

type step4Type = z.infer<typeof step4Schema>;
const NgoRegistrationstep4 = () => {
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

  const { data: data1 } = useStep1NgoData();
  const { data: data2 } = useStep2NgoData();
  const { data: data3 } = useStep3NgoData();
  const { data: data4, setData: setData4 } = useStep4NgoData();

  const { isVisible, showModal } = useAlertModal();
  const [regData, setRegData] = useState<{ token: string; role: Role } | null>(
    null,
  );

  const onSubmit = async (data: step4Type) => {
    setData4(data);
    let url;
    if (data.profilePicture) {
      url = await uploadImgToCloud({
        bucket: "ecomeal",
        resizedURI: data.profilePicture,
        folder: "profilePicture",
      });
    }
    const ngoData = {
      ...data1,
      ...data2,
      ...data3,
      ...data4,
      profilePicture: url ?? "",
    } as NgoRegistrationType;
    const res = await registerNgo(ngoData);
    if (!res.ok) {
      showModal("Something went wrong!", res.message);
      console.log(res.error.stack);
      return;
    }
    const { token, role } = res.data;
    setRegData({ token, role });
    showModal(
      "Registration Successfull",
      "Your NGO has been successfully registered. You can now log in to start managing donations!",
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

export default NgoRegistrationstep4;

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
