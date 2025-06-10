import axios from "axios";
import { toast } from "sonner";

// Extend Axios request config to include requiresAuth
declare module "axios" {
  export interface InternalAxiosRequestConfig {
    requiresAuth?: boolean;
    _retry?: boolean;
  }
}

const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // if using refresh token from HttpOnly cookie
});

export async function getAuthToken() {
  return {
    accessToken: document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken=")),
    refreshToken: document.cookie
      .split("; ")
      .find((row) => row.startsWith("refreshToken=")),
  };
}

export function logout() {

}

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
    if (response.status === 200 || response.status === 201) {
      toast.success(response.statusText);
    }
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

        try {
          const response = await api.post("/auth/refresh");
          const newAccessToken = response.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);

          processQueue(null, newAccessToken);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // 🔐 Other common HTTP errors
      if (status === 401) {
        toast.error("Bạn cần đăng nhập để thực hiện hành động này.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else if (status === 403) {
        toast.error("Bạn không có quyền truy cập vào tài nguyên này.");
      } else if (status === 404) {
        toast.error("Tài nguyên bạn đang tìm kiếm không tồn tại.");
      } else if (status >= 500) {
        toast.error("Máy chủ gặp sự cố. Vui lòng thử lại sau.");
      } else {
        toast.error(
          `Đã xảy ra lỗi: ${
            error.response.data.message || "Lỗi không xác định"
          }`
        );
      }
    } else if (error.request) {
      toast.error("Không nhận được phản hồi từ máy chủ.");
    } else {
      toast.error(`Đã xảy ra lỗi: ${error.message || "Lỗi không xác định"}`);
    }

    return Promise.reject(error);
  }
);

export default api;
