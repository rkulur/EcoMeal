import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
} from "react-native";

type PoppinsTextProps = TextProps & { style?: StyleProp<TextStyle> };
const PoppinsText = ({ style, ...props }: PoppinsTextProps) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: "Poppins_400Regular",
        },
        style,
      ]}
    />
  );
};

export default PoppinsText;

const styles = StyleSheet.create({});
