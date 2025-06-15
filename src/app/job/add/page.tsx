"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JobValidationSchema } from "@/validations/job-validation";
import { JobInterface } from "@/interfaces/job-interface";
import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useBeforeUnload } from "@/hooks/use-before-unload";
import { useDraftJobPostStore } from "@/stores/job-store";
import { PersistStoreBridge } from "@/bridges/bridge-persist-store";
import Link from "next/link";
import { VietnameseNumberReader } from "@/utils/n2vi";
import { jobConst } from "@/const/job-const";
import { useSubscriptionStore } from "@/stores/subscription-store";
import { createJob } from "@/api/job-api";

export default function JobAddPage() {
  const { subscriptions, clearSubscriptions } = useSubscriptionStore();

  const { data, setData } = useDraftJobPostStore();

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const [initialValues, setInitialValues] = useState<JobInterface>({
    subscriptionID: 0,
    title: "",
    category: "",
    description: "",
    requirements: "",
    location: "",
    salary: 0,
    workingHours: "",
    startDate: new Date(),
    status: "Active",
    imageUrl: "",
  });

  const clearForm = () => {
    setData({
      subscriptionID: 0,
      title: "",
      category: "",
      description: "",
      requirements: "",
      location: "",
      salary: 0,
      workingHours: "",
      startDate: new Date(),
      imageUrl: "",
    });
  };

  useEffect(() => {
    setInitialValues({
      subscriptionID: data?.subscriptionID ? Number(data.subscriptionID) : 0,
      title: data?.title || "",
      category: data?.category || "",
      description: data?.description || "",
      requirements: data?.requirements || "",
      location: data?.location || "",
      salary: data?.salary || 0,
      workingHours: data?.workingHours || "",
      startDate: data?.startDate ? new Date(data.startDate) : new Date(),
      status: "Active",
      imageUrl: data?.imageUrl || "",
    });
  }, [data]);

  useBeforeUnload((event) => {
    if (
      Object.values(initialValues).some(
        (value) => value !== "" && value !== 0 && value !== new Date()
      )
    ) {
      event.preventDefault();
      return "Bạn có chắc chắn muốn rời khỏi trang này? Thông tin sẽ không được lưu.";
    }
  }, true);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={JobValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("Submitting job post:", values);
        setSubmitting(true);
        const res = await createJob(values);
        if (res) {
          clearSubscriptions();
          clearForm();
        }
        setSubmitting(false);
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
          <>
            <PersistStoreBridge
              values={values}
              saveDraft={setData}
              avoidRefs={[submitBtnRef as React.RefObject<HTMLButtonElement>]}
            />
            <div className="flex justify-center  min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
              <Card className="w-full max-w-2xl">
                <CardHeader>
                  <CardTitle className="text-3xl">
                    Đăng bài tuyển dụng
                  </CardTitle>
                  <CardDescription>
                    Hãy điền đầy đủ thông tin để đăng bài tuyển dụng của bạn.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form onSubmit={handleSubmit} className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Tiêu đề</Label>
                        <Input
                          id="title"
                          name="title"
                          type="text"
                          placeholder="Nhập tiêu đề công việc"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            errors.title && touched.title
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {errors.title && touched.title && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.title}
                          </p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="category">Loại công việc</Label>
                        <select
                          id="category"
                          name="category"
                          value={values.category}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            errors.category && touched.category
                              ? "border-red-500"
                              : ""
                          } block w-full p-2 border rounded-md`}
                        >
                          {jobConst.category.map((cate) => (
                            <option key={cate.id} value={cate.name}>
                              {cate.name}
                            </option>
                          ))}
                        </select>
                        {errors.category && touched.category && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.category}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="subscriptionID">Gói đăng ký</Label>
                        <Link
                          href={"/service"}
                          className="text-sm text-green-700 hover:underline"
                        >
                          Xem các gói đăng ký
                        </Link>
                      </div>
                      <select
                        id="subscriptionID"
                        name="subscriptionID"
                        value={values.subscriptionID}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          errors.subscriptionID && touched.subscriptionID
                            ? "border-red-500"
                            : ""
                        } block w-full p-2 border rounded-md`}
                      >
                        <option value={0}>Chọn gói đăng ký</option>
                        {subscriptions?.map((sub) => (
                          <option
                            key={sub.subscriptionID}
                            value={Number(sub.subscriptionID)}
                          >
                            {sub.subscriptionName} -{" "}
                            {sub.price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </option>
                        ))}
                      </select>
                      {values?.subscriptionID && values.subscriptionID > 0 && (
                        <ul className="mt-2 text-sm text-gray-600">
                          {subscriptions
                            ?.find(
                              (sub) =>
                                String(sub.subscriptionID) ===
                                String(values.subscriptionID)
                            )
                            ?.description.split(".")
                            .map((desc, index) => (
                              <li key={index}>⭐ {desc.trim()}</li>
                            ))}
                        </ul>
                      )}
                      {errors.subscriptionID && touched.subscriptionID && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.subscriptionID}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Mô tả công việc</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Nhập mô tả công việc"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          errors.description && touched.description
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="requirements">Yêu cầu công việc</Label>
                      <Textarea
                        id="requirements"
                        name="requirements"
                        placeholder="Nhập yêu cầu công việc (nhập từng yêu cầu cách nhau bằng dấu phẩy)"
                        value={values.requirements}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          errors.requirements && touched.requirements
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors.requirements && touched.requirements && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.requirements}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="location">Địa điểm</Label>
                        <Input
                          id="location"
                          name="location"
                          type="text"
                          placeholder="Nhập địa điểm làm việc"
                          value={values.location}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            errors.location && touched.location
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {errors.location && touched.location && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.location}
                          </p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="workingHours">Giờ làm việc</Label>
                        <Input
                          id="workingHours"
                          name="workingHours"
                          type="text"
                          placeholder="Nhập giờ làm việc (ví dụ: 9:00 - 17:00)"
                          value={values.workingHours}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            errors.workingHours && touched.workingHours
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {errors.workingHours && touched.workingHours && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.workingHours}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="salary">Mức lương</Label>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-600">
                            {VietnameseNumberReader.toVietnamese(
                              values.salary || 0
                            )}{" "}
                            đồng
                          </p>
                          <Input
                            id="salary"
                            name="salary"
                            type="number"
                            step={100000}
                            min={0}
                            max={100000000}
                            placeholder="Nhập mức lương (VND)"
                            value={values.salary}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${
                              errors.salary && touched.salary
                                ? "border-red-500"
                                : ""
                            } w-32`}
                          />
                        </div>
                      </div>
                      <Slider
                        id="salary"
                        name="salary"
                        min={0}
                        max={100000000}
                        step={100000}
                        value={[values.salary]}
                        onValueChange={(value) => {
                          handleChange({
                            target: { name: "salary", value: value[0] },
                          });
                        }}
                        className={`${
                          errors.salary && touched.salary
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors.salary && touched.salary && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.salary}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="startDate">Ngày bắt đầu</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={
                          values.startDate instanceof Date
                            ? values.startDate.toISOString().split("T")[0]
                            : new Date(values.startDate)
                                .toISOString()
                                .split("T")[0]
                        }
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          handleChange({
                            target: { name: "startDate", value: date },
                          });
                        }}
                        onBlur={handleBlur}
                        className={`${
                          errors.startDate && touched.startDate
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors.startDate && touched.startDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {typeof errors.startDate === "string"
                            ? errors.startDate
                            : "Có lỗi với ngày bắt đầu"}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          clearForm();
                        }}
                        disabled={isSubmitting}
                      >
                        Làm mới
                      </Button>
                      <Button
                        ref={submitBtnRef}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Đăng bài tuyển dụng
                      </Button>
                    </div>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </>
        );
      }}
    </Formik>
  );
}
