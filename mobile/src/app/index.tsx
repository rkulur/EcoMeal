import { Redirect } from "expo-router";
import { useAuth } from "../core/auth/AuthProvider";

export default function Index() {
  const { token } = useAuth();

  if (!token) return <Redirect href={"/register/ngo/step1"} />;
  return <Redirect href={"/donor/dashboard"} />;
}
