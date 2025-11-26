import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { FastifyError } from "@/src/types/fastify";
import { RegistrationCloudFiles } from "@/src/types/supabase";
import { removeFilesUploadedToCloud } from "@/src/utils/supabase";
import { CarehomeRegistrationType } from "@/src/validation/register/carehome/carehomeRegistration.schema";
import { ComposterRegistrationType } from "@/src/validation/register/composter/composterRegistration.schema";
import { DonorRegistrationType } from "@/src/validation/register/donor/donorRegistration.schema";
import { NgoRegistrationType } from "@/src/validation/register/ngo/ngoRegistration.schema";
import { isAxiosError } from "axios";

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
    const res = await api.post<ApiResponse<Payload | FastifyError>>(path, data);
    const { success, payload, message } = res.data;

    if (!success) {
      removeFilesUploadedToCloud(data);
      const error = payload as FastifyError;
      return { ok: false, error, message: error.message };
    }

    return { ok: true, data: payload as Payload, message };
  } catch (error) {
    removeFilesUploadedToCloud(data);
    if (isAxiosError<ApiResponse<Payload>>(error))
      return {
        ok: false,
        error: error,
        message: JSON.stringify(error.response?.data) ?? "Unexpected Error",
      };

    return {
      ok: false,
      error: error as Error,
      message: "Unexpected Error",
    };
  }
}

export const registerDonor = (data: DonorRegistrationType) =>
  registerUser<DonorRegistrationType>(data, "/auth/register/donor");

export const registerNgo = (data: NgoRegistrationType) =>
  registerUser<NgoRegistrationType>(data, "/auth/register/ngo");

export const registerCarehome = (data: CarehomeRegistrationType) =>
  registerUser<CarehomeRegistrationType>(data, "/auth/register/carehome");

export const registerComposter = (data: ComposterRegistrationType) =>
  registerUser<ComposterRegistrationType>(data, "/auth/register/composter");
