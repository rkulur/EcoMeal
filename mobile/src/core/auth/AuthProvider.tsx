import { RelativePathString, useRouter } from "expo-router";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";

type AuthContextType = {
  signIn: (
    token: string,
    role: "ngo" | "donor" | "composter" | "carehome" | "admin",
  ) => void;
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
  const [role, setRole] = useState<AuthContextType["role"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync("token").then((t) => {
      setToken(t);
      setIsLoading(false);
    });
    SecureStore.getItemAsync("role").then((r) => {
      setRole(r as AuthContextType["role"]);
    });
  }, []);

  const signIn = useCallback(
    async (
      t: string,
      role: "ngo" | "donor" | "composter" | "carehome" | "admin",
    ) => {
      try {
        await SecureStore.setItemAsync("token", t);
        await SecureStore.setItemAsync("role", role);
        setToken(t);
        setRole(role);
        router.replace("/");
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );
  const signOut = useCallback(async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("role");
    setToken(null);
    setRole(null);
    console.log("Inside signout");
    router.replace("/login" as RelativePathString);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, token, isLoading, role }}>
      {children}
    </AuthContext.Provider>
  );
}
