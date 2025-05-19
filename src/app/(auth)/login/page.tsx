import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyH2 } from "@/components/ui/typography";
import { Facebook, Github } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <>
      <TypographyH2>Chào mừng bạn đã quay trở lại</TypographyH2>
      <p className="text-gray-500 text-sm mb-4">
        Đăng nhập để tiếp tục sử dụng ứng dụng của chúng tôi
      </p>
      <Input placeholder="Email" type="text" required />
      <Input placeholder="Mật khẩu" type="password" required />
      <Button
        className="w-full hover:bg-green-300"
        variant="secondary"
        type="submit"
      >
        <p>Đăng nhập</p>
      </Button>
      <div className="flex items-center justify-between w-full">
        <Button variant="link" className="text-gray-500">
          Quên mật khẩu?
        </Button>
        <Link href="/register">
          <Button variant="link" className="text-blue-500">
            Đăng ký ngay
          </Button>
        </Link>
      </div>
      <Button
        className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 text-white"
        variant="secondary"
        type="submit"
      >
        <Facebook /> <p>Đăng nhập với Facebook</p>
      </Button>
      <Button
        className="w-full bg-red-400 hover:bg-red-500 dark:bg-red-400 dark:hover:bg-red-500 text-white"
        variant="secondary"
        type="submit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path
            fill="none"
            stroke="white"
            strokeWidth="35"
            d="M488 261.8C488 403.3 391.1 504 248 504 
            110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 
            123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 
            94.3 116.6 94.3 256c0 86.5 69.1 156.6 
            153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 
            12.7 3.9 24.9 3.9 41.4z"
          />
        </svg>
        <p>Đăng nhập với Google</p>
      </Button>
      <Button className="w-full" variant="default" type="submit">
        <Github /> <p>Đăng nhập với Github</p>
      </Button>
    </>
  );
}
