import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Alert, Image, Pressable, StyleSheet, View } from "react-native";
import { BORDER_RADIUS, COLORS } from "../themes";
import { useEffect } from "react";
import { resizeImages } from "../utils/resize";
import Toast from "react-native-toast-message";

type ImageInputType = {
  value: string | undefined;
  onChange: (uri: string | null) => void;
};

export const pickFromGallery = async (multiple: boolean = false) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    allowsMultipleSelection: multiple,
    selectionLimit: 5,
    quality: 1,
  });

  if (result.canceled) {
    return null;
  }

  return resizeImages(result);
};

export const takePhoto = async () => {
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 1,
  });
  if (result.canceled) {
    return null;
  }

  return resizeImages(result);
};

export const requestCameraPermission = async () => {
  const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
  const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (cameraStatus.status !== "granted" || libraryStatus.status !== "granted") {
    Toast.show({
      type: "error",
      text1: "Permission required",
      text2: "We need permissions to access camera and photos.",
    });
  }
};

export const chooseOption = () =>
  new Promise<boolean>((resolve, _) => {
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
  });

const ImageInput = ({ value, onChange }: ImageInputType) => {
  const handleVerificationDocument = async () => {
    const useCamera = await chooseOption();
    let urls;
    if (useCamera) {
      urls = await takePhoto();
      onChange(urls && urls[0]);
    } else {
      urls = await pickFromGallery();
      onChange(urls && urls[0]);
    }
  };

  useEffect(() => {
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
