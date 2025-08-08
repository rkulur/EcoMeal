import { StyleSheet, Text, View } from "react-native";
import HeadingWithSubtext from "../core/donor/components/HeadingWithSubtext";
import OutlineButton from "./OutlineButton";
import { BORDER_RADIUS, COLORS, SPACING } from "../themes";
import { ReactNode } from "react";
type DashboardCardProps = {
  heading: string;
  subheading: string;
  children?: ReactNode;
};
const DashboardCard = ({
  heading,
  subheading,
  children,
}: DashboardCardProps) => {
  return (
    <View style={s.container}>
      <HeadingWithSubtext heading={heading} subheading={subheading} />
      <View style={{ gap: 10 }}>{children}</View>
    </View>
  );
};

export default DashboardCard;

const s = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.cardHorizontal,
    paddingVertical: SPACING.cardVertical,
    paddingTop: SPACING.cardVertical - 10,
    borderRadius: BORDER_RADIUS,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
    gap: 20,
  },
});
