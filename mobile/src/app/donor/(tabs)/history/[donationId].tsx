import { PoppinsHeadText, PoppinsText } from "@/src/components";
import DefaultProfile from "@/src/components/DefaultProfile";
import PageHeader from "@/src/components/PageHeader";
import { getDonationById } from "@/src/core/donor/api/donation";
import Status from "@/src/core/donor/components/dashboard/Status";
import {
  BORDER_RADIUS,
  COLORS,
  FONT,
  FONT_SIZE,
  HEIGHT,
  SPACING,
} from "@/src/themes";
import { formatDateTime } from "@/src/utils/formatDateTime";
import { DonationType } from "@/src/validation/donate.schema";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DonationDetails = () => {
  const { donationId } = useLocalSearchParams();
  const [donation, setDonation] = useState<DonationType | null>(null);
  const router = useRouter();
  useEffect(() => {
    const getDonationDetails = async () => {
      const res = await getDonationById(donationId as string);
      if (!res.ok) {
        alert(JSON.stringify(res.error));
        return;
      }
      // alert(JSON.stringify(res.data));
      console.log(JSON.stringify(res.data));
      setDonation(res.data);
    };
    getDonationDetails();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <PageHeader />
      <ScrollView
        style={s.container}
        contentContainerStyle={{ paddingBottom: HEIGHT.tabBar + SPACING.page }}
      >
        <View style={{ gap: 20 }}>
          <PoppinsHeadText style={{ textAlign: "center" }}>
            Donation History
          </PoppinsHeadText>
          <Pressable
            style={{ flexDirection: "row", gap: 5 }}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} />
            <PoppinsText style={{ fontFamily: FONT.SEMI_BOLD }}>
              Back to history
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <PoppinsText style={{ fontFamily: FONT.SEMI_BOLD }}>
                Pickup date:
              </PoppinsText>
              <PoppinsText>
                {donation?.deliveryDate
                  ? formatDateTime(donation?.deliveryDate)
                  : "Donation not assigned yet"}
              </PoppinsText>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
                flexWrap: "wrap",
              }}
            >
              <PoppinsText style={{ fontFamily: FONT.SEMI_BOLD }}>
                Pickup Location:
              </PoppinsText>
              <PoppinsText>{donation?.pickupAddress.address}</PoppinsText>
            </View>
          </View>

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
              Recipient
            </PoppinsText>
            {donation?.acceptedBy ? (
              <View>
                <DefaultProfile src={donation.acceptedBy.profilePicture} />
                <PoppinsText
                  style={{
                    fontSize: FONT_SIZE.medium,
                    fontFamily: FONT.SEMI_BOLD,
                  }}
                >
                  {donation.acceptedBy.name}
                </PoppinsText>
                <PoppinsText>
                  {donation.acceptedBy.location.city +
                    ", " +
                    donation.acceptedBy.location.district +
                    ", " +
                    donation.acceptedBy.location.state}
                </PoppinsText>
              </View>
            ) : (
              <PoppinsText>Donation not assigned yet</PoppinsText>
            )}
          </View>
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
