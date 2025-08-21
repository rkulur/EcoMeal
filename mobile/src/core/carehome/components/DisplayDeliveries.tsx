import { COLORS } from "@/src/themes";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import getRequestHistory from "../api/getRequestHistory";
import HistoryCard from "../../donor/components/history/HistoryCard";
import { FoodRequestHistoryType } from "@/src/validation/requestFood.schema";
import { PoppinsText } from "@/src/components";

const DisplayDeliveries = () => {
  const [history, setHistory] = useState<FoodRequestHistoryType[]>();
  useEffect(() => {
    const getHistory = async () => {
      const res = await getRequestHistory();
      if (!res.ok) {
        alert(res.error.message);
        return;
      }
      alert(res.data);
      console.log(res.data);
      setHistory(res.data);
    };
    getHistory();
  }, []);

  return (
    <View>
      <Pressable
        // onPress={() => router.push(`/donor/history/${donation._id}`)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? COLORS.hoverGray : COLORS.white,
          },
        ]}
      >
        {history && <PoppinsText>No history</PoppinsText>}
      </Pressable>
    </View>
  );
};

export default DisplayDeliveries;
