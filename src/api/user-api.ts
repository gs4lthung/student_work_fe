import api from "@/config/axios-config";
import { LoginUser, RegisterUser } from "@/interfaces/user-interface";

export const register = async (data: RegisterUser) => {
  delete data.confirmPassword;
  const url = "/api/Auth/register";
  return await api.post(url, data);
};

export const login = async (data: LoginUser) => {
  const url = "/api/Auth/login";
  return await api.post(url, data);
};
