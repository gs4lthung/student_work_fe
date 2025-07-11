"use client";

import React, { useEffect, useState } from "react";
import type { JobInterface } from "@/interfaces/job-interface";
import type { ApplicationInterface } from "@/interfaces/application-interface";
import { getJobByEmployerId, updateJob } from "@/api/job-api";
import {
  getApplicationsByJob,
  updateApplicationStatus,
} from "@/api/application-api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import PaginationFixed from "@/components/ui/pagination-fixed";
import {
  ChevronRight,
  ChevronDown,
  User,
  Calendar,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, Formik } from "formik";
import { InterviewInterface } from "@/interfaces/interview-interface";
import { CreateInterviewSchema } from "@/validations/interview-validation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createInterview } from "@/api/interview-api";
import Image from "next/image";
import { JobValidationSchema } from "@/validations/job-validation";
import { AxiosError } from "axios";

export default function DashboardPost() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [jobPosts, setJobPosts] = useState<JobInterface[]>([]);

  // State for expanded rows
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [applicationsData, setApplicationsData] = useState<
    Record<string, ApplicationInterface[]>
  >({});
  const [loadingApplications, setLoadingApplications] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      const jobRes = await getJobByEmployerId(1, 10);
      setJobPosts(jobRes.items);
      setTotalPages(jobRes.totalPagesCount);
      setIsLoading(false);
    }
    fetchJobs();
  }, []);

  const handleRowToggle = async (job: JobInterface) => {
    const jobId = job.jobID;
    const newExpandedRows = new Set(expandedRows);

    if (expandedRows.has(String(jobId))) {
      // Collapse row
      newExpandedRows.delete(String(jobId));
      setExpandedRows(newExpandedRows);
    } else {
      // Expand row
      newExpandedRows.add(String(jobId));
      setExpandedRows(newExpandedRows);

      // Fetch applications if not already loaded
      if (!applicationsData[String(jobId)]) {
        setLoadingApplications((prev) => new Set([...prev, String(jobId)]));

        try {
          const res = await getApplicationsByJob(Number(jobId), 1, 10);
          setApplicationsData((prev) => ({
            ...prev,
            [String(jobId)]: res.items || [],
          }));
        } catch (error) {
          console.error("Failed to fetch applications:", error);
          // Remove from expanded if failed to load
          newExpandedRows.delete(String(jobId));
          setExpandedRows(newExpandedRows);
        } finally {
          setLoadingApplications((prev) => {
            const newSet = new Set(prev);
            newSet.delete(String(jobId));
            return newSet;
          });
        }
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: {
        variant: "outline" as const,
        className: "text-yellow-600",
        text: "Chờ xử lý",
      },
      REVIEWED: {
        variant: "outline" as const,
        className: "text-blue-600",
        text: "Đã xem",
      },
      APPROVED: {
        variant: "outline" as const,
        className: "text-green-600",
        text: "Chấp nhận",
      },
      REJECTED: {
        variant: "outline" as const,
        className: "text-red-600",
        text: "Từ chối",
      },
      INVITED: {
        variant: "outline" as const,
        className: "text-purple-600",
        text: "Đã mời phỏng vấn",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      variant: "outline" as const,
      className: "text-gray-600",
      text: status,
    };

    return (
      <Badge variant={config.variant} className={config.className}>
        {config.text}
      </Badge>
    );
  };

  const createInterviewInvitationData: InterviewInterface = {
    applicationID: "",
    scheduledTime: new Date(),
    location: "",
    note: "",
    duration_minutes: 30,
    meetingLink: "",
  };

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Công việc</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Yêu cầu</TableHead>
                <TableHead>Lương</TableHead>
                <TableHead>Ngày bắt đầu</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Chi tiết</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobPosts.map((job) => (
                <React.Fragment key={job.jobID}>
                  {/* Main Job Row */}
                  <TableRow>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRowToggle(job)}
                        className="p-1 h-8 w-8"
                      >
                        {expandedRows.has(String(job.jobID)) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-semibold">
                      <Link
                        href={`/job/${job.jobID}`}
                        className="hover:text-blue-600 hover:underline"
                      >
                        {job.title}
                      </Link>
                    </TableCell>
                    <TableCell>{job.category}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={job.description}>
                        {job.description.split(".").map((des, index) => (
                          <div key={index} className="mb-1">
                            {des.trim().slice(0, 30)}...
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={job.requirements}>
                        {job.requirements.split(".").map((req, index) => (
                          <div key={index} className="mb-1">
                            {req.trim().slice(0, 30)}...
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {job.salary.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </TableCell>
                    <TableCell>
                      {new Date(job.startDate).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      {job.status === "ACTIVE" ? (
                        <Badge variant="outline" className="text-green-500">
                          Hoạt động
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-500">
                          Ngừng hoạt động
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <JobDetails job={job} />
                    </TableCell>
                  </TableRow>

                  {/* Expanded Applications Row */}
                  {expandedRows.has(String(job.jobID)) && (
                    <TableRow>
                      <TableCell colSpan={8} className="p-0">
                        <div className="border-t">
                          {loadingApplications.has(String(job.jobID)) ? (
                            <div className="flex items-center justify-center py-8">
                              <div className="flex items-center gap-2">
                                <LoadingSpinner />
                                <span className="text-sm text-gray-600">
                                  Đang tải danh sách ứng viên...
                                </span>
                              </div>
                            </div>
                          ) : applicationsData[String(job.jobID)] &&
                            applicationsData[String(job.jobID)].length > 0 ? (
                            <div className="p-4">
                              <div className="flex items-center gap-2 mb-4">
                                <User className="h-5 w-5 text-blue-600" />
                                <h3 className="font-semibold text-lg">
                                  Danh sách ứng viên (
                                  {applicationsData[String(job.jobID)].length})
                                </h3>
                              </div>

                              <div className="rounded-lg border overflow-hidden">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Tên ứng viên</TableHead>
                                      <TableHead>Trạng thái</TableHead>
                                      <TableHead>Ngày nộp</TableHead>
                                      <TableHead>Thư xin việc</TableHead>
                                      <TableHead>Hành động</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {applicationsData[String(job.jobID)].map(
                                      (app, index) => (
                                        <TableRow key={app.stt || index}>
                                          <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                                <User className="h-4 w-4 text-blue-600" />
                                              </div>
                                              {app.studentName}
                                            </div>
                                          </TableCell>
                                          <TableCell>
                                            {getStatusBadge(app.status)}
                                          </TableCell>
                                          <TableCell>
                                            <div className="flex items-center gap-2">
                                              <Calendar className="h-4 w-4 text-gray-400" />
                                              {app?.appliedAt
                                                ? new Date(
                                                    app.appliedAt
                                                  ).toLocaleDateString("vi-VN")
                                                : "N/A"}
                                            </div>
                                          </TableCell>
                                          <TableCell className="max-w-xs">
                                            {app.coverletter ? (
                                              <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-gray-400" />
                                                <div
                                                  className="truncate"
                                                  title={app.coverletter}
                                                >
                                                  {app.coverletter.slice(0, 50)}
                                                  ...
                                                </div>
                                              </div>
                                            ) : (
                                              <p className="text-gray-400">
                                                Không có
                                              </p>
                                            )}
                                          </TableCell>
                                          <TableCell>
                                            <div className="flex gap-2">
                                              {app.status === "PENDING" ? (
                                                <>
                                                  <AcceptApplicationButton
                                                    app={app}
                                                  />
                                                  <RejectApplicationAlertDialog
                                                    app={app}
                                                  />
                                                </>
                                              ) : app.status === "APPROVED" ? (
                                                <InviteInterviewDialog
                                                  data={
                                                    createInterviewInvitationData
                                                  }
                                                  app={app}
                                                />
                                              ) : app.status === "INVITED" ? (
                                                <AcceptForWorkingAlertDialog
                                                  app={app}
                                                />
                                              ) : (
                                                <></>
                                              )}
                                              <ContactInfo app={app} />
                                            </div>
                                          </TableCell>
                                        </TableRow>
                                      )
                                    )}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="h-8 w-8 text-gray-400" />
                              </div>
                              <p className="text-gray-500 text-lg">
                                Chưa có ứng viên nào
                              </p>
                              <p className="text-gray-400 text-sm mt-1">
                                Công việc này chưa nhận được đơn ứng tuyển nào
                              </p>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>

          <PaginationFixed
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

const JobDetails = ({ job }: { job: JobInterface }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"}>
          Xem
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết công việc</DialogTitle>
          <DialogDescription>
            Thông tin chi tiết về công việc này.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={job}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              const res = await updateJob(values);
              if (res) {
                toast.success("Cập nhật công việc thành công");
                window.location.reload();
              } else {
                toast.error("Cập nhật công việc thất bại");
              }
            } catch (error) {
              console.error("Error updating job:", error);
              if (error instanceof AxiosError)
                toast.error(
                  error.response?.data?.message || "Lỗi cập nhật công việc"
                );
              else toast.error("Lỗi không xác định khi cập nhật công việc");
            } finally {
              setSubmitting(false);
            }
          }}
          enableReinitialize
          validationSchema={JobValidationSchema}
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
              <div className="hidden">
                {(values.jobID = job.jobID || "")}
                {(values.employerID = job.employerID || "")}
                {(values.subscriptionID = job.subscriptionID || 0)}
              </div>
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.title && touched.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && touched.title && (
                <div className="text-red-500 text-sm">
                  {typeof errors.title === "string" ? errors.title : ""}
                </div>
              )}
              <Label htmlFor="category">Loại công việc</Label>
              <Input
                type="text"
                id="category"
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.category && touched.category ? "border-red-500" : ""
                }`}
              />
              {errors.category && touched.category && (
                <div className="text-red-500 text-sm">
                  {typeof errors.category === "string" ? errors.category : ""}
                </div>
              )}
              <Label htmlFor="description">Mô tả công việc</Label>
              <Textarea
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.description && touched.description
                    ? "border-red-500"
                    : ""
                }`}
              />
              {errors.description && touched.description && (
                <div className="text-red-500 text-sm">
                  {typeof errors.description === "string"
                    ? errors.description
                    : ""}
                </div>
              )}
              <Label htmlFor="requirements">Yêu cầu công việc</Label>
              <Textarea
                id="requirements"
                name="requirements"
                value={values.requirements}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`$
                  errors.requirements && touched.requirements
                    ? "border-red-500"
                    : ""
                }`}
              />

              {errors.requirements && touched.requirements && (
                <div className="text-red-500 text-sm">
                  {typeof errors.requirements === "string"
                    ? errors.requirements
                    : ""}
                </div>
              )}
              <Label htmlFor="location">Địa điểm làm việc</Label>
              <Input
                type="text"
                id="location"
                name="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.location && touched.location ? "border-red-500" : ""
                }`}
              />
              {errors.location && touched.location && (
                <div className="text-red-500 text-sm">
                  {typeof errors.location === "string" ? errors.location : ""}
                </div>
              )}
              <Label htmlFor="salary">Mức lương (VND)</Label>
              <Input
                type="number"
                id="salary"
                name="salary"
                value={values.salary}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.salary && touched.salary ? "border-red-500" : ""
                }`}
              />
              {errors.salary && touched.salary && (
                <div className="text-red-500 text-sm">
                  {typeof errors.salary === "string" ? errors.salary : ""}
                </div>
              )}
              <Label htmlFor="workingHours">Giờ làm việc</Label>
              <Input
                type="text"
                id="workingHours"
                name="workingHours"
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
                <div className="text-red-500 text-sm">
                  {typeof errors.workingHours === "string"
                    ? errors.workingHours
                    : ""}
                </div>
              )}
              <Image
                src={values.imageUrl || "/default-job-image.png"}
                alt="Job Image"
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-64 mb-4"
              />
              <Button type="submit" disabled={isSubmitting} className="mt-4">
                {isSubmitting ? <LoadingSpinner /> : "Cập nhật công việc"}
              </Button>
            </Form>
          )}
        </Formik>
        {/* <div className="flex flex-col gap-4">
          <div>
            <Label className="font-semibold">Tiêu đề</Label>
            <ColourfulText text={job.title} />
          </div>
          <div>
            <Label className="font-semibold">Loại công việc</Label>
            <p className="text-gray-700">{job.category}</p>
          </div>
          <div>
            <Label className="font-semibold">Lương</Label>
            <p className="text-gray-700">
              {job.salary.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>

          <Image
            src={job.imageUrl || "/default-job-image.png"}
            alt="Job Image"
            width={500}
            height={300}
            className="rounded-lg object-cover w-full h-64 mb-4"
          />
          <div>
            <Label className="font-semibold">Mô tả</Label>
            <ul className="list-disc pl-5">
              {job.description.split(".").map((des, index) => (
                <li key={index} className="mb-1">
                  {des.trim()}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Label className="font-semibold">Yêu cầu</Label>
            <ul className="list-disc pl-5">
              {job.requirements.split(".").map((req, index) => (
                <li key={index} className="mb-1">
                  {req.trim()}
                </li>
              ))}
            </ul>
          </div>
        </div> */}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AcceptApplicationButton = ({ app }: { app: ApplicationInterface }) => {
  return (
    <Button
      size={"sm"}
      onClick={async () => {
        if (app.stt !== undefined) {
          const res = await updateApplicationStatus(
            Number(app.stt),
            "APPROVED"
          );
          if (res) {
            toast.success("Đã duyệt ứng viên thành công");
            window.location.reload();
          }
        }
      }}
    >
      Duyệt
    </Button>
  );
};

const RejectApplicationAlertDialog = ({
  app,
}: {
  app: ApplicationInterface;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size="sm">
          Từ chối
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc chắn muốn từ chối ứng viên này?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Việc này sẽ không thể hoàn tác. Ứng viên sẽ không được xem xét cho
            công việc này nữa.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              if (app.stt !== undefined) {
                await updateApplicationStatus(Number(app.stt), "REJECTED")
                  .then((res) => {
                    if (res) {
                      toast.success("Đã từ chối ứng viên thành công");
                      window.location.reload();
                    }
                  })
                  .catch((error) => {
                    console.error("Error rejecting application:", error);
                    toast.error("Lỗi khi từ chối ứng viên");
                  });
              }
            }}
          >
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const InviteInterviewDialog = ({
  data,
  app,
}: {
  data: InterviewInterface;
  app: ApplicationInterface;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>Mời phỏng vấn</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mời phỏng vấn ứng viên</DialogTitle>
          <DialogDescription>
            Bạn có thể gửi lời mời phỏng vấn đến ứng viên này qua email hoặc
            liên hệ trực tiếp.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={data}
          validationSchema={CreateInterviewSchema}
          onSubmit={async (values, { setSubmitting }) => {
            values.scheduledTime = new Date(values.scheduledTime);
            setSubmitting(false);
            const res = await createInterview(values);
            if (res) {
              toast.success("Đã gửi lời mời phỏng vấn thành công");
              window.location.reload();
            }
            setSubmitting(true);
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
              <div className="hidden">
                {(values.applicationID = app.stt || "")}
              </div>
              <Label htmlFor="scheduledTime">Ngày phỏng vấn</Label>
              <Input
                type="datetime-local"
                id="scheduledTime"
                name="scheduledTime"
                value={
                  values.scheduledTime
                    ? typeof values.scheduledTime === "string"
                      ? values.scheduledTime
                      : new Date(values.scheduledTime)
                          .toISOString()
                          .slice(0, 16)
                    : ""
                }
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.scheduledTime && touched.scheduledTime
                    ? "border-red-500"
                    : ""
                }`}
              />
              {errors.scheduledTime && touched.scheduledTime && (
                <div className="text-red-500 text-sm">
                  {typeof errors.scheduledTime === "string"
                    ? errors.scheduledTime
                    : ""}
                </div>
              )}
              <Label htmlFor="duration_minutes">
                Thời gian phỏng vấn (phút)
              </Label>
              <Input
                type="number"
                id="duration_minutes"
                name="duration_minutes"
                value={values.duration_minutes}
                step={5}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.duration_minutes && touched.duration_minutes
                    ? "border-red-500"
                    : ""
                }`}
              />
              {errors.duration_minutes && touched.duration_minutes && (
                <div className="text-red-500 text-sm">
                  {typeof errors.duration_minutes === "string"
                    ? errors.duration_minutes
                    : ""}
                </div>
              )}
              <Label htmlFor="location">Địa điểm phỏng vấn</Label>
              <Input
                type="text"
                id="location"
                name="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.location && touched.location ? "border-red-500" : ""
                }`}
              />
              {errors.location && touched.location && (
                <div className="text-red-500 text-sm">
                  {typeof errors.location === "string" ? errors.location : ""}
                </div>
              )}
              <Label htmlFor="meetingLink">Link họp trực tuyến</Label>
              <Input
                type="text"
                id="meetingLink"
                name="meetingLink"
                value={values.meetingLink}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.meetingLink && touched.meetingLink
                    ? "border-red-500"
                    : ""
                }`}
              />
              {errors.meetingLink && touched.meetingLink && (
                <div className="text-red-500 text-sm">
                  {typeof errors.meetingLink === "string"
                    ? errors.meetingLink
                    : ""}
                </div>
              )}
              <Label htmlFor="notes">Ghi chú</Label>
              <Textarea
                id="note"
                name="note"
                value={values.note}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.note && touched.note ? "border-red-500" : ""
                }`}
              />
              {errors.note && touched.note && (
                <div className="text-red-500 text-sm">
                  {typeof errors.note === "string" ? errors.note : ""}
                </div>
              )}
              <Button
                type="submit"
                disabled={isSubmitting || !values.applicationID}
                className="mt-4"
              >
                {isSubmitting ? <LoadingSpinner /> : "Gửi lời mời phỏng vấn"}
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

const AcceptForWorkingAlertDialog = ({
  app,
}: {
  app: ApplicationInterface;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm">Chấp nhận cho công việc</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc chắn muốn chấp nhận ứng viên cho công việc này ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Việc này sẽ không thể hoàn tác. Ứng viên sẽ được xem xét cho công
            việc này.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Đóng</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              console.log("Accepting application:", app);
              if (app.stt !== undefined) {
                const res = await updateApplicationStatus(
                  Number(app.stt),
                  "WORKING"
                );
                if (res) {
                  toast.success(
                    "Đã chấp nhận ứng viên cho công việc thành công"
                  );
                  window.location.reload();
                }
              }
            }}
          >
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ContactInfo = ({ app }: { app: { resumeID: string } }) => {
  return (
    <>
      <Link href={`/cv/${app.resumeID}`} target="_blank">
        <Button variant="outline" size="sm">
          Xem CV
        </Button>
      </Link>
      <Button variant="outline" size="sm">
        Liên hệ
      </Button>
    </>
  );
};
