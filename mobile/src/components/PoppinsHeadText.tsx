import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
} from "react-native";
import { FONT_SIZE } from "../themes";

type PoppinsHeadTextProps = TextProps & { style?: StyleProp<TextStyle> };
const PoppinsHeadText = ({ style, ...props }: PoppinsHeadTextProps) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: "Poppins_700Bold",
          fontSize: FONT_SIZE.heading,
        },
        style,
      ]}
    />
  );
};

export default PoppinsHeadText;
