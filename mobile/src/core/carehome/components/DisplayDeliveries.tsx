import { PoppinsText } from "@/src/components";
import { BORDER_RADIUS, COLORS } from "@/src/themes";
import { DonationType } from "@/src/types/donor";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import getOngoingDeliveries from "../api/getOngoingDeliveries";

type DisplayDeliveriesProps = {
  filter: "Ongoing" | "Past";
};

const DisplayDeliveries = ({ filter }: DisplayDeliveriesProps) => {
  const [history, setHistory] = useState<DonationType[]>();
  useEffect(() => {
    const getHistory = async () => {
      const res = await getOngoingDeliveries();
      if (!res.ok) {
        alert(res.error.message);
        return;
      }
      console.log(res.data);
      setHistory(res.data);
    };
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
        <PoppinsText>Sheesh</PoppinsText>
      </Pressable>
    </View>
  );
};

export default DisplayDeliveries;
