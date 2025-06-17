"use client";

import React, { useEffect, useState } from "react";
import type { JobInterface } from "@/interfaces/job-interface";
import type { ApplicationInterface } from "@/interfaces/application-interface";
import { getJobByEmployerId } from "@/api/job-api";
import { getApplicationsByJob } from "@/api/application-api";
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
      ACCEPTED: {
        variant: "outline" as const,
        className: "text-green-600",
        text: "Chấp nhận",
      },
      REJECTED: {
        variant: "outline" as const,
        className: "text-red-600",
        text: "Từ chối",
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobPosts.map((job) => (
                <React.Fragment key={job.jobID}>
                  {/* Main Job Row */}
                  <TableRow className="hover:bg-gray-50">
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
                        {job.description.slice(0, 50)}...
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={job.requirements}>
                        {job.requirements.slice(0, 30)}...
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
                      {job.status === "Active" ? (
                        <Badge variant="outline" className="text-green-500">
                          Hoạt động
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-500">
                          Ngừng hoạt động
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>

                  {/* Expanded Applications Row */}
                  {expandedRows.has(String(job.jobID)) && (
                    <TableRow>
                      <TableCell colSpan={8} className="p-0">
                        <div className="bg-gray-50 border-t">
                          {loadingApplications.has(String(job.jobID)) ? (
                            <div className="flex items-center justify-center py-8">
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
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

                              <div className="bg-white rounded-lg border overflow-hidden">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Mã sinh viên</TableHead>
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
                                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <User className="h-4 w-4 text-blue-600" />
                                              </div>
                                              {app.studentID}
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
                                              <span className="text-gray-400">
                                                Không có
                                              </span>
                                            )}
                                          </TableCell>
                                          <TableCell>
                                            <div className="flex gap-2">
                                              <Button
                                                variant="outline"
                                                size="sm"
                                              >
                                                Xem CV
                                              </Button>
                                              <Button
                                                variant="outline"
                                                size="sm"
                                              >
                                                Liên hệ
                                              </Button>
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
                              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
