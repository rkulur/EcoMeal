import { ReactNode, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import PoppinsText from "./PoppinsText";
import { BORDER_RADIUS, COLORS } from "../themes";

type BottomUpModalProps = {
  children: ReactNode;
  isVisible: boolean;
  setIsVisible: (visibility: boolean) => void;
};
const BottomUpModal = ({
  children,
  isVisible,
  setIsVisible,
}: BottomUpModalProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      style={s.modal}
      // swipeDirection="down"
      // onSwipeComplete={() => setIsVisible(false)}
      backdropOpacity={0.7}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={s.popup}>
        <Pressable
          style={({ pressed }) => [
            s.cancel,
            { scaleX: pressed ? 0.8 : 1, scaleY: pressed ? 0.8 : 1 },
          ]}
          onPress={() => setIsVisible(false)}
        >
          <PoppinsText style={s.cancelSymbol}>Close</PoppinsText>
        </Pressable>
        {children}
      </View>
    </Modal>
  );
};

export default BottomUpModal;

const s = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  cancel: {
    height: 80,
    width: 80,
    position: "absolute",
    zIndex: 1,
    right: 10,
    top: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelSymbol: {
    backgroundColor: "white",
    textAlign: "center",
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  popup: {
    overflow: "hidden",
    height: 600,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 5,
    position: "relative",
  },
});
