import { PoppinsText } from "@/src/components";
import { BORDER_RADIUS, COLORS, GRADIENT_PRIMARY } from "@/src/themes";
import { DonationType } from "@/src/types/donor";
import { useEffect, useState } from "react";
import { Alert, Pressable, View } from "react-native";
import getOngoingDeliveries from "../api/getOngoingDeliveries";
import OutlineButton from "@/src/components/OutlineButton";
import { router } from "expo-router";
import RequestedDonationCard from "./RequestedDonationCard";
import GradientButton from "@/src/components/GradientButton";
import confirmDelivery from "./confirmDelivery";
import { useAlertModal } from "@/src/hooks/AlertModalContext";

type DisplayDeliveriesProps = {
  filter: "Ongoing" | "Past";
};

const OngoingDeliveries = ({ donations }: { donations: DonationType[] }) => {
  const { showModal } = useAlertModal();
  const handleDeliveryConfirmation = async (donationId: string) => {
    Alert.alert(
      "Confirm Delivery",
      "Are you sure the donation has been delivered",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "default",
          onPress: async () => {
            const res = await confirmDelivery(donationId);
            if (!res.ok) {
              console.log(res.error);
              showModal("Something went wrong!", res.message ?? res.error);
              return;
            }
            showModal(
              "Delivery Confirmed!",
              "The donation has been marked as delivered.",
            );
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <>
      {donations.map((donation, idx) => (
        <RequestedDonationCard donation={donation} key={idx}>
          <OutlineButton
            onPress={() => router.push(`carehome/requests/${donation._id}`)}
            text={"View Donation Details"}
          />
          {donation.ngoDelivered && !donation.carehomeConfirmedDelivery && (
            <GradientButton
              onPress={() => handleDeliveryConfirmation(donation._id)}
              text={"Confirm Delivery"}
              style={{ flex: 1 }}
              gradient={GRADIENT_PRIMARY}
            />
          )}
        </RequestedDonationCard>
      ))}
    </>
  );
};

const DisplayDeliveries = ({ filter }: DisplayDeliveriesProps) => {
  const [history, setHistory] = useState<DonationType[]>();

  const getHistory = async () => {
    const res = await getOngoingDeliveries();
    if (!res.ok) {
      alert(res.error.message);
      return;
    }
    console.log(JSON.stringify(res.data));
    setHistory(res.data);
  };
  useEffect(() => {
    getHistory();
  }, []);

  if (!history || history.length == 0) {
    return (
      <View
        style={{
          gap: 10,
          padding: 20,
          paddingVertical: 160,
          borderRadius: BORDER_RADIUS,
          borderColor: COLORS.outlineGray,
          borderWidth: 1,
        }}
      >
        <PoppinsText style={{ textAlign: "center", color: COLORS.outlineGray }}>
          No {filter} Deliveries
        </PoppinsText>
      </View>
    );
  }

  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? COLORS.hoverGray : COLORS.white,
          },
        ]}
      >
        {filter === "Ongoing" && (
          <OngoingDeliveries
            donations={history.filter(
              (donation) => donation.status === "assigned",
            )}
          />
        )}

        {filter === "Past" && (
          <OngoingDeliveries
            donations={history.filter((donation) =>
              ["delivered", "cancelled"].includes(donation.status),
            )}
          />
        )}
      </Pressable>
    </View>
  );
};

export default DisplayDeliveries;
