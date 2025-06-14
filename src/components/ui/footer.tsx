"use client";

import Link from "next/link";
import {
  Briefcase,
  FileText,
  Users,
  BookOpen,
  MessageSquare,
  Linkedin,
  Github,
  Mail,
  Facebook,
} from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { usePathname } from "next/navigation";

export default function Footer() {
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
    "/cv/download",
  ];
  const isDashboard = nonDashboardPaths.some((path) =>
    pathname.startsWith(path)
  );
  if (isDashboard) {
    return null;
  }
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t w-full py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Job Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/resume-tips"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-400 flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>Resume Tips</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/interview-prep"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-400 flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  <span>Interview Preparation</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/career-advice"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-400 flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Career Advice</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/salary-guide"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-400 flex items-center gap-2"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Salary Guide</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Nổi bật</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/jobs"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-400"
                >
                  Tìm việc
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/profile"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-400"
                >
                  Hồ sơ của tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/saved-jobs"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-400"
                >
                  Công việc đã lưu
                </Link>
              </li>
              <li>
                <Link
                  href="/job-alerts"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-400"
                >
                  Thông báo việc làm
                </Link>
              </li>
              <li>
                <Link
                  href="/applications"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-400"
                >
                  Đơn ứng tuyển
                </Link>
              </li>
            </ul>
          </div>

      
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-slate-600 dark:text-slate-50">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:contact@jobseeker.com"
                  className="hover:text-slate-900 dark:hover:text-slate-400"
                >
                  contact@swork.com
                </a>
              </li>
              <li className="text-slate-600 dark:text-slate-50">
                <Link
                  href="/help"
                  className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-slate-400"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Trung tâm hỗ trợ</span>
                </Link>
              </li>
              <li className="text-slate-600 dark:text-slate-50">
                <Link
                  href="/feedback"
                  className="hover:text-slate-900 dark:hover:text-slate-400"
                >
                  <span>Gửi phản hồi</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Kết nối với chúng tôi</h3>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-200 p-2 rounded-full hover:bg-slate-300 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-slate-700" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-200 p-2 rounded-full hover:bg-slate-300 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-slate-700" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-200 p-2 rounded-full hover:bg-slate-300 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-slate-700" />
              </a>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Đăng ký nhận bản tin của chúng tôi để nhận thông tin mới nhất về
              việc làm và mẹo nghề nghiệp.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                aria-label="Email"
              />
              <Button type="submit">Đăng ký</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} SWork. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            >
              Chính sách bảo mật
            </Link>
            <Link
              href="/terms"
              className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            >
              Điều khoản sử dụng
            </Link>
            <Link
              href="/accessibility"
              className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            >
              Trợ năng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
