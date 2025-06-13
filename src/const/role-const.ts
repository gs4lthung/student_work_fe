import {
  Briefcase,
  FileUser,
  Heart,
  LayoutDashboard,
  LogOut,
  Wallet,
} from "lucide-react";

export const STUDENT = "Student";
export const EMPLOYER = "Employer";

export const roleConst = {
  STUDENT,
  EMPLOYER,
  mappedRoutes: [
    {
      title: "Trang chủ",
      url: "/",
      isPublic: true,
      isHeader: true,
    },
    {
      title: "Hồ sơ và CV",
      url: "/cv/add",
      isPublic: false,
      roles: [STUDENT],
      isHeader: true, // Visible to all
    },
    {
      title: "Đăng công việc",
      url: "/job/add",
      isPublic: false,
      roles: [EMPLOYER],
      isHeader: true, // Visible to all
    },
    {
      title: "Tìm kiếm công việc",
      url: "/job",
      isPublic: true,
      isHeader: true, // Visible to all
    },
    {
      title: "Chi tiết công việc",
      url: "/job/:id",
      isPublic: true,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      isPublic: false,
      roles: [EMPLOYER, STUDENT],
      icon: LayoutDashboard,
    },
    {
      title: "CV của tôi",
      url: "/dashboard/cv",
      isPublic: false,
      roles: [STUDENT],
      icon: FileUser,
    },
    {
      title: "Nạp SPoint",
      url: "/payment",
      isPublic: false,
      icon: Wallet,
    },
    {
      title: "Việc làm đã lưu",
      url: "/dashboard/saved-jobs",
      isPublic: false,
      roles: [STUDENT],
      icon: Heart,
    },
    {
      title: "Việc làm đã ứng tuyển",
      url: "/dashboard/applied-jobs",
      isPublic: false,
      roles: [STUDENT],
      icon: Briefcase,
    },
    {
      title: "Đăng xuất",
      url: "/logout",
      isPublic: false,
      roles: [STUDENT, EMPLOYER],
      icon: LogOut,
    },
    {
      title: "Đăng nhập",
      url: "/login",
      isPublic: true,
      isHeader: false,
    },
    {
      title: "Đăng ký",
      url: "/register",
      isPublic: true,
      isHeader: false,
    },
  ],
};