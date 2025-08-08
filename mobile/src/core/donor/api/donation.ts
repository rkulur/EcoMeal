import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { DonationType } from "@/src/validation/donate.schema";
import { isAxiosError } from "axios";

export type FastifyError = {
  code: string;
  name: string;
  message: string;
  statusCode: number;
};

export async function postDonation(
  data: DonationType,
): Promise<ApiResult<{ _id: string }>> {
  try {
    const res = await api.post<ApiResponse<{ _id: string } | FastifyError>>(
      "/donor/donation",
      data,
    );
    const { success, payload, message } = res.data;

    if (!success) {
      const error = payload as FastifyError;
      return { ok: false, error };
    }

    return { ok: true, data: payload as { _id: string } };
  } catch (error) {
    if (isAxiosError(error)) return { ok: false, error: error };

    return {
      ok: false,
      error: new Error("Unexpected error", { cause: error }),
    };
  }
}

export async function getDonationById(
  id: string,
): Promise<ApiResult<DonationType>> {
  try {
    const res = await api.get<ApiResponse<DonationType | FastifyError>>(
      `/donor/donation/${id}`,
    );
    const { success, payload, message } = res.data;

    if (!success) {
      const error = payload as FastifyError;
      return { ok: false, error };
    }

    return { ok: true, data: payload as DonationType };
  } catch (error) {
    if (isAxiosError(error)) return { ok: false, error: error };

    return {
      ok: false,
      error: new Error("Unexpected error", { cause: error }),
    };
  }
}
