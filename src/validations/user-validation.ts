import { LoginUser, UserInterface } from "@/interfaces/user-interface";
import * as Yup from "yup";
export const RegisterValidationSchema: Yup.ObjectSchema<UserInterface> =
  Yup.object({
    userId: Yup.string().optional(),
    avatarUrl: Yup.string().optional(),
    emailConfirmed: Yup.boolean().optional(),
    rating: Yup.number().optional(),
    isActive: Yup.boolean().optional(),
    firstName: Yup.string()
      .required("Họ không được để trống")
      .max(50, "Họ không được quá 50 ký tự"),
    lastName: Yup.string()
      .required("Tên không được để trống")
      .max(50, "Tên không được quá 50 ký tự"),
    userName: Yup.string()
      .required("Tên đăng nhập không được để trống")
      .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự")
      .max(50, "Tên đăng nhập không được quá 50 ký tự"),
    email: Yup.string()
      .required("Email không được để trống")
      .email("Email không hợp lệ"),
    phoneNumber: Yup.string()
      .required("Số điện thoại không được để trống")
      .matches(
        /^(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        "Số điện thoại không hợp lệ"
      ),
    password: Yup.string()
      .required("Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu ít nhất 6 ký tự")
      .matches(/[A-Z]/, "Cần ít nhất 1 chữ in hoa")
      .matches(/[a-z]/, "Cần ít nhất 1 chữ thường")
      .matches(/[0-9]/, "Cần ít nhất 1 chữ số")
      .matches(/[^A-Za-z0-9]/, "Cần ít nhất 1 ký tự đặc biệt"),
    confirmPassword: Yup.string()
      .required("Nhập lại mật khẩu không được để trống")
      .oneOf([Yup.ref("password")], "Mật khẩu không khớp"),

    role: Yup.mixed<"Student" | "Employer">()
      .oneOf(["Student", "Employer"], "Vui lòng chọn vai trò")
      .required("Vai trò không được để trống"),
  });

export const getPasswordRules = (password: string) => ({
  length: password.length >= 6,
  hasUppercase: /[A-Z]/.test(password),
  hasLowercase: /[a-z]/.test(password),
  hasNumber: /[0-9]/.test(password),
  hasSpecialChar: /[^A-Za-z0-9]/.test(password),
});

export const LoginValidationSchema: Yup.ObjectSchema<LoginUser> = Yup.object({
  usernameOrEmail: Yup.string().required(
    "Tên đăng nhập hoặc email là bắt buộc"
  ),
  password: Yup.string().required("Mật khẩu là bắt buộc"),
});
