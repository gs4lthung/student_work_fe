"use client";

import { createEmployerInfo, createStudentInfo } from "@/api/user-api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { TypographyH2 } from "@/components/ui/typography";
import {
  EmployerInterface,
  StudentInterface,
} from "@/interfaces/user-interface";
import { UserStore, useUserStore } from "@/stores/user-store";
import {
  EmployerValidationSchema,
  StudentValidationSchema,
} from "@/validations/user-validation";
import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

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

const StudentTab = ({
  user,
  isUpdate,
  setIsUpdate,
}: {
  user: UserStore;
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const initialValues: StudentInterface = {
    role: user.role,
    university: user.university || "",
    major: user.major || "",
    yearOfStudy: user.yearOfStudy || 4,
    dateOfBirth: user.dateOfBirth || new Date("2003-12-04"),
    bio: user.bio || "",
  };
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-600">
        Thông tin sinh viên
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={StudentValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const res = await createStudentInfo(values);
            if (res) {
              toast.success("Tạo thông tin sinh viên thành công");
              useUserStore.getState().setUser({
                ...user,
                studentID: res.studentID,
                university: res.university,
                major: res.major,
                yearOfStudy: res.yearOfStudy,
                dateOfBirth: res.dateOfBirth,
                bio: res.bio,
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          } catch (error) {
            if (error instanceof AxiosError) {
              toast.error(
                error.response?.data?.message ||
                  "Tạo thông tin sinh viên thất bại"
              );
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
        }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Label htmlFor="university">Trường đại học</Label>
            <Input
              id="university"
              type="text"
              placeholder="Trường đại học"
              value={values.university}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!isUpdate}
            />
            {errors.university && touched.university && (
              <p className="text-red-500 text-sm mt-1">{errors.university}</p>
            )}
            <Label htmlFor="major">Chuyên ngành</Label>
            <Input
              id="major"
              type="text"
              placeholder="Chuyên ngành"
              value={values.major}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!isUpdate}
            />
            {errors.major && touched.major && (
              <p className="text-red-500 text-sm mt-1">{errors.major}</p>
            )}
            <Label htmlFor="yearOfStudy">Số năm học</Label>
            <Input
              id="yearOfStudy"
              type="number"
              placeholder="Số năm học"
              value={values.yearOfStudy}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!isUpdate}
            />
            {errors.yearOfStudy && touched.yearOfStudy && (
              <p className="text-red-500 text-sm mt-1">{errors.yearOfStudy}</p>
            )}
            <Label htmlFor="dateOfBirth">Ngày sinh</Label>
            <Input
              id="dateOfBirth"
              type="date"
              placeholder="Ngày sinh"
              value={
                values.dateOfBirth
                  ? new Date(values.dateOfBirth).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!isUpdate}
            />
            {errors.dateOfBirth && touched.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
            )}
            <Label htmlFor="bio">Tiểu sử</Label>
            <Textarea
              id="bio"
              placeholder="Tiểu sử"
              value={values.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!isUpdate}
            />
            {errors.bio && touched.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
            )}
            <div className="flex justify-end">
              <Button
                variant={isUpdate ? "secondary" : "outline"}
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
                hidden={!isUpdate}
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoadingSpinner /> : <p>Lưu thay đổi</p>}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
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
    companyName: user.companyName || "",
    companySize: user.companySize || 0,
    description: user.description || "",
    location: user.location || "",
    industry: user.industry || "",
    website: user.website || "",
    logoUrl: user.logoUrl || "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EmployerValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          const res = await createEmployerInfo(values);
          if (res) {
            toast.success("Tạo thông tin công ty thành công");
            useUserStore.getState().setUser({
              ...user,
              employerID: res.employerID,
              companyName: res.companyName,
              companySize: res.companySize,
              description: res.description,
              location: res.location,
              industry: res.industry,
              website: res.website,
              logoUrl: res.logoUrl,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            toast.error(
              error.response?.data?.message || "Tạo thông tin công ty thất bại"
            );
          }
        } finally {
          setSubmitting(false);
        }
      }}
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
                <Textarea
                  id="description"
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
                    variant={isUpdate ? "secondary" : "outline"}
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
                    hidden={!isUpdate}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <LoadingSpinner /> : <p>Lưu thay đổi</p>}
                  </Button>
                </div>
              </div>
              {values.logoUrl && !errors.logoUrl && !touched.logoUrl && (
                <div className="flex items-center justify-center w-1/3">
                  <Image
                    src={values.logoUrl}
                    alt="Company Logo"
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              )}
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
    roles: ["Student", "Employer"],
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
    roles: ["Employer"],
  },
  {
    title: "Thông tin sinh viên",
    value: "student",
    render: (
      user: UserStore,
      isUpdate: boolean,
      setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
    ) => (
      <StudentTab user={user} isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
    ),
    roles: ["Student"],
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
          {tabItems
            .filter((tab) => tab.roles.includes(user?.role || ""))
            .map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.title}
              </TabsTrigger>
            ))}
        </TabsList>
        {tabItems
          .filter((tab) => tab.roles.includes(user?.role || ""))
          .map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {user ? tab.render(user, isUpdate, setIsUpdate) : null}
            </TabsContent>
          ))}
      </Tabs>
    </div>
  );
}
