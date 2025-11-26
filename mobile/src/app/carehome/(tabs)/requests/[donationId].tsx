import { PoppinsHeadText, PoppinsText } from "@/src/components";
import DefaultProfile from "@/src/components/DefaultProfile";
import GradientButton from "@/src/components/GradientButton";
import PageHeader from "@/src/components/PageHeader";
import requestDonation from "@/src/core/carehome/api/requestDonation";
import { getDonationById } from "@/src/core/donor/api/donation";
import Status from "@/src/core/donor/components/dashboard/Status";
import {
  BORDER_RADIUS,
  COLORS,
  FONT,
  FONT_SIZE,
  GRADIENT_PRIMARY,
  HEIGHT,
  SPACING,
} from "@/src/themes";
import { DonationType } from "@/src/types/donor";
import { formatDateTime } from "@/src/utils/formatDateTime";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DonationDetails = () => {
  const { donationId } = useLocalSearchParams();
  const [donation, setDonation] = useState<DonationType | null>(null);
  const router = useRouter();
  useEffect(() => {
    const getDonationDetails = async () => {
      const res = await getDonationById(`/carehome/get-donation/${donationId}`);
      if (!res.ok) {
        alert(res.message);
        console.log(JSON.stringify(res.error));
        return;
      }
      console.log(JSON.stringify(res.data));
      setDonation(res.data);
    };
    getDonationDetails();
  }, []);

  const handleRequest = async (donationId: string) => {
    const res = await requestDonation(donationId);
    if (!res.ok) {
      alert(res.message);
      console.log(res.error);
    }
    router.back();
    router.navigate("/carehome/dashboard");
  };
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <PageHeader />
      <ScrollView
        style={s.container}
        contentContainerStyle={{ paddingBottom: HEIGHT.tabBar + SPACING.page }}
      >
        <View style={{ gap: 20 }}>
          <PoppinsHeadText style={{ textAlign: "center" }}>
            Donation details
          </PoppinsHeadText>
          <Pressable
            style={{ flexDirection: "row", gap: 5 }}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} />
            <PoppinsText style={{ fontFamily: FONT.SEMI_BOLD }}>
              Back
            </PoppinsText>
          </Pressable>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <PoppinsText
              style={{
                fontSize: FONT_SIZE.xmedium,
                fontFamily: FONT.SEMI_BOLD,
              }}
            >
              {donation?.foodItems
                .map((item, idx) => (idx < 2 ? item.name : null))
                .join(", ")}
              {"..."}
            </PoppinsText>
            <Status status={donation?.status ?? "pending"} />
          </View>
          <FlatList
            horizontal
            data={donation?.images}
            renderItem={({ item: image }) => (
              <Image
                source={{ uri: image.url }}
                style={{
                  height: 200,
                  width: 200,
                  borderRadius: BORDER_RADIUS,
                  marginRight: 15,
                }}
                onError={(e) => alert(e.nativeEvent.error)}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.outlineGray,
              paddingHorizontal: SPACING.cardHorizontal / 2,
              paddingVertical: SPACING.cardVertical / 2,
              borderRadius: BORDER_RADIUS,
              gap: 10,
            }}
          >
            <PoppinsText
              style={{
                fontFamily: FONT.SEMI_BOLD,
                fontSize: FONT_SIZE.xmedium,
              }}
            >
              Donation Details
            </PoppinsText>
            <View>
              <PoppinsText style={{ fontFamily: FONT.SEMI_BOLD }}>
                Items:
              </PoppinsText>
              {donation?.foodItems.map((item, idx) => (
                <View
                  key={idx}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <PoppinsText>{item.name} </PoppinsText>
                  <PoppinsText>{item.quantity + " " + item.unit} </PoppinsText>
                </View>
              ))}
            </View>
          </View>
          {donation && (
            <GradientButton
              onPress={() => {
                handleRequest(donation?._id);
              }}
              text={"Request"}
              style={{ flex: 1 }}
              gradient={GRADIENT_PRIMARY}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DonationDetails;

const s = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.page,
    paddingTop: SPACING.page,
    height: "100%",
  },
});
