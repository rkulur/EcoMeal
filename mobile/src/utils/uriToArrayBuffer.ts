import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
export async function uriToArrayBuffer(uri: string) {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: "base64",
  });
  return decode(base64);
}
