import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { isAxiosError } from "axios";
import { FastifyError } from "@/src/types/fastify";
import { AvailableDonation, DonationType } from "@/src/types/donor";

export default async function getPickedUpDonations(): Promise<
  ApiResult<AvailableDonation[]>
> {
  try {
    const res = await api.get<ApiResponse<AvailableDonation[] | FastifyError>>(
      `/ngo/picked-up-donations`,
    );
    const { success, payload, message } = res.data;

    if (!success) {
      return { ok: false, error: payload as FastifyError, message };
    }

    return { ok: true, data: payload as AvailableDonation[], message };
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
