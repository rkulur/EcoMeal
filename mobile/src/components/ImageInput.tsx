import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Alert, Image, Pressable, StyleSheet, View } from "react-native";
import { BORDER_RADIUS, COLORS } from "../themes";
import { useEffect } from "react";
import { resizeImg } from "../utils/resize";

type ImageInputType = {
  value: string | undefined;
  onChange: (uri: string | null) => void;
};
const ImageInput = ({ value, onChange }: ImageInputType) => {
  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return null;
    }

    return resizeImg(result);
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (result.canceled) {
      return null;
    }

    return resizeImg(result);
  };

  const handleVerificationDocument = async () => {
    const useCamera = await (() =>
      new Promise((resolve, _) => {
        Alert.alert(
          "Upload Photo",
          "Choose an option",
          [
            {
              text: "Camera",
              onPress: () => {
                resolve(true);
              },
            },
            {
              text: "Gallery",
              onPress: () => {
                resolve(false);
              },
            },
            { text: "Cancel", style: "cancel" },
          ],
          { cancelable: true },
        );
      }))();
    if (useCamera) onChange(await takePhoto());
    else onChange(await pickFromGallery());
  };

  useEffect(() => {
    const requestCameraPermission = async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const libraryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (
        cameraStatus.status !== "granted" ||
        libraryStatus.status !== "granted"
      ) {
        Alert.alert(
          "Permission required",
          "We need permissions to access camera and photos.",
        );
      }
    };
    requestCameraPermission();
  }, []);
  return (
    <View>
      <View style={s.imgView}>
        <Pressable
          style={({ pressed }) => [
            s.addBtn,
            {
              transform: [
                { scaleX: pressed ? 0.95 : 1 },
                { scaleY: pressed ? 0.95 : 1 },
              ],
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          onPress={handleVerificationDocument}
        >
          <FontAwesome5 name="plus" size={20} style={s.plus} />
        </Pressable>
        {value && <Image source={{ uri: value }} style={s.img} />}
      </View>
    </View>
  );
};

export default ImageInput;

const s = StyleSheet.create({
  addBtn: {
    width: 75,
    height: 75,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gray,
  },
  plus: {
    color: "gray",
  },
  img: {
    height: 75,
    width: 75,
    borderRadius: BORDER_RADIUS,
  },
  imgView: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
});
