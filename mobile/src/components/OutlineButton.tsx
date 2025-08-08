import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { BORDER_RADIUS, COLORS, HEIGHT, SPACING } from "../themes";
import PoppinsText from "./PoppinsText";
import { ReactNode } from "react";

type OutlineButtonProps = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  text: string;
  children?: ReactNode;
};
const OutlineButton = ({
  text,
  onPress,
  style,
  children,
}: OutlineButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        s.button,
        { backgroundColor: pressed ? COLORS.hoverGray : "white" },
        style,
      ]}
      onPress={onPress}
    >
      {children}
      <PoppinsText style={s.text}>{text}</PoppinsText>
    </Pressable>
  );
};

export default OutlineButton;

const s = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  button: {
    height: HEIGHT.button,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLORS.outlineGray,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: SPACING.cardHorizontal,
  },
});
