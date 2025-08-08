import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
} from "react-native";
import { FONT } from "../themes";

type PoppinsTextProps = TextProps & { style?: StyleProp<TextStyle> };
const PoppinsText = ({ style, ...props }: PoppinsTextProps) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: FONT.REGULAR,
        },
        style,
      ]}
    />
  );
};

export default PoppinsText;

const styles = StyleSheet.create({});
