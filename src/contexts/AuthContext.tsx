import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageTokenSave } from "@storage/storageToken";
import { storageUserGet, storageUserSave } from "@storage/storageUser";
import { User } from "lucide-react-native";
import { createContext, ReactNode, useEffect, useState } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
  setUser: (user: UserDTO) => void;
  signIn: (email: string, password: string) => Promise<void>;
  loadingStorageUser: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [token, setToken] = useState<string | null>(null);
  const [loadingStorageUser, setLoadingStorageUser] = useState(true);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.token && data.user) {
        setUser(data.user);
        storageUserSave(data.user);

        setToken(data.token);
        storageTokenSave(data.token);

        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      }
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      const userData = await storageUserGet();

      if (userData) {
        setUser(userData);
        setLoadingStorageUser(false);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoadingStorageUser(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, setUser, loadingStorageUser }}>
      {children}
    </AuthContext.Provider>
  );
}
