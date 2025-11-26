import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { PersonalDetails } from "@/src/types/carehome";
import { FastifyError } from "@/src/types/fastify";
import { isAxiosError } from "axios";

export default async function getCarehomeDetails(): Promise<
  ApiResult<PersonalDetails>
> {
  try {
    const res = await api.get<ApiResponse<PersonalDetails | FastifyError>>(
      "/carehome/personal-details",
    );
    const { success, payload, message } = res.data;

    if (!success) {
      return { ok: false, error: res.data.payload as FastifyError, message };
    }

    return { ok: true, data: payload as PersonalDetails, message };
  } catch (err) {
    if (isAxiosError<ApiResponse<PersonalDetails>>(err)) {
      return {
        ok: false,
        error: err,
        message: err.response?.data.message ?? "Unexpected error",
      };
    }
    return {
      ok: false,
      error: {
        name: "Unexpected error",
        message: "Something went wrong while fetching donation history",
      },
      message: "Unexpected error",
    };
  }
}
