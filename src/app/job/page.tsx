/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { getApplicationsByStudent } from "@/api/application-api";
import { getJobs } from "@/api/job-api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PaginationFixed from "@/components/ui/pagination-fixed";
import { Skeleton } from "@/components/ui/skeleton";
import type { JobInterface } from "@/interfaces/job-interface";
import { useUserStore } from "@/stores/user-store";
import {
  Banknote,
  Circle,
  CircleIcon as CircleSmall,
  Clock,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function JobPage() {
  const { user } = useUserStore();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState<JobInterface[]>([]);
  const [initialData, setInitialData] = useState<JobInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      const res = await getJobs(page, pageSize);
      if (res) {
        console.log("Fetched jobs:", res);
        setInitialData(res.items);
        setTotalPages(res.totalPagesCount);
      }
      setIsLoading(false);
    }
    async function checkAppliedJobs() {
      if (!user || !user.studentID) return;
      const res = await getApplicationsByStudent(1, 10);
      if (res) {
        setAppliedJobs(res.items);
      }
    }
    checkAppliedJobs();
    fetchJobs();
  }, [page, pageSize, user]);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-16 px-4 rounded-xl mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Tìm Công Việc <span className="text-yellow-300">Mơ Ước</span> Của Bạn
          </h1>

          <p className="text-lg sm:text-xl mb-12 text-green-50 max-w-2xl mx-auto">
            Khám phá hàng nghìn cơ hội việc làm từ các công ty hàng đầu
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                1000+
              </div>
              <div className="text-sm sm:text-base text-green-100">
                Công việc
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                500+
              </div>
              <div className="text-sm sm:text-base text-green-100">Công ty</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                50+
              </div>
              <div className="text-sm sm:text-base text-green-100">
                Lĩnh vực
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full mt-4 gap-4">
        <div className="flex flex-col w-1/4">s</div>
        {isLoading ? (
          <Skeleton className="w-2/4 h-96" />
        ) : (
          <div className="w-2/4">
            {initialData.length > 0 ? (
              initialData.map((job) => (
                <Card key={job.jobID} className="mb-4 relative">
                  <div className="absolute top-4 right-4 z-10">
                    {appliedJobs.some(
                      (appliedJob) => appliedJob.jobID === job.jobID
                    ) ? (
                      <Badge variant="secondary">Đã ứng tuyển</Badge>
                    ) : (
                      <Badge variant="outline">Chưa ứng tuyển</Badge>
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle className="flex items-center text-xl gap-2 pr-32">
                      {job.title}
                      <Badge>{job.category}</Badge>
                    </CardTitle>
                    <CardDescription>{job.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.requirements.split(".").map((des, index) => (
                        <li key={index} className="flex items-center">
                          🟢
                          <p>{des.trim()}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Banknote />
                      <span>{job.salary.toLocaleString("vi-VN")}₫</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock />
                      <span>
                        {new Date(job.startDate).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <Button asChild variant={"outline"}>
                      <Link href={`/job/${job.jobID}`}>Xem chi tiết</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center">Không có công việc nào</div>
            )}
          </div>
        )}
        <div className="flex flex-col items-center w-1/4 gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Nhận email thông báo công việc</CardTitle>
              <CardDescription>
                Đăng ký nhận thông báo qua email khi có công việc mới phù hợp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col space-y-4">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="p-2 border rounded"
                  required
                />
                <Button type="submit" className="w-full">
                  Đăng ký
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-gray-500">
                * Chúng tôi sẽ không gửi spam. Bạn có thể hủy đăng ký bất cứ lúc
                nào.
              </p>
            </CardFooter>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Tại sao lại chọn chúng tôi ?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Đa dạng công việc từ nhiều lĩnh vực</li>
                <li>Thông tin chi tiết và minh bạch</li>
                <li>Hỗ trợ tìm kiếm việc làm nhanh chóng</li>
                <li>Nhận thông báo công việc mới qua email</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <PaginationFixed
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
