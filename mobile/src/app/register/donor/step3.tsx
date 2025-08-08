import { ImageInput, InputBox, PoppinsText } from "@/src/components";
import { registerDonor } from "@/src/core/auth/api/register";
import { useAuth } from "@/src/core/auth/AuthProvider";
import StepButtons from "@/src/core/auth/components/RegisterButton";
import RegistrationStepSkeleton from "@/src/core/auth/components/StepSkeleton";
import { useStep1DonorData } from "@/src/core/auth/hooks/donor/step1Context";
import { useStep2DonorData } from "@/src/core/auth/hooks/donor/step2Context";
import { useStep3DonorData } from "@/src/core/auth/hooks/donor/step3Context";
import { BORDER_RADIUS, COLORS } from "@/src/themes";
import { uploadImgToCloud } from "@/src/utils/supabase";
import {
  DonorRegistrationType,
  step3Schema,
} from "@/src/validation/register/donor/donorRegistration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
      verificationDocument: "",
      profilePicture: "",
      socialMedia: {
        website: "https://www.sunshine.com",
        facebook: "https://www.facebook.com/sunshine",
        instagram: "https://www.instagram.com/sunshine",
        twitter: "https://www.twitter.com/sunshine",
      },
    },
  });

  const { data: data1 } = useStep1DonorData();
  const { data: data2 } = useStep2DonorData();
  const { data: data3, setData: setData3 } = useStep3DonorData();

  const onSubmit = async (data: step3Type) => {
    setData3(data);
    const url = await uploadImgToCloud({
      bucket: "ecomeal",
      resizedURI: data.verificationDocument!,
      folder: "verificationDocument",
    });

    const donorData = {
      ...data1,
      ...data2,
      ...data3,
      verificationDocument: url,
    } as DonorRegistrationType;

    const res = await registerDonor(donorData);
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
