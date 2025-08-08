import { Redirect } from "expo-router";
import { useAuth } from "../core/auth/AuthProvider";

export default function Index() {
  const { token, role } = useAuth();

  // if (!token) return <Redirect href={"/donor/history"} />;
  if (!token) return <Redirect href={"/login"} />;
  if (role == "donor") return <Redirect href={"/donor/dashboard"} />;
  if (role == "ngo") return <Redirect href={"/ngo/dashboard"} />;
  if (role == "carehome") return <Redirect href={"/carehome/dashboard"} />;
  if (role == "composter") return <Redirect href={"/composter/dashboard"} />;
}
