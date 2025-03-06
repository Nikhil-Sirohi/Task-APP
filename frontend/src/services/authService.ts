import api from "./api";
import { User } from "../types/auth";

export const signup = async (email: string, password: string) => {
  const response = await api.post<{ token: string; user: User }>(
    "/auth/signup",
    {
      email,
      password,
    }
  );
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post<{ token: string; user: User }>(
    "/auth/login",
    {
      email,
      password,
    }
  );
  return response.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};
