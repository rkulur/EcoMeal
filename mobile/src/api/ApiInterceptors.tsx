// src/api/ApiInterceptor.jsx
import React, { useEffect } from "react";
import { api } from "./axios";
import { useAuth } from "../core/auth/AuthProvider";

export default function ApiInterceptor({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, signOut } = useAuth();

  useEffect(() => {
    const reqId = api.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    const resId = api.interceptors.response.use(
      (res) => res.data,
      (err) => {
        if (err.response?.status === 401) signOut();
        return Promise.reject(err);
      },
    );

    return () => {
      api.interceptors.request.eject(reqId);
      api.interceptors.response.eject(resId);
    };
  }, [token, signOut]);

  return children;
}
