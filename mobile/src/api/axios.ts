import axios, { AxiosError } from "axios";
import Constants from "expo-constants";

export type ApiResult<T, E = Error> =
  | { ok: true; data: T; message: string }
  | { ok: false; error: E; message: string };

export type ApiResponse<T> = {
  success: boolean;
  payload: T;
  message: string;
};

const baseURL = Constants.expoConfig?.extra?.apiUrl;

export const api = axios.create({
  baseURL: baseURL || process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
