import { PoppinsHeadText, PoppinsText } from "@/src/components";
import DefaultProfile from "@/src/components/DefaultProfile";
import GradientButton from "@/src/components/GradientButton";
import PageHeader from "@/src/components/PageHeader";
import getCarehomeDetails from "@/src/core/carehome/api/getPersonalDetails";
import requestDonation from "@/src/core/carehome/api/requestDonation";
import { getDonationById } from "@/src/core/donor/api/donation";
import Status from "@/src/core/donor/components/dashboard/Status";
import { useAlertModal } from "@/src/hooks/AlertModalContext";
import {
  BORDER_RADIUS,
  COLORS,
  FONT,
  FONT_SIZE,
  GRADIENT_PRIMARY,
  HEIGHT,
  SPACING,
} from "@/src/themes";
import { PersonalDetails } from "@/src/types/carehome";
import { DonationType } from "@/src/types/donor";
import { printExpiryDate } from "@/src/utils/printExpiryDate";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
  const [personalDetails, setPersonalDetails] =
    useState<PersonalDetails | null>(null);
  const router = useRouter();
  const { showModal, isVisible } = useAlertModal();
  const [reqSuccess, setReqSuccess] = useState(false);

  const handleRequest = async (donationId: string) => {
    const res = await requestDonation(donationId);
    if (!res.ok) {
      showModal("Ooops!", "Something went wrong!, " + res.message);
      console.log(res.error);
    }
    showModal(
      "Request successful",
      "Donation has been requested successfully and will be shown to the NGOs",
    );
    setReqSuccess(true);
  };

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

  const getPersonalDetails = async () => {
    const res = await getCarehomeDetails();
    if (!res.ok) {
      alert(res.message);
      console.log(res.error);
      return;
    }
    setPersonalDetails(res.data);
  };

  useEffect(() => {
    getDonationDetails();
    getPersonalDetails();
  }, []);

  useEffect(() => {
    if (!isVisible && reqSuccess) {
      router.back();
      router.navigate("/carehome/dashboard");
    }
  }, [reqSuccess]);

  if (!donation) {
    return (
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <PageHeader />
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

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
            onPress={() => {
              router.replace("carehome/requests");
              router.back();
            }}
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  {donation?.foodItems.map((item, idx) => (
                    <View
                      key={idx}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <PoppinsText>{item.name} </PoppinsText>
                    </View>
                  ))}
                </View>
                <View>
                  {donation?.foodItems.map((item, idx) => (
                    <View
                      key={idx}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <PoppinsText>
                        {item.quantity + " " + item.unit}{" "}
                      </PoppinsText>
                      <PoppinsText
                        style={{
                          fontSize: FONT_SIZE.xsmall,
                          color: COLORS.red,
                        }}
                      >
                        (Expires in{" "}
                        {printExpiryDate(new Date(item.expiryDate!))})
                      </PoppinsText>
                    </View>
                  ))}
                </View>
              </View>
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
              Donor
            </PoppinsText>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <DefaultProfile src={donation.donor?.profilePicture} />
              <View>
                <PoppinsText
                  style={{
                    fontSize: FONT_SIZE.medium,
                    fontFamily: FONT.SEMI_BOLD,
                  }}
                >
                  {donation.donor?.name}
                </PoppinsText>
                <PoppinsText>
                  {donation.donor?.location?.city +
                    ", " +
                    donation.donor?.location?.district +
                    ", " +
                    donation.donor?.location.state}
                </PoppinsText>
              </View>
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
              Handler
            </PoppinsText>
            {!donation.acceptedBy ? (
              <PoppinsText>
                The donation has not been accepted by any NGO yet.
              </PoppinsText>
            ) : (
              <View style={{ flexDirection: "row", gap: 10 }}>
                <DefaultProfile src={donation.acceptedBy?.profilePicture} />
                <View>
                  <PoppinsText
                    style={{
                      fontSize: FONT_SIZE.medium,
                      fontFamily: FONT.SEMI_BOLD,
                    }}
                  >
                    {donation.acceptedBy?.name}
                  </PoppinsText>
                  <PoppinsText>
                    {donation.acceptedBy?.location?.city +
                      ", " +
                      donation.acceptedBy?.location?.district +
                      ", " +
                      donation.acceptedBy?.location.state}
                  </PoppinsText>
                </View>
              </View>
            )}
          </View>

          {donation &&
            donation.requestedCarehomes?.some(
              (rc) => rc.carehomeId != personalDetails?._id,
            ) && (
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
