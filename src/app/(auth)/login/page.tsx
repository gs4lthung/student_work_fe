"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/input-password";
import { TypographyH2 } from "@/components/ui/typography";
import { LoginValidationSchema } from "@/validations/user-validation";
import { LoginUser } from "@/interfaces/user-interface";
import { Form, Formik } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/loading-spinner";
import axios from "axios";
import { useUserStore } from "@/stores/user-store";
import { toast } from "sonner";

export default function LoginPage() {
  const [redirect, setRedirect] = useState("/");
  const router = useRouter();

  const initialValues: LoginUser = {
    usernameOrEmail: "",
    password: "",
  };

  useEffect(() => {
    window.localStorage.setItem("isCheckedRoles", "false");

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      let redirectParam = params.get("redirect") || "/";

      // ✅ Ensure it's a relative path
      if (!redirectParam.startsWith("/")) {
        redirectParam = "/";
      }

      console.log("[LoginPage] Redirect param:", redirectParam);
      setRedirect(redirectParam);

      // Show toast based on path
      if (redirectParam.includes("cv")) {
        toast.error("Bạn cần đăng nhập để xem CV");
      } else if (redirectParam.includes("job")) {
        toast.error("Bạn cần đăng nhập để xem công việc");
      } else if (redirectParam.includes("company")) {
        toast.error("Bạn cần đăng nhập để xem công ty");
      } else if (redirectParam.includes("profile")) {
        toast.error("Bạn cần đăng nhập để xem hồ sơ cá nhân");
      } else if (redirectParam !== "/") {
        toast.error("Bạn cần đăng nhập để truy cập trang này");
      }
    }
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          const res = await axios.post("/api/auth/login", values, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // ✅ Ensures cookies are sent & received
          });

          if (res?.data?.result?.user) {
            console.log("[LoginPage] Login response:", res.data);
            useUserStore.getState().setUser(res.data.result.user);
            toast.success("Đăng nhập thành công");
          }

          console.log("[LoginPage] Login successful, redirecting to:", redirect);
          router.push(redirect);
        } catch (error) {
          console.error("[LoginPage] Login error:", error);
          if (axios.isAxiosError(error)) {
            toast.error(
              error.response?.data?.error?.errorMessages?.[0] ||
                "Đăng nhập thất bại"
            );
          } else {
            toast.error("Đăng nhập thất bại");
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
      }) => (
        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TypographyH2>Chào mừng bạn đã quay trở lại</TypographyH2>
          <p className="text-gray-500 text-sm mb-4">
            Đăng nhập để tiếp tục sử dụng ứng dụng của chúng tôi
          </p>

          {/* Username or Email */}
          <Input
            name="usernameOrEmail"
            placeholder="Username hoặc Email"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.usernameOrEmail}
          />
          {errors.usernameOrEmail && touched.usernameOrEmail && (
            <p className="text-red-500 text-sm">{errors.usernameOrEmail}</p>
          )}

          {/* Password */}
          <PasswordInput
            name="password"
            placeholder="Mật khẩu"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          {/* Submit */}
          <Button
            disabled={isSubmitting}
            className="w-full hover:bg-green-300"
            variant="secondary"
            type="submit"
          >
            {isSubmitting ? <LoadingSpinner /> : <p>Đăng nhập</p>}
          </Button>

          {/* Links */}
          <div className="flex items-center justify-between w-full">
            <Button variant="link" className="text-gray-500">
              Quên mật khẩu?
            </Button>
            <Link href="/register">
              <Button variant="link" className="text-blue-500">
                Đăng ký ngay
              </Button>
            </Link>
          </div>

          {/* Google Login */}
          <Button
            className="w-full bg-red-400 hover:bg-red-500 dark:bg-red-400 dark:hover:bg-red-500 text-white"
            variant="secondary"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path
                fill="none"
                stroke="white"
                strokeWidth="35"
                d="M488 261.8C488 403.3 391.1 504 248 504 
                110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 
                123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 
                94.3 116.6 94.3 256c0 86.5 69.1 156.6 
                153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 
                12.7 3.9 24.9 3.9 41.4z"
              />
            </svg>
            <p>Đăng nhập với Google</p>
          </Button>
        </Form>
      )}
    </Formik>
  );
}
