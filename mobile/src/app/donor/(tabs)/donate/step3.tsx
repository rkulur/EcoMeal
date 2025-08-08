import { PoppinsText } from "@/src/components";
import { pickFromGallery } from "@/src/components/ImageInput";
import OutlineButton from "@/src/components/OutlineButton";
import StepButtons from "@/src/core/auth/components/RegisterButton";
import DonationStepSkeleton from "@/src/core/donor/components/donate/StepSkeleton";
import HeadingWithSubtext from "@/src/core/donor/components/HeadingWithSubtext";
import { useStep3DonationData } from "@/src/core/donor/hooks/donate/step3Context";
import { BORDER_RADIUS, COLORS, SPACING } from "@/src/themes";
import { Step3Schema, step3Type } from "@/src/validation/donate.schema";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useFieldArray, useForm } from "react-hook-form";
import { Image, Pressable, StyleSheet, View } from "react-native";

const DonationStep3 = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Step3Schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const handleImageInsertion = async () => {
    Haptics.selectionAsync();
    const urlArr = await pickFromGallery(true);
    console.log(urlArr);
    urlArr?.forEach((url) => {
      append({ url });
    });
  };

  const router = useRouter();
  const { setData } = useStep3DonationData();

  const onSubmit = (data: step3Type) => {
    setData(data);
    router.push("/donor/donate/step4");
  };

  return (
    <DonationStepSkeleton currStep={3}>
      <View style={s.container}>
        <HeadingWithSubtext
          heading="Show Your Donation"
          subheading="Upload atleast 3 clear photos of the food"
        />
        <View
          style={[s.selectImage, { display: fields.length ? "none" : "flex" }]}
        >
          <Feather name="upload" size={40} color="black" />
          <PoppinsText>Upload images here</PoppinsText>
          <OutlineButton text="Select Files" onPress={handleImageInsertion} />
        </View>
        <View style={s.imageView}>
          {fields.map((field, idx) => (
            <View key={field.id} style={{ position: "relative" }}>
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  remove(idx);
                }}
                style={s.deleteImage}
              >
                <Ionicons name="close" size={18} />
              </Pressable>
              <Image source={{ uri: field.url }} style={s.image} />
            </View>
          ))}
          <Pressable
            style={[s.imageAdd, { display: fields.length ? "flex" : "none" }]}
            onPress={handleImageInsertion}
          >
            <Ionicons name="add" size={50} color={COLORS.outlineGray} />
          </Pressable>
        </View>
        <StepButtons
          totalSteps={4}
          currStep={3}
          onPress={handleSubmit(onSubmit, (err) => console.error(err))}
        />
      </View>
    </DonationStepSkeleton>
  );
};

export default DonationStep3;

const s = StyleSheet.create({
  container: {
    marginTop: SPACING.page,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.cardHorizontal,
    paddingVertical: SPACING.cardVertical,
    borderRadius: BORDER_RADIUS,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    gap: 15,
  },
  imageView: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLORS.outlineGray,
  },
  imageAdd: {
    borderWidth: 1,
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDER_RADIUS,
    borderColor: COLORS.outlineGray,
  },
  deleteImage: {
    position: "absolute",
    zIndex: 999,
    backgroundColor: COLORS.white,
    borderRadius: 99999999,
    padding: 2,
    right: 5,
    top: 5,
  },
  selectImage: {
    alignItems: "center",
    gap: 10,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    padding: 50,
    borderColor: COLORS.outlineGray,
  },
});
