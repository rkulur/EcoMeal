import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { isAxiosError } from "axios";
import { FastifyError } from "@/src/types/fastify";
import { DonationType } from "@/src/types/donor";
import { CarehomeDetails } from "@/src/types/carehome";

export default async function getCarehomeDetails(
  carehomeId: string,
): Promise<ApiResult<CarehomeDetails>> {
  try {
    const res = await api.get<ApiResponse<CarehomeDetails | FastifyError>>(
      `/ngo/carehome-details/${carehomeId}`,
    );
    const { success, payload, message } = res.data;

    if (!success) {
      return { ok: false, error: payload as FastifyError, message };
    }

    return { ok: true, data: payload as CarehomeDetails, message };
  } catch (error) {
    if (isAxiosError(error))
      return { ok: false, error, message: "Unexpected error occured" };
    return {
      ok: false,
      error: new Error("Unexpected Error", { cause: error }),
      message: "Unexpected error occured",
    };
  }
}
