"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH2 } from "@/components/ui/typography";
import { EmployerInterface } from "@/interfaces/user-interface";
import { UserStore, useUserStore } from "@/stores/user-store";
import { EmployerValidationSchema } from "@/validations/user-validation";
import { Form, Formik } from "formik";
import Image from "next/image";
import React, { useState } from "react";

const AccountTab = ({
  user,
  isUpdate,
  setIsUpdate,
}: {
  user: UserStore;
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="grid grid-cols-8 gap-8">
      <div className="col-span-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-600">
          Thông tin đăng nhập
        </h2>
        <div className="flex flex-col gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={user?.email || "user@gmail.com"}
            disabled={isUpdate}
          />
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            type="password"
            placeholder="Mật khẩu"
            value={"password"}
            disabled
          />
          <Button variant={"outline"} className="w-1/3">
            Thay đổi mật khẩu
          </Button>
        </div>
        <Separator className="my-4" />
        <h2 className="text-lg font-semibold mb-4 text-gray-600">
          Thông tin liên hệ
        </h2>
        <div className="flex flex-col gap-4">
          <Label htmlFor="name">Họ và tên</Label>
          <Input
            id="name"
            type="text"
            placeholder="Họ và tên"
            value={"Lam Tien Hung"}
            readOnly={isUpdate}
          />
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            type="text"
            placeholder="Số điện thoại"
            value={user?.phoneNumber || "0123456789"}
            readOnly={isUpdate}
          />
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            id="address"
            type="text"
            placeholder="Địa chỉ"
            value={"TP. Hồ Chí Minh"}
            readOnly={isUpdate}
          />
          <Button className="w-1/3" onClick={() => setIsUpdate(!isUpdate)}>
            Chỉnh sửa thông tin
          </Button>
        </div>
      </div>
      <div className="col-span-3 flex flex-col gap-2 items-center">
        <h2 className="text-lg font-semibold mb-4 text-gray-600">
          Ảnh đại diện
        </h2>
        <Avatar className="w-40 h-40">
          <AvatarFallback>👤</AvatarFallback>
        </Avatar>
        <FileUpload />
      </div>
    </div>
  );
};

const CompanyTab = ({
  user,
  isUpdate,
  setIsUpdate,
}: {
  user: UserStore;
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const initialValues: EmployerInterface = {
    role: user.role,
    companyName: "",
    companySize: 0,
    description: "",
    location: "",
    industry: "",
    website: "",
    logoUrl: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EmployerValidationSchema}
      onSubmit={() => {}}
    >
      {({
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
      }) => {
        return (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">
              Thông tin công ty
            </h2>
            <div className="flex items-start gap-2">
              <div className="flex-1 flex flex-col gap-4">
                <Label htmlFor="companyName">Tên công ty</Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Tên công ty"
                  value={values.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!isUpdate}
                />
                {errors.companyName && touched.companyName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyName}
                  </p>
                )}

                <Label htmlFor="companySize">Quy mô công ty</Label>
                <Input
                  id="companySize"
                  type="number"
                  placeholder="Quy mô công ty"
                  value={values.companySize}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!isUpdate}
                />
                {errors.companySize && touched.companySize && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companySize}
                  </p>
                )}

                <Label htmlFor="description">Mô tả</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Mô tả công ty"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!isUpdate}
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}

                <Label htmlFor="location">Địa chỉ</Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Địa chỉ công ty"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!isUpdate}
                />
                {errors.location && touched.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}

                <Label htmlFor="industry">Ngành nghề</Label>
                <Select
                  onValueChange={(value) => {
                    handleChange({
                      target: { name: "industry", value },
                    });
                  }}
                  value={values.industry || ""}
                  disabled={!isUpdate}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn ngành nghề" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT">Công nghệ thông tin</SelectItem>
                    <SelectItem value="Finance">Tài chính</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Education">Giáo dục</SelectItem>
                    <SelectItem value="Healthcare">Y tế</SelectItem>
                  </SelectContent>
                </Select>

                {isUpdate && errors.industry && touched.industry && (
                  <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
                )}
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="text"
                  placeholder="Website công ty"
                  value={values.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!isUpdate}
                />
                {errors.website && touched.website && (
                  <p className="text-red-500 text-sm mt-1">{errors.website}</p>
                )}
                <Label htmlFor="logoUrl">Logo công ty</Label>
                <Input
                  id="logoUrl"
                  type="text"
                  placeholder="URL logo công ty"
                  value={values.logoUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!isUpdate}
                />
                {errors.logoUrl && touched.logoUrl && (
                  <p className="text-red-500 text-sm mt-1">{errors.logoUrl}</p>
                )}
                <div className="flex justify-end">
                  <Button
                    disabled={isSubmitting}
                    className="w-1/3"
                    onClick={() => {
                      setIsUpdate(!isUpdate);
                    }}
                  >
                    {isUpdate ? "Hủy bỏ" : "Chỉnh sửa"}
                  </Button>
                  <Button
                    type="submit"
                    className="w-1/3 ml-2"
                    variant="outline"
                    hidden={!isUpdate}
                    disabled={isSubmitting}
                  >
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
              <Image
                src={values.logoUrl || "/default-logo.png"}
                alt="Company Logo"
                width={300}
                height={300}
                className="rounded-lg"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const tabItems = [
  {
    title: "Thông tin tài khoản",
    value: "account",
    render: (
      user: UserStore,
      isUpdate: boolean,
      setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
    ) => (
      <AccountTab user={user} isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
    ),
  },
  {
    title: "Thông tin công ty",
    value: "company",
    render: (
      user: UserStore,
      isUpdate: boolean,
      setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
    ) => (
      <CompanyTab user={user} isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
    ),
  },
];

export default function DashBoardProfilePage() {
  const { user } = useUserStore();

  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <TypographyH2 className="">Lam Tien Hung</TypographyH2>
        <Badge className="bg-green-500 dark:bg-green-300 text-white">
          {user?.role === "Student" ? "Sinh viên" : "HR"}
        </Badge>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none">
          {tabItems.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabItems.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {user ? tab.render(user, isUpdate, setIsUpdate) : null}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
