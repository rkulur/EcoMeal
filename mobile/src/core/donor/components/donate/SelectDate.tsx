import { PoppinsText } from "@/src/components";
import { BORDER_RADIUS, COLORS, HEIGHT } from "@/src/themes";
import { formatDateDMY } from "@/src/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type SelectDateProps = {
  defaultDate: Date;
  onChange: (date: Date) => void;
  mode?: "date" | "time" | "datetime" | undefined;
};

const SelectDate = ({
  defaultDate,
  onChange,
  mode = "date",
}: SelectDateProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <View style={s.container}>
      <Pressable
        style={{
          borderWidth: 1,
          borderColor: COLORS.outlineGray,
          borderRadius: BORDER_RADIUS,
          padding: HEIGHT.input / 4,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => setModalVisible(true)}
      >
        <PoppinsText>
          {formatDateDMY(defaultDate, mode !== "date" && true)}
        </PoppinsText>
      </Pressable>
      <Ionicons
        name="calendar"
        size={20}
        onPress={() => setModalVisible(true)}
      />
      <DateTimePickerModal
        isVisible={isModalVisible}
        mode={mode}
        date={new Date()}
        onConfirm={(date) => {
          setModalVisible(false);
          onChange(date);
        }}
        onCancel={() => setModalVisible(false)}
        minimumDate={new Date()}
        maximumDate={(() => {
          const today = new Date();
          const maxDate = new Date();
          maxDate.setDate(today.getDate() + 2);
          return maxDate;
        })()}
        display="compact"
      />
    </View>
  );
};

export default SelectDate;

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
});
