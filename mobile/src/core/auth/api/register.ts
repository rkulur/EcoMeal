import { api, ApiResult } from "@/src/api/axios";
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
  data: T,
  path: string,
): Promise<ApiResult<Payload>> {
  try {
    const res = await api.post<RegisterResponse>(path, data);
    const { success, payload, message } = res.data;

    if (!success) return { ok: false, error: new Error(message) };

    return { ok: true, data: payload };
  } catch (error) {
    if (isAxiosError(error)) return { ok: false, error: error };

    return {
      ok: false,
      error: new Error("Unexpected error: ", { cause: error }),
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
