import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyH2 } from "@/components/ui/typography";
import Link from "next/link";
import React from "react";

export default function RegisterPage() {
  return (
    <>
      <TypographyH2>Chào mừng bạn đến với SWork</TypographyH2>
      <p className="text-gray-500 text-sm mb-4">Đăng ký tài khoản để bắt đầu</p>
      <Input placeholder="Họ và tên" type="text" required />
      <Input placeholder="Email" type="text" required />
      <Input placeholder="Mật khẩu" type="password" required />
      <Input placeholder="Nhập lại mật khẩu" type="password" required />
      <Button
        className="w-full hover:bg-green-300"
        variant="secondary"
        type="submit"
      >
        <p>Đăng ký</p>
      </Button>
      <div className="flex items-center justify-between w-full text-sm text-gray-500">
        Đã có tài khoản?
        <Link href="/login">
          <Button variant="link" className="text-blue-500">
            Đăng nhập ngay
          </Button>
        </Link>
      </div>
    </>
  );
}
