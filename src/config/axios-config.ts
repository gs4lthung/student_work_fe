/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from "axios";

// Extend Axios request config to include requiresAuth
declare module "axios" {
  export interface AxiosRequestConfig {
    requiresAuth?: boolean;
    _retry?: boolean;
  }

  export interface InternalAxiosRequestConfig {
    requiresAuth?: boolean;
    _retry?: boolean;
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 40000,
  headers: {
    // "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // if using refresh token from HttpOnly cookie
});

export async function getAuthToken() {
  return {
    accessToken:
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1] || localStorage.getItem("accessToken"),
    refreshToken:
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("refreshToken="))
        ?.split("=")[1] || localStorage.getItem("refreshToken"),
  };
}

export function logout() {}

api.interceptors.request.use(
  (config) => {
    if (config.requiresAuth) {
      return getAuthToken().then(({ accessToken }) => {
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      });
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
type FailedQueueItem = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const status = error.response.status;
      const originalRequest = error.config;

      if (
        status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/auth/refresh")
      ) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        // try {
        //   const response = await api.post("/auth/refresh");
        //   const newAccessToken = response.data.accessToken;
        //   localStorage.setItem("accessToken", newAccessToken);

        //   processQueue(null, newAccessToken);

        //   originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        //   return api(originalRequest);
        // } catch (refreshError) {
        //   processQueue(refreshError, null);
        //   return Promise.reject(refreshError);
        // } finally {
        //   isRefreshing = false;
        // }
      }

      // 🔐 Other common HTTP errors
      if (status === 400) {
        console.log("Yêu cầu không hợp lệ:", error.response.data);
        throw new AxiosError(
          error.response.data || error?.response?.data.errorMessages[0] ||
            "Yêu cầu không hợp lệ."
        );
      } else if (status === 401) {
        console.log(
          "Phiên đăng nhập đã hết hạn hoặc không hợp lệ:",
          error.response
        );
        throw new AxiosError(
          "Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại."
        );
      } else if (status === 403) {
        throw new AxiosError(
          error?.response?.data?.errorMessages[0] ||
            "Bạn không có quyền truy cập vào tài nguyên này."
        );
      } else if (status === 404) {
        console.log("Tài nguyên không tìm thấy:", error.response);
        throw new AxiosError("Tài nguyên không tìm thấy.");
      } else if (status >= 500) {
        console.log("Lỗi máy chủ:", error);
        throw new AxiosError("Máy chủ gặp sự cố. Vui lòng thử lại sau.");
      } else {
        throw new AxiosError(
          `Đã xảy ra lỗi: ${
            error?.response?.data?.message || "Lỗi không xác định"
          }`
        );
      }
    } else if (error.request) {
      console.error("Không nhận được phản hồi từ máy chủ:", error);
      throw new AxiosError("Không nhận được phản hồi từ máy chủ.");
    } else {
      throw new AxiosError(
        `Đã xảy ra lỗi: ${error.message || "Lỗi không xác định"}`
      );
    }

    return Promise.reject(error);
  }
);

export default api;
