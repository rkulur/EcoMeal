import { api, ApiResult } from "@/src/api/axios";
import { deleteImgFromCloud } from "@/src/utils/supabase";
import { CarehomeRegistrationType } from "@/src/validation/register/carehome/carehomeRegistration.schema";
import { ComposterRegistrationType } from "@/src/validation/register/composter/composterRegistration.schema";
import { DonorRegistrationType } from "@/src/validation/register/donor/donorRegistration.schema";
import { NgoRegistrationType } from "@/src/validation/register/ngo/ngoRegistration.schema";
import { isAxiosError } from "axios";

type RegisterResponse = {
  success: boolean;
  payload: Payload;
  message: string;
};

type Payload = {
  name: string;
  email: string;
  role: "donor" | "ngo" | "carehome" | "composter" | "admin";
  token: string;
};
async function registerUser<T>(
  data: T & RegistrationCloudFiles,
  path: string,
): Promise<ApiResult<Payload>> {
  try {
    const res = await api.post<RegisterResponse>(path, data);
    const { success, payload, message } = res.data;

    if (!success) {
      console.error("Registration unsuccessfull");
      console.error(res.data);
      removeFilesUploadedToCloud(data);
      return { ok: false, error: { name: "Error", message } };
    }

    return { ok: true, data: payload };
  } catch (error) {
    removeFilesUploadedToCloud(data);
    if (isAxiosError(error)) return { ok: false, error: error };

    return {
      ok: false,
      error: error as Error,
    };
  }
}

interface RegistrationCloudFiles {
  verificationDocument?: string;
  profilePicture?: string;
}

async function removeFilesUploadedToCloud<T>(data: T & RegistrationCloudFiles) {
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

const getCloudFilePath = (path: string) => {
  return path.split("/").splice(-2).join("/");
};

export const registerDonor = (data: DonorRegistrationType) =>
  registerUser<DonorRegistrationType>(data, "/auth/register/donor");

export const registerNgo = (data: NgoRegistrationType) =>
  registerUser<NgoRegistrationType>(data, "/auth/register/ngo");

export const registerCarehome = (data: CarehomeRegistrationType) =>
  registerUser<CarehomeRegistrationType>(data, "/auth/register/carehome");

export const registerComposter = (data: ComposterRegistrationType) =>
  registerUser<ComposterRegistrationType>(data, "/auth/register/composter");
