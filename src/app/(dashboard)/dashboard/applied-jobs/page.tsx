"use client";

import { getApplicationsByStudent } from "@/api/application-api";
import { Badge } from "@/components/ui/badge";
import PaginationFixed from "@/components/ui/pagination-fixed";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StudentApplicationResType } from "@/interfaces/application-interface";
import Link from "next/link";
import React, { useEffect } from "react";

export default function AppliedJobsPage() {
  const [page, setPage] = React.useState(1);
  // const [limit, setLimit] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [applications, setApplications] = React.useState<
    StudentApplicationResType[]
  >([]);
  useEffect(() => {
    async function fetchApplications() {
      setIsLoading(true);
      const res = await getApplicationsByStudent(page, 10);
      setApplications(res.items);
      setTotalPages(res.totalPagesCount);
      setIsLoading(false);
    }
    fetchApplications();
  }, [page]);
  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        <div className="flex flex-col gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Công việc</TableHead>
                <TableHead>CV ứng tuyển</TableHead>
                <TableHead>Thư xin việc</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày nộp</TableHead>
                <TableHead>Ngày cập nhật</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.stt}>
                  <TableHead>
                    <Link href={`/job/${application.jobID}`}>
                      {application.jobName}
                    </Link>
                  </TableHead>
                  <TableHead>
                    <Link
                      href={`/cv/${application.resumeID}`}
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      Xem CV
                    </Link>
                  </TableHead>
                  <TableHead>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1">
                          {application.coverletter.slice(0, 50)}...
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="text-sm">
                        {application.coverletter
                          .split(".")
                          .map((sentence, index) => (
                            <p key={index}>{sentence}</p>
                          ))}
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead>
                    {application.status === "PENDING" ? (
                      <Badge variant={"outline"} className="text-yellow-500">
                        Đang chờ
                      </Badge>
                    ) : application.status === "APPROVED" ? (
                      <Badge variant={"outline"} className="text-green-500">
                        Đã chấp nhận
                      </Badge>
                    ) : application.status === "INVITED" ? (
                      <Badge variant={"outline"} className="text-blue-500">
                        Đã mời phỏng vấn
                      </Badge>
                    ) : (
                      <Badge variant={"outline"} className="text-red-500">
                        Đã từ chối
                      </Badge>
                    )}
                  </TableHead>
                  <TableHead>
                    {application.appliedAt
                      ? new Date(application.appliedAt).toLocaleDateString(
                          "vi-VN"
                        )
                      : ""}
                  </TableHead>
                  <TableHead>
                    {application.updateAt
                      ? new Date(application.updateAt).toLocaleDateString(
                          "vi-VN"
                        )
                      : ""}
                  </TableHead>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PaginationFixed
            currentPage={page}
            onPageChange={setPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
}
