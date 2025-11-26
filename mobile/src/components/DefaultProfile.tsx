import { FontAwesome } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";
import { COLORS } from "../themes";

type DefaultProfileProps = {
  src?: string | null;
  height?: number;
  width?: number;
};
const DefaultProfile = ({ src = null, height, width }: DefaultProfileProps) => {
  return (
    <View>
      {src ? (
        <Image
          source={{ uri: src }}
          style={{
            height: height ?? 50,
            width: width ?? 50,
            borderRadius: 99999,
          }}
        />
      ) : (
        <FontAwesome
          name="user-circle-o"
          size={height ? (height * 30) / 50 : 30}
          color={COLORS.outlineGray}
        />
      )}
    </View>
  );
};

export default DefaultProfile;

const styles = StyleSheet.create({});
