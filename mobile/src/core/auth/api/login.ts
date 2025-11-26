import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { FastifyError } from "@/src/types/fastify";
import { loginType } from "@/src/validation/login.schema";
import { AxiosError, isAxiosError } from "axios";

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
    const res = await api.post<
      ApiResponse<Payload | AxiosError<{ message: string }>>
    >("/auth/login", {
      email,
      password,
    });

    const { success, payload, message } = res.data;

    if (!success) {
      const errMsg = (payload as AxiosError<{ message: string }>).response?.data
        .message;
      return {
        ok: false,
        error: new Error(errMsg ?? "Something went wrong, try again!"),
        message,
      };
    }

    return { ok: true, data: payload as Payload, message };
  } catch (error) {
    if (isAxiosError(error))
      return {
        ok: false,
        error: new Error(error.response?.data.message),
        message: "Unexpected errror",
      };
    return {
      ok: false,
      error: new Error("Unexpected error:", { cause: error }),
      message: "Unexpected errror",
    };
  }
}
