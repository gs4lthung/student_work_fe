import { ApplicationInterface } from "@/interfaces/application-interface";
import * as Yup from "yup";

export const ApplicationValidationSchema: Yup.ObjectSchema<ApplicationInterface> =
  Yup.object({
    stt: Yup.string().optional(),
    studentID: Yup.string().required("Mã sinh viên không được để trống"),
    jobID: Yup.string()
      .required("Mã công việc không được để trống")
      .matches(/^[a-zA-Z0-9-]+$/, "Mã công việc không hợp lệ"),
    resumeID: Yup.string()
      .required("Mã CV không được để trống")
      .matches(/^[a-zA-Z0-9-]+$/, "Mã CV không hợp lệ"),
    coverletter: Yup.string()
      .required("Thư xin việc không được để trống")
      .max(1000, "Thư xin việc không được quá 1000 ký tự"),
    status: Yup.mixed<
      "PENDING" | "APPROVED" | "WORKING" | "REJECTED" | "FINISHED" | "DELETE"
    >()
      .oneOf(
        ["PENDING", "APPROVED", "REJECTED", "WORKING", "FINISHED", "DELETE"],
        "Trạng thái không hợp lệ"
      )
      .required("Trạng thái không được để trống"),
    appliedAt: Yup.date()
      .optional()
      .default(() => new Date()),
    updateAt: Yup.date()
      .optional()
      .default(() => new Date())
      .min(Yup.ref("appliedAt"), "Ngày cập nhật phải sau ngày nộp đơn"),
  });
