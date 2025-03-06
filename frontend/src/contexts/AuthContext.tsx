import { createContext, useState, ReactNode, useContext } from "react";
import {
  login,
  logout as logoutService,
  signup,
} from "../services/authService";
import { User } from "../types/auth";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const handleLogin = async (email: string, password: string) => {
    const { token, user } = await login(email, password);
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
  };

  const handleSignup = async (email: string, password: string) => {
    const { token, user } = await signup(email, password);
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
  };

  const handleLogout = async () => {
    await logoutService();
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within an AuthProvider");
  return context;
};
