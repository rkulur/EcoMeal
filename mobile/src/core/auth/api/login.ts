import { api, ApiResult } from "@/src/api/axios";
import { loginType } from "@/src/validation/login.schema";
import { AxiosError, isAxiosError } from "axios";

type LoginResponse = {
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

export default async function login(
  data: loginType,
): Promise<ApiResult<Payload>> {
  const { email, password } = data;
  try {
    const res = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    const { success, payload, message } = res.data;
    if (!success) return { ok: false, error: new Error(message) };
    return { ok: true, data: payload };
  } catch (error) {
    if (isAxiosError(error)) return { ok: false, error };
    return {
      ok: false,
      error: new Error("Unexpected error:", { cause: error }),
    };
  }
}
