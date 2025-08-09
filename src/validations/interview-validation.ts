import { InterviewInterface } from "@/interfaces/interview-interface";
import * as Yup from "yup";

export const CreateInterviewSchema: Yup.ObjectSchema<InterviewInterface> =
  Yup.object({
    interviewID: Yup.string().optional(),
    applicationID: Yup.string().required("ID ứng tuyển không được để trống"),
    scheduledTime: Yup.date()
      .required("Thời gian phỏng vấn không được để trống")
      .min(new Date(), "Thời gian phỏng vấn phải là thời gian trong tương lai"),
    duration_minutes: Yup.number()
      .required("Thời gian phỏng vấn không được để trống")
      .min(1, "Thời gian phỏng vấn phải lớn hơn 0")
      .max(480, "Thời gian phỏng vấn không được quá 8 giờ")
      .integer("Thời gian phỏng vấn phải là số nguyên")
      .typeError("Thời gian phỏng vấn phải là một số"),
    location: Yup.string()
      .required("Địa điểm phỏng vấn không được để trống")
      .max(100, "Địa điểm phỏng vấn không được quá 100 ký tự"),
    meetingLink: Yup.string()
      .url("Đường dẫn cuộc họp không hợp lệ")
      .required("Đường dẫn cuộc họp không được để trống"),
    note: Yup.string().optional().max(500, "Ghi chú không được quá 500 ký tự"),
    status: Yup.mixed<
      | "PENDING"
      | "ACCEPTED"
      | "REJECTED"
      | "COMPLETED"
      | "CANCELED"
      | "SCHEDULED"
    >()
      .oneOf(
        [
          "PENDING",
          "ACCEPTED",
          "REJECTED",
          "COMPLETED",
          "CANCELED",
          "SCHEDULED",
        ],
        "Trạng thái không hợp lệ"
      )
      .optional(),
    createdAt: Yup.date().optional(),
    jobTitle: Yup.string().optional(),
    studentName: Yup.string().optional(),
  });
