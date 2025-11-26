import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { FastifyError } from "@/src/types/fastify";
import { AvailableDonation } from "@/src/types/donor";
import { isAxiosError } from "axios";

type Role = "ngo" | "carehome";

export default async function getAvailableDonations(
  role: Role,
  path?: string,
): Promise<ApiResult<AvailableDonation[]>> {
  try {
    const res = await api.get<ApiResponse<AvailableDonation[] | FastifyError>>(
      `/${role}/${path ?? "available"}-donations`,
    );
    const { success, payload, message } = res.data;

    if (!success) {
      return { ok: false, error: payload as FastifyError, message };
    }

    return { ok: true, data: payload as AvailableDonation[], message };
  } catch (error) {
    if (isAxiosError<ApiResponse<AvailableDonation[]>>(error))
      return {
        ok: false,
        error,
        message: error.response?.data.message ?? "Unexpected error",
      };
    return {
      ok: false,
      error: new Error("Unexpected Error", { cause: error }),
      message: "Unexpected error",
    };
  }
}
