import { PoppinsHeadText, PoppinsText } from "@/src/components";
import { FONT_SIZE, LINE_HEIGHT } from "@/src/themes";
import { StyleSheet, Text, View } from "react-native";

type HeadingWithSubtextProps = {
  heading: string;
  subheading: string;
};
const HeadingWithSubtext = ({
  heading,
  subheading,
}: HeadingWithSubtextProps) => {
  return (
    <View>
      <PoppinsHeadText style={s.heading}>{heading}</PoppinsHeadText>
      <PoppinsText style={s.subheading}>{subheading}</PoppinsText>
    </View>
  );
};

export default HeadingWithSubtext;

const s = StyleSheet.create({
  heading: {
    lineHeight: LINE_HEIGHT.impactCard,
    fontSize: FONT_SIZE.large,
  },
  subheading: {
    fontSize: FONT_SIZE.small,
  },
});
