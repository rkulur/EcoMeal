import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import { uriToArrayBuffer } from "./uriToArrayBuffer";
import { RegistrationCloudFiles } from "../types/supabase";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  },
);

type UploadImgToCloudType = {
  bucket?: string;
  folder: string;
  resizedURI: string;
};

export async function uploadImgToCloud({
  resizedURI,
  folder,
  bucket = "ecomeal",
}: UploadImgToCloudType) {
  const buffer = await uriToArrayBuffer(resizedURI);
  const ext = resizedURI.split(".").pop() || "jpg";
  const path = `${folder}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, buffer, {
    contentType: `image/${ext}`,
    upsert: false,
  });
  if (error) throw error;
  return getPublicUrl(bucket, path);
}

export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteImgFromCloud(bucket: string, paths: string[]) {
  const { error } = await supabase.storage.from(bucket).remove(paths);

  if (error) return { success: false, error };
  return { success: true };
}

const getCloudFilePath = (path: string) => {
  return path.split("/").splice(-2).join("/");
};

export async function removeFilesUploadedToCloud<T>(
  data: T & RegistrationCloudFiles,
) {
  const paths: string[] = [];
  if (data.verificationDocument) {
    paths.push(getCloudFilePath(data.verificationDocument));
  }

  if (data.profilePicture) {
    paths.push(getCloudFilePath(data.profilePicture));
  }

  if (!paths.length) return;

  const { success, error } = await deleteImgFromCloud(
    process.env.EXPO_PUBLIC_SUPABASE_STORAGE_KEY,
    paths,
  );
  if (!success) throw error;
}
