import api from "@/config/axios-config";
import { LoginUser, RegisterUser } from "@/interfaces/user-interface";
import { toast } from "sonner";

export const register = async (data: RegisterUser) => {
  delete data.confirmPassword;
  const url = "/api/Auth/register";
  const response = await api.post(url, data);
  if (response?.status === 200) {
    toast.success(
      "Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản."
    );
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  }
};

export const login = async (data: LoginUser) => {
  const url = "/api/Auth/login";
  const response = await api.post(url, data);
  if (response?.status === 200) {
    const user = response.data.result.user;
    console.log("User data:", user);
    if (user.emailConfirmed === false) {
      throw new Error("Email not confirmed");
    }
    const role = response.data.result.role[0];
    user.role = role;
    const accessToken = response.data.result.token;
    const refreshToken = response.data.result.refreshToken;

    return {
      user,
      accessToken,
      refreshToken,
      role,
    };
  }
};

export const getStudentInfoByUserID = async (userId: string) => {
  const url = `/api/Student/user/${userId}`;
  const response = await api.get(url, {
    requiresAuth: true,
  });
  if (response?.status === 200) {
    console.log("Student info:", response);
    return response.data;
  } else {
    throw new Error("Failed to fetch student info");
  }
};

export const getEmployerInfoByUserID = async (userId: string) => {
  const url = `/api/Employer/user/${userId}`;
  const response = await api.get(url, {
    requiresAuth: true,
  });
  if (response?.status === 200) {
    console.log("Employer info:", response);
    return response.data;
  } else {
    throw new Error("Failed to fetch employer info");
  }
};
