import { useEffect } from "react";
import { useAuth } from "../core/auth/AuthProvider";
import { api } from "./axios";

export const AxiosAuthInterceptor = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { token, signOut } = useAuth();

  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("No token found while sending request");
      }
      return config;
    });

    const resInterceptor = api.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error?.response?.status === 401) {
          console.warn("Unauthorized");
        }
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, [token]);
  return <>{children}</>;
};
