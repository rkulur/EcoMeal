import { StyleSheet, Text, View } from "react-native";
import PoppinsText from "./PoppinsText";
import { ReactNode } from "react";

type ConfirmationModalProps = {
  setIsConfirmed: (isConfirmed: boolean) => void;
  children: ReactNode;
};

const ConfirmationModal = ({
  setIsConfirmed,
  children,
}: ConfirmationModalProps) => {
  return <View>{children}</View>;
};

export default ConfirmationModal;

const styles = StyleSheet.create({});
