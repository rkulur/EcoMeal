import { api } from "@/src/api/axios";
import { PoppinsText } from "@/src/components";
import StepButtons from "@/src/core/auth/components/RegisterButton";
import { postDonation } from "@/src/core/donor/api/donation";
import DonationStepSkeleton from "@/src/core/donor/components/donate/StepSkeleton";
import HeadingWithSubtext from "@/src/core/donor/components/HeadingWithSubtext";
import { useStep1DonationData } from "@/src/core/donor/hooks/donate/step1Context";
import { useStep2DonationData } from "@/src/core/donor/hooks/donate/step2Context";
import { useStep3DonationData } from "@/src/core/donor/hooks/donate/step3Context";
import {
  BORDER_RADIUS,
  COLORS,
  FONT,
  FONT_SIZE,
  GRADIENT_SECONDARY,
  SPACING,
} from "@/src/themes";
import { uploadImgToCloud } from "@/src/utils/supabase";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

const DonationStep4 = () => {
  const { data: step1Data, clearData: clearStep1Data } = useStep1DonationData();
  const { data: step2Data, clearData: clearStep2Data } = useStep2DonationData();
  const { data: step3Data, clearData: clearStep3Data } = useStep3DonationData();

  const router = useRouter();

  const handleSubmit = async () => {
    const updatedUrlArr = step3Data.images.map(async (image) => {
      const url = await uploadImgToCloud({
        resizedURI: image.url.toString(),
        folder: "donation",
      });
      return { url, uploadedAt: image.uploadedAt };
    });
    const updatedImages = await Promise.all(updatedUrlArr);
    const donationData = {
      ...step1Data,
      ...step2Data,
      ...step3Data,
      images: updatedImages,
    };
    const res = await postDonation(donationData);
    if (!res.ok) return alert(JSON.stringify(res));
    clearStep1Data();
    clearStep2Data();
    clearStep3Data();
    router.push("/donor/donate/step1");
    alert(JSON.stringify(res));
    router.navigate("/donor/dashboard");
  };
  return (
    <DonationStepSkeleton currStep={4}>
      <View style={s.container}>
        <HeadingWithSubtext
          heading="Final Review Before Posting"
          subheading="Please review your donation details"
        />
        <LinearGradient colors={GRADIENT_SECONDARY} style={s.subcontainer}>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Ionicons name="document-text-outline" size={20} />
            <PoppinsText
              style={{
                fontSize: FONT_SIZE.xmedium,
                fontFamily: FONT.SEMI_BOLD,
              }}
            >
              Food Details
            </PoppinsText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <PoppinsText
              style={{
                flex: 2,
                textAlign: "center",
              }}
            >
              Item No
            </PoppinsText>
            <PoppinsText
              style={{
                flex: 3,
                textAlign: "center",
              }}
            >
              Food Item
            </PoppinsText>
            <PoppinsText
              style={{
                flex: 3,
                textAlign: "center",
              }}
            >
              Quantity
            </PoppinsText>
          </View>
          {step1Data.foodItems?.map((item, idx) => (
            <View style={{ flexDirection: "row" }} key={idx}>
              <PoppinsText style={{ flex: 2, textAlign: "center" }}>
                {idx + 1}
              </PoppinsText>
              <PoppinsText style={{ flex: 3, textAlign: "center" }}>
                {item.name}
              </PoppinsText>
              <PoppinsText style={{ flex: 3, textAlign: "center" }}>
                {item.quantity + " " + item.unit}
              </PoppinsText>
            </View>
          ))}
        </LinearGradient>
        <LinearGradient colors={GRADIENT_SECONDARY} style={s.subcontainer}>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Ionicons name="location-outline" size={20} />
            <PoppinsText
              style={{
                fontSize: FONT_SIZE.xmedium,
                fontFamily: FONT.SEMI_BOLD,
              }}
            >
              Pickup Location
            </PoppinsText>
          </View>
          <PoppinsText style={{ textDecorationLine: "underline" }}>
            Address
          </PoppinsText>
          <PoppinsText>{step2Data.pickupAddress?.address}</PoppinsText>
        </LinearGradient>
        <LinearGradient colors={GRADIENT_SECONDARY} style={s.subcontainer}>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Ionicons name="images-outline" size={20} />
            <PoppinsText
              style={{
                fontSize: FONT_SIZE.xmedium,
                fontFamily: FONT.SEMI_BOLD,
              }}
            >
              Images
            </PoppinsText>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
            }}
          >
            {step3Data.images?.map((img, idx) => (
              <Image
                source={{ uri: img.url }}
                key={idx}
                style={{ height: 100, width: 100, borderRadius: BORDER_RADIUS }}
              />
            ))}
          </View>
        </LinearGradient>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: COLORS.bgGreen,
            borderRadius: BORDER_RADIUS,
          }}
        >
          <PoppinsText style={{ textAlign: "center", color: COLORS.green }}>
            Once submitted, your donation will be visible to nearby NGOs who can
            arrange pickup
          </PoppinsText>
        </View>
        <StepButtons totalSteps={4} currStep={4} onPress={handleSubmit} />
      </View>
    </DonationStepSkeleton>
  );
};

export default DonationStep4;

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
  subcontainer: {
    borderWidth: 1,
    paddingHorizontal: SPACING.cardHorizontal / 2,
    paddingVertical: SPACING.cardVertical / 2,
    borderColor: COLORS.outlineGray,
    borderRadius: BORDER_RADIUS,
    gap: 5,
  },
});
