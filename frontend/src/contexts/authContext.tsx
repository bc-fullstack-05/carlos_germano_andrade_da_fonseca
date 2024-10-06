import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AuthContextModel } from "../models/authContextModel";
import { User } from "../models/userModel";
import { album_api, api, getHeaders } from "../services/apiService";
import { Auth } from "../models/auth";
import {
  deleteLocalStorage,
  getLocalStorage,
  saveLocalStorage,
} from "../services/storage";

export const AuthContext = createContext({} as AuthContextModel);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const auth: Auth = getLocalStorage("auth_data");
    if (auth.user?.id) {
      setIsAuthenticated(true);
      setUser(auth.user);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const user: User = {
      email: email,
      password: password,
    };
    let response = await api.post(
      "users/auth",
      JSON.stringify(user),
      getHeaders()
    );
    if (response instanceof Error) {
      throw response;
    }
    console.log(response.data);
    const auth: Auth = {
      token: response.data.token,
      user: {
        id: response.data.id,
      },
    };
    response = await api.get(`users/${auth.user?.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    });
    if (response instanceof Error) {
      throw response;
    }
    console.log(response);
    auth.user = response.data as User;
    setIsAuthenticated(true);
    setUser(auth.user);
    saveLocalStorage("auth_data", auth);
    album_api.defaults.headers.common.Authorization = `Bearer ${auth.token}`;
    console.log(isAuthenticated)
  }, []);

  const logout = useCallback(() => {
    deleteLocalStorage('auth_data');
    setUser(undefined);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        isLoading: isLoading,
        user: user,
        login: login,
        logout: logout,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}