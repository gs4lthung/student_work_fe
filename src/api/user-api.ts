import api from "@/config/axios-config";
import {
  EmployerInterface,
  LoginUser,
  RegisterUser,
  StudentInterface,
} from "@/interfaces/user-interface";
import { AxiosError } from "axios";

export const register = async (data: RegisterUser) => {
  delete data.confirmPassword;
  const url = "/api/Auth/register";
  try {
    const res = await api.post(url, data);
    if (res) return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Registration error:", error);
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  }
};

export const login = async (data: LoginUser) => {
  const url = "/api/Auth/login";
  const response = await api.post(url, data);
  if (response) {
    const user = response.data.result.user;
    console.log("User data:", user);

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
  const url = `/api/Students/user/${userId}`;
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

export const getEmployerInfoByID = async (employerId: string) => {
  const url = `/api/Employer/${employerId}`;
  const response = await api.get(url, {
    requiresAuth: true,
  });
  if (response?.status === 200) {
    console.log("Employer info by ID:", response);
    return response.data;
  } else {
    throw new Error("Failed to fetch employer info by ID");
  }
};

export const createEmployerInfo = async (data: EmployerInterface) => {
  console.log("Creating employer info with data:", data);
  const payload = { ...data, companySize: data.companySize.toString() };
  const url = `/api/Employer`;
  const response = await api.post(url, payload, {
    requiresAuth: true,
  });
  if (response) {
    console.log("Created employer info:", response);
    return response.data;
  }
};

export const createStudentInfo = async (data: StudentInterface) => {
  console.log("Creating student info with data:", data);
  const payload = {
    ...data,
    yearOfStudy:
      data.yearOfStudy !== undefined && data.yearOfStudy !== null
        ? data.yearOfStudy.toString()
        : "",
  };
  const url = `/api/Students`;
  const response = await api.post(url, payload, {
    requiresAuth: true,
  });
  if (response) {
    console.log("Created student info:", response);
    return response.data;
  }
};
