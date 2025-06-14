"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  BellIcon,
  Briefcase,
  CircleUserRound,
  FileUser,
  Heart,
  LayoutDashboard,
  Lock,
  LogOut,
  MessageCircle,
  Settings,
  Wallet,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Badge } from "./badge";
import { ModeToggle } from "./mode-toggle";
import { useUserStore } from "@/stores/user-store";
import { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";
import { toast } from "sonner";

const items = [
  {
    title: "Trang chủ",
    url: "/",
  },
  {
    title: "Hồ sơ & CV",
    url: "/cv/add",
    role: ["Student"],
  },

  {
    title: "Tìm kiếm việc làm",
    url: "/job",
    role: ["Student", "Employer"],
  },
  {
    title: "Đăng tin tuyển dụng",
    url: "/job/add",
    role: ["Employer"],
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
    url: "/dashboard/my-cv",
    icon: <FileUser />,
  },
  {
    title: "Nạp SPoint",
    url: "/payment",
    icon: <Wallet />,
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

const notificationItems = [
  {
    title: "Thông báo",
    description: "Có thông báo mới từ nhà tuyển dụng",
    url: "/dashboard/notifications",
    icon: <BellIcon />,
  },
  {
    title: "Tin nhắn",
    description: "Có tin nhắn mới từ nhà tuyển dụng",
    url: "/dashboard/messages",
    icon: <MessageCircle />,
  },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  const nonDashboardPaths = [
    "/dashboard",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/verify-email/success",
    "/verify-email/verify",
    "/cv/download",
  ];
  const isDashboard = nonDashboardPaths.some((path) =>
    pathname.startsWith(path)
  );

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }
  }, [user]);

  if (isDashboard) {
    return null;
  }

  return (
    <>
      <div className="h-10 w-full bg-gradient-to-r from-yellow-100 to-yellow-300 dark:bg-gradient-to-r dark:from-yellow-400 dark:to-yellow-600">
        <div className="flex h-full items-center justify-center gap-4">
          <p className="text-sm font-extrabold">
            Nền tảng tuyển dụng thông minh ❤️ Hỗ trợ tìm kiếm việc làm một cách
            dễ dàng
          </p>
        </div>
      </div>
      <header className="z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 overflow-x-hidden border-b-2 shadow-2xs flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Link
          href="/"
          className="mr-6 hidden lg:flex items-center gap-2"
          prefetch={false}
        >
          <Image src="/images/logo.png" alt="Logo" width={150} height={60} />
        </Link>
        {isLoading ? (
          <Skeleton className="h-10 w-[70%] rounded-md" />
        ) : (
          <div className="ml-auto flex gap-2">
            {items.map(
              (item) =>
                (!item.role ||
                  item.role.includes(user?.role || "") ||
                  !user) && (
                  <Link
                    key={item.title}
                    href={item.url}
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    prefetch={false}
                  >
                    {item.title}
                  </Link>
                )
            )}

            {!user && (
              <>
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
                  className="justify-self-end"
                  onClick={() => {
                    router.push("/register");
                  }}
                >
                  Đăng ký
                </Button>
              </>
            )}

            <ModeToggle />
            {user && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="hidden md:flex">
                      <Bell size={20} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-4 w-[500px] max-w-[300px]">
                    <DropdownMenuLabel>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Thông báo
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Bạn có {notificationItems.length} thông báo mới
                      </p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notificationItems.map((item) => (
                      <DropdownMenuItem
                        key={item.title}
                        className="flex items-center gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center rounded-full bg-green-100 p-2 text-green-500 dark:bg-green-900 dark:text-green-400">
                            {item.icon}
                          </div>
                          <div className="flex flex-col">
                            <Link
                              href={item.url}
                              className="text-sm font-medium"
                            >
                              {item.title}
                            </Link>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="my-1" />
                    <Button variant="outline" className="w-full text-left mb-1">
                      Xem tất cả thông báo
                    </Button>
                    <Button className="w-full text-left">
                      Đánh dấu tất cả đã đọc
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                        <CircleUserRound width={20} height={20} />
                        <div className="flex flex-col">
                          <p className="text-sm font-medium text-green-500">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p>{user.email}</p>
                          <Badge
                            variant={"outline"}
                            className="mt-2 bg-yellow-300 dark:bg-yellow-500"
                          >
                            100 SPoint
                          </Badge>
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {profileItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        onClick={() => {
                          if (item.url === "/logout") {
                            useUserStore.getState().clearUser();
                            toast.success("Đăng xuất thành công!");
                          }
                        }}
                      >
                        <DropdownMenuItem>
                          {item.title}
                          <DropdownMenuShortcut>
                            {item.icon}
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </Link>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}
