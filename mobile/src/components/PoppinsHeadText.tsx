import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
} from "react-native";
import { FONT, FONT_SIZE } from "../themes";

type PoppinsHeadTextProps = TextProps & { style?: StyleProp<TextStyle> };
const PoppinsHeadText = ({ style, ...props }: PoppinsHeadTextProps) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: FONT.BOLD,
          fontSize: FONT_SIZE.xlarge,
          lineHeight: 35,
        },
        style,
      ]}
    />
  );
};

export default PoppinsHeadText;
