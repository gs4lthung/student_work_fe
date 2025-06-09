import { JobInterface } from "@/interfaces/job-interface";
import * as Yup from "yup";

export const JobValidationSchema: Yup.ObjectSchema<JobInterface> = Yup.object({
  title: Yup.string()
    .required("Tiêu đề không được để trống")
    .max(50, "Tiêu đề không được quá 50 ký tự"),
  category: Yup.string()
    .required("Loại công việc không được để trống")
    .max(50, "Loại công việc không được quá 50 ký tự"),
  description: Yup.string()
    .required("Mô tả công việc không được để trống")
    .max(2000, "Mô tả công việc không được quá 2000 ký tự"),
  requirements: Yup.array()
    .of(
      Yup.string()
        .max(500, "Yêu cầu không được quá 500 ký tự")
        .required("Yêu cầu không được để trống")
    )
    .required("Yêu cầu công việc không được để trống"),
  location: Yup.string()
    .required("Địa điểm làm việc không được để trống")
    .max(100, "Địa điểm làm việc không được quá 100 ký tự"),
  salary: Yup.number()
    .required("Mức lương không được để trống")
    .min(0, "Mức lương phải lớn hơn hoặc bằng 0"),
  status: Yup.mixed<"Active" | "Inactive">()
    .oneOf(["Active", "Inactive"], "Trạng thái không hợp lệ")
    .required("Trạng thái không được để trống"),
  workingHours: Yup.string()
    .required("Giờ làm việc không được để trống")
    .max(100, "Giờ làm việc không được quá 100 ký tự"),
  startDate: Yup.date()
    .required("Ngày bắt đầu không được để trống")
    .min(new Date(), "Ngày bắt đầu phải là ngày trong tương lai"),
  endDate: Yup.date()
    .required("Ngày kết thúc không được để trống")
    .min(Yup.ref("startDate"), "Ngày kết thúc phải sau ngày bắt đầu"),
  imageUrl: Yup.string()
    .url("URL hình ảnh không hợp lệ")
    .optional()
    .max(500, "URL hình ảnh không được quá 500 ký tự"),
  employerId: Yup.string().optional(),
  subscriptionId: Yup.string().optional(),
  id: Yup.string().optional(),
});
