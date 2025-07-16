import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../themes";

const Line = () => {
  return (
    <View
      style={{
        width: "45%",
        backgroundColor: COLORS.gray,
        height: 2,
      }}
    ></View>
  );
};

export default Line;

const styles = StyleSheet.create({});
