import AsyncStorage from "@react-native-async-storage/async-storage";
import { RelativePathString, useRouter } from "expo-router";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  signIn: (token: string, role: string) => void;
  signOut: () => void;
  token: string | null;
  isLoading: boolean;
  role: "ngo" | "donor" | "composter" | "carehome" | "admin" | null;
};

const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
  token: null,
  isLoading: true,
  role: null,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("@token").then((t) => {
      setToken(t);
      setIsLoading(false);
    });
    AsyncStorage.getItem("@role").then((r) => {
      setRole(r);
    });
  }, []);

  const signIn = useCallback(async (t: string, role: string) => {
    await AsyncStorage.setItem("@token", t);
    await AsyncStorage.setItem("@role", role);
    setToken(t);
    setRole(role);
    router.replace("/");
  }, []);
  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@role");
    setToken(null);
    setRole(null);
    router.replace("/login" as RelativePathString);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, token, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
