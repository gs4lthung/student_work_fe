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
  FileIcon as FileUser,
  Heart,
  LayoutDashboard,
  Lock,
  LogOut,
  MessageCircle,
  Settings,
  Wallet,
  Menu,
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
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import {
  getUnreadNotifications,
  markAllNotificationsAsRead,
} from "@/api/notification-api";
import { useNotificationStore } from "@/stores/notification-store";
import CheckNotification from "../check/check-notifications";
import CheckRoles from "../check/check-roles";
import CheckWallet from "../check/check-wallet";

const items = [
  {
    title: "Trang chủ",
    url: "/",
  },
  {
    title: "Hồ sơ & CV",
    url: "/cv",
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadNotiCount, setUnreadNotiCount] = useState(0);
  const { notifications } = useNotificationStore();

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

    async function fetchUnreadNotifications() {
      try {
        if (isDashboard || !user) {
          setIsLoading(false);
          return;
        }
        const res = await getUnreadNotifications();
        setUnreadNotiCount(res.unreadCount);
      } catch (error) {
        console.error("Failed to fetch unread notifications", error);
      } finally {
        setIsLoading(false); // <-- move this here
      }
    }

    fetchUnreadNotifications();
  }, [user]);

  if (isDashboard) {
    return null;
  }

  const filteredItems = items.filter(
    (item) => !item.role || item.role.includes(user?.role || "") || !user
  );

  return (
    <>
      <CheckNotification />
      <CheckRoles />
      <CheckWallet />{/* Promotional Banner */}
      <div className="h-auto min-h-[40px] w-full bg-gradient-to-r from-yellow-100 to-yellow-300 dark:bg-gradient-to-r dark:from-yellow-400 dark:to-yellow-600">
        <div className="flex h-full items-center justify-center gap-4 px-4 py-2">
          <p className="text-xs sm:text-sm font-extrabold text-center leading-relaxed">
            Nền tảng tuyển dụng thông minh ❤️ Hỗ trợ tìm kiếm việc làm một cách
            dễ dàng
          </p>
        </div>
      </div>
      {/* Main Header */}
      <header className="z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 overflow-x-hidden border-b-2 shadow-2xs flex h-16 sm:h-20 w-full shrink-0 items-center px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="mr-4 sm:mr-6 flex items-center gap-2"
          prefetch={false}
        >
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={120}
            height={48}
            className="w-20 h-8 sm:w-[120px] sm:h-12 lg:w-[150px] lg:h-[60px]"
          />
        </Link>

        {isLoading ? (
          <Skeleton className="h-8 sm:h-10 flex-1 max-w-md rounded-md ml-auto" />
        ) : (
          <>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex ml-auto items-center gap-1">
              {filteredItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap"
                  prefetch={false}
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="ml-auto lg:ml-4 flex items-center gap-2">
              {/* User Badge - Hidden on small screens */}
              {user?.studentID && (
                <Badge
                  variant={"outline"}
                  className="hidden sm:flex border-2 border-green-500 dark:border-green-400 text-xs max-w-[200px] truncate"
                >
                  <span className="hidden md:inline">Sinh viên: </span>
                  {user?.firstName} {user?.lastName || "Chưa cập nhật"}
                </Badge>
              )}

              {user?.employerID && (
                <Badge
                  variant={"outline"}
                  className="hidden sm:flex border-2 border-green-500 dark:border-green-400 text-xs max-w-[200px] truncate"
                >
                  <span className="hidden md:inline">NTD: </span>
                  {user?.companyName || "Chưa cập nhật"}
                </Badge>
              )}

              {/* Auth Buttons for Non-logged Users */}
              {!user && (
                <div className="hidden sm:flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/login")}
                  >
                    Đăng nhập
                  </Button>
                  <Button size="sm" onClick={() => router.push("/register")}>
                    Đăng ký
                  </Button>
                </div>
              )}

              {/* Mode Toggle */}
              <ModeToggle />

              {/* Notifications - Only for logged users */}
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden sm:flex"
                    >
                      <div className="relative">
                        {unreadNotiCount > 0 && (
                          <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full shadow-sm ring-2 ring-white">
                            {unreadNotiCount}
                          </span>
                        )}
                      </div>
                      <Bell size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-4 w-[90vw] max-w-[400px] mr-4">
                    <DropdownMenuLabel>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Thông báo
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Bạn có {unreadNotiCount} thông báo mới
                      </p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.slice(0, 5).map((item) => (
                      <DropdownMenuItem
                        key={item.notificationID}
                        className="flex items-center gap-2 p-3"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className="flex items-center justify-center rounded-full bg-green-100 p-2 text-green-500 dark:bg-green-900 dark:text-green-400 flex-shrink-0">
                            <BellIcon size={20} />
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
                            <Link
                              href={item.message}
                              className="text-sm font-medium truncate"
                              prefetch={false}
                            >
                              {item.title}
                            </Link>
                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                              {item.message}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="my-2" />
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Xem tất cả thông báo
                      </Button>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={async () => {
                          if (unreadNotiCount === 0) {
                            toast.info("Không có thông báo chưa đọc");
                            return;
                          }
                          const res = await markAllNotificationsAsRead();
                          if (res)
                            toast.success(
                              "Đã đánh dấu tất cả thông báo là đã đọc"
                            );
                          window.location.reload();
                        }}
                      >
                        Đánh dấu tất cả đã đọc
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* User Profile Dropdown */}
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <CircleUserRound size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[90vw] max-w-[300px] mr-4">
                    <DropdownMenuItem className="p-3">
                      <div className="flex flex-row items-center gap-3 w-full">
                        <CircleUserRound
                          width={24}
                          height={24}
                          className="flex-shrink-0"
                        />
                        <div className="flex flex-col flex-1 min-w-0">
                          <p className="text-sm font-extrabold truncate">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-xs truncate">{user.email}</p>
                          {user.employerID && (
                            <Badge
                              variant={"outline"}
                              className="mt-2 bg-green-400 dark:bg-green-500 w-fit text-xs"
                            >
                              {user.walletBalance?.toLocaleString("vi-VN")}{" "}
                              SPoint
                            </Badge>
                          )}
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
                        prefetch={false}
                      >
                        <DropdownMenuItem className="p-2">
                          <span className="flex-1">{item.title}</span>
                          <DropdownMenuShortcut>
                            {item.icon}
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </Link>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Menu size={16} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col gap-4 mt-6">
                    {/* Mobile Navigation Links */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg mb-4">Menu</h3>
                      {filteredItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          className="block px-4 py-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                          prefetch={false}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>

                    {/* Mobile User Info */}
                    {user && (
                      <div className="border-t pt-4 space-y-3">
                        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                          <p className="text-sm font-medium text-green-500">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          {user?.studentID && (
                            <Badge variant="outline" className="mt-2 text-xs">
                              Sinh viên
                            </Badge>
                          )}
                          {user?.employerID && (
                            <Badge variant="outline" className="mt-2 text-xs">
                              Nhà tuyển dụng
                            </Badge>
                          )}
                        </div>

                        {/* Mobile Notificatsions */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Thông báo</h4>
                          {notificationItems.map((item) => (
                            <Link
                              key={item.title}
                              href={item.url}
                              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                              prefetch={false}
                            >
                              <div className="flex items-center justify-center rounded-full bg-green-100 p-2 text-green-500 dark:bg-green-900 dark:text-green-400">
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">
                                  {item.title}
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-1">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mobile Auth Buttons */}
                    {!user && (
                      <div className="border-t pt-4 space-y-3">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            router.push("/login");
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          Đăng nhập
                        </Button>
                        <Button
                          className="w-full"
                          onClick={() => {
                            router.push("/register");
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          Đăng ký
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </>
        )}
      </header>
    </>
  );
}
