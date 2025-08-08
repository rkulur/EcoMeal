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
      verificationDocument: "",
      profilePicture: "",
      socialMedia: {
        website: "https://www.orphanhelp.com",
        facebook: "https://www.facebook.com/orphanhelp",
        instagram: "https://www.instagram.com/orphanhelp",
        twitter: "https://www.twitter.com/orphanhelp",
      },
    },
  });

  const { data: data1 } = useStep1NgoData();
  const { data: data2 } = useStep2NgoData();
  const { data: data3 } = useStep3NgoData();
  const { data: data4, setData: setData4 } = useStep4NgoData();
  const router = useRouter();

  const onSubmit = async (data: step4Type) => {
    setData4(data);
    const url = await uploadImgToCloud({
      bucket: "ecomeal",
      resizedURI: data.verificationDocument!,
      folder: "verificationDocument",
    });

    const ngoData = {
      ...data1,
      ...data2,
      ...data3,
      ...data4,
      verificationDocument: url,
    } as NgoRegistrationType;
    const res = await registerNgo(ngoData);
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
      totalSteps={4}
      currStep={4}
      heading="Build trust and impact"
    >
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <View style={{ display: "flex", gap: 8 }}>
              <PoppinsText>Add Verification Document</PoppinsText>
              <ImageInput value={value} onChange={onChange} />
            </View>
          );
        }}
        name={"verificationDocument"}
      />
      {errors.verificationDocument && (
        <PoppinsText>{errors.verificationDocument.message}</PoppinsText>
      )}
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
      {/* {errors.verificationDocument && ( */}
      {/*   <PoppinsText>{errors.verificationDocument.message}</PoppinsText> */}
      {/* )} */}
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox label={"Website"} value={value} onChangeText={onChange} />
          );
        }}
        name={"socialMedia.website"}
      />
      {/* {errors.socialMedia?.website && ( */}
      {/*   <PoppinsText>{errors.socialMedia.website.message}</PoppinsText> */}
      {/* )} */}
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox
              label={"Facebook"}
              value={value}
              onChangeText={onChange}
            />
          );
        }}
        name={"socialMedia.facebook"}
      />
      {/* {errors.socialMedia?.facebook && ( */}
      {/*   <PoppinsText>{errors.socialMedia.facebook.message}</PoppinsText> */}
      {/* )} */}
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox
              label={"Instagram"}
              value={value}
              onChangeText={onChange}
            />
          );
        }}
        name={"socialMedia.instagram"}
      />
      {/* {errors.socialMedia?.instagram && ( */}
      {/*   <PoppinsText>{errors.socialMedia.instagram.message}</PoppinsText> */}
      {/* )} */}
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox label={"Twitter"} value={value} onChangeText={onChange} />
          );
        }}
        name={"socialMedia.twitter"}
      />
      {/* {errors.socialMedia?.twitter && ( */}
      {/*   <PoppinsText>{errors.socialMedia.twitter.message}</PoppinsText> */}
      {/* )} */}
      <StepButtons
        totalSteps={3}
        currStep={3}
        onPress={handleSubmit(onSubmit, (err) => alert(JSON.stringify(err)))}
      />
    </RegistrationStepSkeleton>
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
