import api from "@/config/axios-config";
import { LoginUser, RegisterUser } from "@/interfaces/user-interface";
import { useUserStore } from "@/stores/user-store";
import { toast } from "sonner";

export const register = async (data: RegisterUser) => {
  delete data.confirmPassword;
  const url = "/api/Auth/register";
  const response = await api.post(url, data);
  if (response.status === 200) {
    toast.success(
      "Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản."
    );
  }
};

export const login = async (data: LoginUser) => {
  const url = "/api/Auth/login";
  const response = await api.post(url, data);
  if (response.status === 200) {
    const user = response.data.result.user;
    console.log("User data:", user);
    if (user.emailConfirmed=== false) {
      toast.error("Vui lòng xác thực email trước khi đăng nhập.");
      throw new Error("Email not confirmed");
    }
    const role = response.data.result.role[0];
    user.role = role;
    const accessToken = response.data.result.token;
    const refreshToken = response.data.result.refreshToken;

    useUserStore.getState().setUser(user);

    document.cookie = `accessToken=${accessToken}; path=/; secure; SameSite=Strict`;
    document.cookie = `refreshToken=${refreshToken}; path=/; secure; SameSite=Strict`;
    document.cookie = `userRole=${role}; path=/; secure; SameSite=Strict`;
    toast.success("Đăng nhập thành công!");
  }
};
