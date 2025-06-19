"use client";

import {
  getEmployerInfoByUserID,
  getStudentInfoByUserID,
} from "@/api/user-api";
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

export default function LoginPage() {
  const [redirect, setRedirect] = useState("/"); // Default redirect
  const router = useRouter();
  const initialValues: LoginUser = {
    usernameOrEmail: "",
    password: "",
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const redirectParam = params.get("redirect") || "/";
      console.log("Redirect param:", redirectParam);
      setRedirect(redirectParam);

      // Show toasts based on redirect
      // if (redirectParam.includes("cv")) {
      //   toast.error("Bạn cần đăng nhập để xem CV");
      // } else if (redirectParam.includes("job")) {
      //   toast.error("Bạn cần đăng nhập để xem công việc");
      // } else if (redirectParam.includes("company")) {
      //   toast.error("Bạn cần đăng nhập để xem công ty");
      // } else if (redirectParam.includes("profile")) {
      //   toast.error("Bạn cần đăng nhập để xem hồ sơ cá nhân");
      // } else if (redirectParam !== "/") {
      //   toast.error("Bạn cần đăng nhập để truy cập trang này");
      // }
    }
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const res = await axios.post("/api/auth/login", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res) {
          console.log("Login response:", res.data);
          useUserStore.getState().setUser(res.data.result.user);

          if (res.data.result.role === "Student") {
            const studentRes = await getStudentInfoByUserID(
              res.data.result.user.userId
            );
            const currentUser = useUserStore.getState().user;
            if (currentUser) {
              useUserStore.getState().setUser({
                ...currentUser,
                studentID: studentRes.studentID,
                university: studentRes.university,
                major: studentRes.major,
                yearOfStudy: studentRes.yearOfStudy,
                dateOfBirth: studentRes.dateOfBirth,
                bio: studentRes.bio,
              });
            }
          } else if (res.data.result.role === "Employer") {
            const employerRes = await getEmployerInfoByUserID(
              res.data.result.user.userId
            );
            const currentUser = useUserStore.getState().user;
            if (currentUser) {
              useUserStore.getState().setUser({
                ...currentUser,
                employerID: employerRes.employerID,
                companyName: employerRes.companyName,
                companySize: employerRes.companySize,
                description: employerRes.description,
                industry: employerRes.industry,
                location: employerRes.location,
                website: employerRes.website,
                logoUrl: employerRes.logoUrl,
              });
            }
          }

        }
        setSubmitting(false);
        console.log("Login successful, redirecting to:", redirect);
        router.push(redirect);
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
      }) => {
        return (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TypographyH2>Chào mừng bạn đã quay trở lại</TypographyH2>
            <p className="text-gray-500 text-sm mb-4">
              Đăng nhập để tiếp tục sử dụng ứng dụng của chúng tôi
            </p>
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
            <Button
              disabled={isSubmitting}
              className="w-full hover:bg-green-300"
              variant="secondary"
              type="submit"
            >
              {isSubmitting ? <LoadingSpinner /> : <p>Đăng nhập</p>}
            </Button>
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
            <Button
              className="w-full bg-red-400 hover:bg-red-500 dark:bg-red-400 dark:hover:bg-red-500 text-white"
              variant="secondary"
              type="submit"
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
        );
      }}
    </Formik>
  );
}
