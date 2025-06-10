"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import React from "react";
import { Form, Formik } from "formik";
import { RegisterUser } from "@/interfaces/user-interface";
import {
  getPasswordRules,
  RegisterValidationSchema,
} from "@/validations/user-validation";
import { TypographyH2 } from "@/components/ui/typography";
import { PasswordInput } from "@/components/ui/input-password";
import { register } from "@/api/user-api";
import { useRouter } from "next/navigation";
export default function RegisterPage() {
  const router = useRouter();
  const initialValues: RegisterUser = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "Student",
    confirmPassword: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegisterValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        alert(JSON.stringify(values, null, 2));
        console.log("Submitting registration form with values:", values);
        await register(values).then((response) => {
          if (response.status === 200) {
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          }
        });
        setSubmitting(false);
      }}
    >
      {({
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
      }) => {
        const passwordRules = getPasswordRules(values.password);
        return (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TypographyH2>Chào mừng bạn đến với SWork</TypographyH2>
            <p className="text-gray-500 text-sm mb-4">
              Đăng ký tài khoản để bắt đầu
            </p>
            <div className="flex items-start w-full gap-4">
              <div className="flex flex-col gap-2 w-full">
                <Input
                  name="firstName"
                  placeholder="Họ"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName || ""}
                />
                {errors.firstName && touched.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName || ""}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Input
                  name="lastName"
                  placeholder="Tên"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName || ""}
                />
                {errors.lastName && touched.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
            <Input
              name="userName"
              placeholder="Tên đăng nhập"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userName || ""}
            />
            {errors.userName && touched.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
            )}
            <Input
              name="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email || ""}
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
            <Input
              name="phoneNumber"
              placeholder="Số điện thoại"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNumber || ""}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
            <PasswordInput
              name="password"
              placeholder="Mật khẩu"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password || ""}
            />
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}

            {values.password &&
              !(
                passwordRules.length &&
                passwordRules.hasUppercase &&
                passwordRules.hasLowercase &&
                passwordRules.hasNumber &&
                passwordRules.hasSpecialChar
              ) && (
                <ul className="text-sm text-gray-600 space-y-1 mt-1">
                  <li
                    className={
                      passwordRules.length ? "text-green-600" : "text-red-500"
                    }
                  >
                    • Ít nhất 6 ký tự
                  </li>
                  <li
                    className={
                      passwordRules.hasUppercase
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    • Ít nhất 1 chữ in hoa (A-Z)
                  </li>
                  <li
                    className={
                      passwordRules.hasLowercase
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    • Ít nhất 1 chữ thường (a-z)
                  </li>
                  <li
                    className={
                      passwordRules.hasNumber
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    • Ít nhất 1 chữ số (0-9)
                  </li>
                  <li
                    className={
                      passwordRules.hasSpecialChar
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    • Ít nhất 1 ký tự đặc biệt (!@#$...)
                  </li>
                </ul>
              )}

            <PasswordInput
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword || ""}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
            <div className="flex items-center justify-between w-full gap-4">
              <p>Bạn là ?</p>
              <RadioGroup
                value={values.role || "Student"}
                onValueChange={(value) =>
                  handleChange({ target: { name: "role", value } })
                }
                onBlur={handleBlur}
              >
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="Student" id="student" />
                  <Label htmlFor="student">Ứng viên</Label>
                  <RadioGroupItem value="Employer" id="employer" />
                  <Label htmlFor="employer">Nhà tuyển dụng</Label>
                </div>
              </RadioGroup>
            </div>
            <Button
              className="w-full hover:bg-green-300"
              variant="secondary"
              type="submit"
              disabled={isSubmitting}
            >
              <p>Đăng ký</p>
            </Button>
            <div className="flex items-center justify-between w-full text-sm text-gray-500">
              Đã có tài khoản?
              <Link href="/login">
                <Button variant="link" className="text-blue-500">
                  Đăng nhập ngay
                </Button>
              </Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
