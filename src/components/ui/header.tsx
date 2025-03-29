"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TypographyH2 } from "./typography";
import { usePathname, useRouter } from "next/navigation";
import {
  Briefcase,
  CircleUserRound,
  FileUser,
  Heart,
  LayoutDashboard,
  Lock,
  LogOut,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Badge } from "./badge";

const items = [
  {
    title: "Trang chủ",
    url: "/",
  },
  {
    title: "Hồ sơ & CV",
    url: "/cv/add",
  },
  {
    title: "Tin tuyển dụng",
    url: "/post",
    subMenu: [
      {
        title: "Tìm kiếm việc làm",
        url: "/post",
      },
      {
        title: "Tạo tin tuyển dụng",
        url: "/post/add",
      },
      {
        title: "Chọn dịch vụ tuyển dụng",
        url: "/service",
      },
    ],
  },
  {
    title: "Nhà tuyển dụng",
    url: "#",
  },
  {
    title: "Ứng viên",
    url: "#",
  },
];

const profileItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "CV của tôi",
    url: "/dashboard/cv",
    icon: <FileUser />,
  },
  {
    title: "Việc làm đã lưu",
    url: "/dashboard/saved-jobs",
    icon: <Heart />,
  },
  {
    title: "Việc làm đã ứng tuyển",
    url: "/dashboard/applied-jobs",
    icon: <Briefcase />,
  },
  {
    title: "Đổi mật khẩu",
    url: "/dashboard/change-password",
    icon: <Lock />,
  },
  {
    title: "Cài đặt",
    url: "/dashboard/settings",
    icon: <Settings />,
  },
  {
    title: "Đăng xuất",
    url: "/logout",
    icon: <LogOut />,
  },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const nonDashboardPaths = [
    "/dashboard",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/verify-email/success",
    "/verify-email/verify",
  ];
  const isDashboard = nonDashboardPaths.some((path) =>
    pathname.startsWith(path)
  );
  if (isDashboard) {
    return null;
  }

  return (
    <>
      <div className="h-10 w-full bg-gradient-to-b from-white to-green-50">
        <div className="flex h-full items-center justify-center gap-4">
          <p className="text-sm text-green-800 font-semibold">
            Nền tảng tuyển dụng thông minh - Hỗ trợ tìm kiếm việc làm
            <strong> Part-time</strong> một cách dễ dàng
          </p>
          <Button className="h-5 text-xs">Tìm việc ngay</Button>
        </div>
      </div>
      <header className="sticky top-0 bg-white overflow-x-hidden border-b-2 shadow-2xs flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Link
          href="/"
          className="mr-6 hidden lg:flex items-center gap-2"
          prefetch={false}
        >
          <Image
            className="bg-white"
            src="https://greenempowerment.org/wp-content/uploads/2022/01/GE__Sun-Mark-GE-Green.png"
            alt="Logo"
            width={60}
            height={60}
          />

          <TypographyH2 className="text-green-800">Student Work</TypographyH2>
        </Link>
        <div className="ml-auto flex gap-2">
          {items.map((item) =>
            !item.subMenu ? (
              <Link
                key={item.title}
                href={item.url}
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false}
              >
                {item.title}
              </Link>
            ) : (
              <DropdownMenu key={item.title}>
                <DropdownMenuTrigger>
                  <Link
                    href={item.url}
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                    prefetch={false}
                  >
                    {item.title}
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.subMenu.map((subItem, index) => (
                    <div key={index} className="font-bold">
                      <DropdownMenuItem>
                        <Link
                          href={subItem.url}
                          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                          prefetch={false}
                        >
                          {subItem.title}
                        </Link>
                      </DropdownMenuItem>
                      {index !== item.subMenu.length - 1 && (
                        <DropdownMenuSeparator className="my-1" />
                      )}
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          )}

          <Button
            variant="outline"
            className="justify-self-end"
            onClick={() => {
              router.push("/login");
            }}
          >
            Đăng nhập
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 justify-self-end"
            onClick={() => {
              router.push("/register");
            }}
          >
            Đăng ký
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link href={"/dashboard"}>
                <Button variant={"outline"} className="justify-self-end">
                  <CircleUserRound />
                </Button>
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-150 max-w-[300px]">
              <DropdownMenuItem>
                <div className="flex flex-row items-center gap-2">
                  <CircleUserRound size={20} />
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-green-500">
                      Lâm Tiên Hưng
                    </p>
                    <p>Mã ứng viên: 123456</p>
                    <p>lamtienhung93@gmail.com</p>
                    <Badge variant="default" className="mt-2">
                      Tài khoản đã xác thực
                    </Badge>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {profileItems.map((item) => (
                <DropdownMenuItem key={item.title}>
                  <Link
                    href={item.url}
                    className="flex flex-row items-center gap-2"
                  >
                    <DropdownMenuShortcut>{item.icon}</DropdownMenuShortcut>
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
