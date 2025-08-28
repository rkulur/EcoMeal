import { PoppinsText } from "@/src/components";
import { COLORS, FONT_SIZE, SPACING, STATUS_COLORS } from "@/src/themes";
import { StyleSheet, Text, View } from "react-native";

type StatusProps = {
  status?:
    | "pending"
    | "accepted"
    | "assigned"
    | "picked_up"
    | "delivered"
    | "expired"
    | "cancelled"
    | "available";
};
const Status = ({ status = "pending" }: StatusProps) => {
  const clr = STATUS_COLORS[status];
  return (
    <View
      style={[
        s.statusContainer,
        { backgroundColor: clr.bg, borderColor: clr.color },
      ]}
    >
      <PoppinsText style={[s.statusText, { color: clr.color }]}>
        {status[0].toUpperCase() + status.substring(1)}
      </PoppinsText>
    </View>
  );
};

export default Status;

const s = StyleSheet.create({
  statusText: {
    fontWeight: "bold",
    fontSize: FONT_SIZE.small,
  },
  statusContainer: {
    borderRadius: 9999999,
    paddingHorizontal: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
