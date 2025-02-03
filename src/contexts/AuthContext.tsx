import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import {
  storageTokenGet,
  storageTokenRemove,
  storageTokenSave,
} from "@storage/storageToken";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
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
  const [loadingStorageUser, setLoadingStorageUser] = useState(true);

  async function signOut() {
    try {
      setLoadingStorageUser(true);

      setUser({} as UserDTO);

      await storageUserRemove();
      await storageTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setLoadingStorageUser(false);
    }
  }

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    setUser(userData);
  }
  async function storageUserAndTokenSave(
    userData: UserDTO,
    token: string,
    refresh_token: string
  ) {
    try {
      setLoadingStorageUser(true);
      await storageUserSave(userData);
      await storageTokenSave({ token, refresh_token });
    } catch (error) {
      throw error;
    } finally {
      setLoadingStorageUser(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.token && data.user && data.refresh_token) {
        await storageUserAndTokenSave(
          data.user,
          data.token,
          data.refresh_token
        );
        setUser(data.user);

        console.log(data.refresh_token);
      }
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      setLoadingStorageUser(true);
      const userData = await storageUserGet();
      const { token } = await storageTokenGet();

      if (token && userData) {
        userAndTokenUpdate(userData, token);
        setUser(userData);
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

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, setUser, loadingStorageUser }}>
      {children}
    </AuthContext.Provider>
  );
}
