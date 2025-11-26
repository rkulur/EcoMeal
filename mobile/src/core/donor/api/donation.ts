import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { CreateDonationInput, DonationType } from "@/src/types/donor";
import { FastifyError } from "@/src/types/fastify";
import { isAxiosError } from "axios";

export async function postDonation(
  data: CreateDonationInput,
): Promise<ApiResult<{ _id: string }>> {
  try {
    const res = await api.post<ApiResponse<{ _id: string } | FastifyError>>(
      "/donor/donation",
      data,
    );
    const { success, payload, message } = res.data;

    if (!success) {
      return { ok: false, error: payload as FastifyError, message };
    }

    return { ok: true, data: payload as { _id: string }, message };
  } catch (error) {
    if (isAxiosError(error))
      return { ok: false, error: error, message: "Unexpected Error" };

    return {
      ok: false,
      error: new Error("Unexpected error", { cause: error }),
      message: "Unexpected Error",
    };
  }
}

export async function getDonationById(
  path: string,
): Promise<ApiResult<DonationType>> {
  try {
    const res = await api.get<ApiResponse<DonationType | FastifyError>>(path);
    const { success, payload, message } = res.data;

    if (!success) {
      const error = payload as FastifyError;
      return { ok: false, error, message };
    }

    return { ok: true, data: payload as DonationType, message };
  } catch (error) {
    if (isAxiosError<ApiResponse<DonationType>>(error))
      return {
        ok: false,
        error: error,
        message: error.response?.data.message ?? "Unexpected error",
      };

    return {
      ok: false,
      error: new Error("Unexpected error", { cause: error }),
      message: "Unexpected Error",
    };
  }
}
