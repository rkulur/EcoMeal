import { api } from "@/src/api/axios";
import ImageInput from "@/src/components/ImageInput";
import InputBox from "@/src/components/InputBox";
import PoppinsText from "@/src/components/PoppinsText";
import { useAuth } from "@/src/core/auth/AuthProvider";
import Button from "@/src/core/auth/components/Button";
import StepSkeleton from "@/src/core/auth/components/StepSkeleton";
import { useStep1DonorData } from "@/src/core/auth/hooks/donor/step1Context";
import { useStep2DonorData } from "@/src/core/auth/hooks/donor/step2Context";
import { useStep3DonorData } from "@/src/core/auth/hooks/donor/step3Context";
import { BORDER_RADIUS, COLORS } from "@/src/themes";
import { uploadImgToCloud } from "@/src/utils/supabase";
import { step3Schema } from "@/src/validation/donor/donorRegistration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { z } from "zod";
import { prettifyError } from "zod/v4/core";

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

  const { data: data1, setData: setData1 } = useStep1DonorData();
  const { data: data2, setData: setData2 } = useStep2DonorData();
  const { data: data3, setData: setData3 } = useStep3DonorData();
  const router = useRouter();

  const onSubmit = async (data: step3Type) => {
    setData3(data);
    const url = await uploadImgToCloud({
      bucket: "ecomeal",
      resizedURI: data.verificationDocument!,
      folder: "verificationDocument",
    });

    try {
      const res = await api.post("/auth/register/donor", {
        ...data1,
        ...data2,
        ...data3,
        verificationDocument: url,
      });
      alert(JSON.stringify(res));
      signIn(res.data.token, res.data.role);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StepSkeleton totalSteps={3} currStep={3} heading="Build trust and impact">
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
      <Button
        totalSteps={3}
        currStep={3}
        onPress={handleSubmit(onSubmit, (err) => alert(JSON.stringify(err)))}
      />
    </StepSkeleton>
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
