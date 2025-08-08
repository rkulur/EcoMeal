import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

export async function resizeImages(
  imgRes: ImagePicker.ImagePickerResult,
  maxSize?: number,
): Promise<string[] | null> {
  !maxSize && (maxSize = 1024);
  if (imgRes.canceled) return null;
  const uriPromiseArr = imgRes.assets.map(async (asset, idx) => {
    const { uri, width, height } = asset;
    const largest = Math.max(width, height);
    const ratio = maxSize / largest;

    if (largest <= maxSize) return uri;

    const resized = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: width * ratio, height: height * ratio } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
    );
    return resized.uri;
  });
  const uriArr = Promise.all(uriPromiseArr);
  return uriArr;
}
