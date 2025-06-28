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
import { Slider } from "@/components/ui/slider";
import type { JobInterface } from "@/interfaces/job-interface";
import { useUserStore } from "@/stores/user-store";
import { Banknote, Clock, MapPin, Search, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function JobPage() {
  const { user } = useUserStore();
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchMinSalary, setSearchMinSalary] = useState(0);
  const [searchMaxSalary, setSearchMaxSalary] = useState(1000000000);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState<JobInterface[]>([]);
  const [initialData, setInitialData] = useState<JobInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Custom debounce hook
  const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  // Debounced search values
  const debouncedSearchTitle = useDebounce(searchTitle, 500);
  const debouncedSearchLocation = useDebounce(searchLocation, 500);
  const debouncedMinSalary = useDebounce(searchMinSalary, 300);
  const debouncedMaxSalary = useDebounce(searchMaxSalary, 300);

  // Track if user is actively searching (values are different from debounced values)
  useEffect(() => {
    const isActivelySearching =
      searchTitle !== debouncedSearchTitle ||
      searchLocation !== debouncedSearchLocation ||
      searchMinSalary !== debouncedMinSalary ||
      searchMaxSalary !== debouncedMaxSalary;

    setIsSearching(isActivelySearching);
  }, [
    searchTitle,
    debouncedSearchTitle,
    searchLocation,
    debouncedSearchLocation,
    searchMinSalary,
    debouncedMinSalary,
    searchMaxSalary,
    debouncedMaxSalary,
  ]);

  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      const res = await getJobs(
        page,
        pageSize,
        debouncedSearchTitle,
        searchCategory,
        debouncedSearchLocation,
        debouncedMinSalary,
        debouncedMaxSalary
      );
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
  }, [
    page,
    pageSize,
    searchCategory,
    debouncedSearchLocation,
    debouncedMaxSalary,
    debouncedMinSalary,
    debouncedSearchTitle,
    user,
  ]);

  // Lazy loading skeleton component for job cards
  const JobCardSkeleton = () => (
    <Card className="mb-4 relative">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-24" />
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-16 px-4 rounded-xl mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Tìm Công Việc <span className="text-yellow-300">Mơ Ước</span> Của
            Bạn
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
        <div className="flex flex-col w-1/4">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Tìm kiếm công việc
                {isSearching && (
                  <Loader2 className="w-4 h-4 animate-spin text-green-500" />
                )}
              </CardTitle>
              <CardDescription>
                Lọc công việc theo tiêu chí của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Job Title Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tên công việc</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nhập tên công việc..."
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      searchTitle !== debouncedSearchTitle
                        ? "border-green-300 bg-green-50"
                        : "border-gray-300"
                    }`}
                  />
                  {searchTitle !== debouncedSearchTitle && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Loader2 className="w-4 h-4 animate-spin text-green-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Danh mục</label>
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Tất cả danh mục</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Thực tập">Thực tập</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Thời vu">Thời vụ</option>
                </select>
              </div>

              {/* Location Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Địa điểm</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nhập địa điểm..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      searchLocation !== debouncedSearchLocation
                        ? "border-green-300 bg-green-50"
                        : "border-gray-300"
                    }`}
                  />
                  {searchLocation !== debouncedSearchLocation && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Loader2 className="w-4 h-4 animate-spin text-green-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Salary Range Slider */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  Mức lương (VNĐ)
                  {(searchMinSalary !== debouncedMinSalary ||
                    searchMaxSalary !== debouncedMaxSalary) && (
                    <Loader2 className="w-4 h-4 animate-spin text-green-500" />
                  )}
                </label>
                <div className="px-2">
                  <Slider
                    value={[
                      searchMinSalary,
                      searchMaxSalary === 1000000000
                        ? 100000000
                        : searchMaxSalary,
                    ]}
                    onValueChange={(value) => {
                      setSearchMinSalary(value[0]);
                      setSearchMaxSalary(value[1]);
                    }}
                    max={100000000}
                    min={0}
                    step={1000000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>0₫</span>
                    <span>100M₫</span>
                  </div>
                </div>

                {/* Display selected range */}
                <div
                  className={`rounded-lg p-3 transition-colors ${
                    searchMinSalary !== debouncedMinSalary ||
                    searchMaxSalary !== debouncedMaxSalary
                      ? "bg-green-50 border border-green-200"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Từ:</span>
                    <span className="font-medium text-green-600">
                      {searchMinSalary.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600">Đến:</span>
                    <span className="font-medium text-green-600">
                      {(searchMaxSalary === 1000000000
                        ? 100000000
                        : searchMaxSalary
                      ).toLocaleString("vi-VN")}
                      ₫
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Salary Filters */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Mức lương phổ biến
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchMinSalary(0);
                      setSearchMaxSalary(10000000);
                    }}
                    className="text-xs"
                  >
                    {"< 10M"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchMinSalary(10000000);
                      setSearchMaxSalary(20000000);
                    }}
                    className="text-xs"
                  >
                    10M - 20M
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchMinSalary(20000000);
                      setSearchMaxSalary(30000000);
                    }}
                    className="text-xs"
                  >
                    20M - 30M
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchMinSalary(30000000);
                      setSearchMaxSalary(100000000);
                    }}
                    className="text-xs"
                  >
                    {"> 30M"}
                  </Button>
                </div>
              </div>

              {/* Clear Filters */}
              <div className="pt-4 border-t">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchTitle("");
                    setSearchCategory("");
                    setSearchLocation("");
                    setSearchMinSalary(0);
                    setSearchMaxSalary(100000000);
                    setPage(1);
                  }}
                  className="w-full text-gray-600 hover:text-gray-800"
                >
                  <X className="w-4 h-4 mr-2" />
                  Xóa bộ lọc
                </Button>
              </div>

              {/* Search Results Count */}
              {!isLoading && !isSearching && (
                <div className="pt-2 text-center">
                  <p className="text-sm text-gray-600">
                    Tìm thấy{" "}
                    <span className="font-semibold text-green-600">
                      {initialData.length}
                    </span>{" "}
                    công việc
                  </p>
                </div>
              )}

              {/* Searching indicator */}
              {isSearching && (
                <div className="pt-2 text-center">
                  <p className="text-sm text-green-600 flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang tìm kiếm...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="w-2/4">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <JobCardSkeleton key={index} />
              ))}
            </div>
          ) : isSearching ? (
            <div className="space-y-4">
              {/* Show current results with overlay */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                  <div className="flex items-center gap-2 text-green-600 bg-white px-4 py-2 rounded-full shadow-md">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-medium">
                      Đang cập nhật kết quả...
                    </span>
                  </div>
                </div>
                {initialData.length > 0 ? (
                  initialData.map((job) => (
                    <Card key={job.jobID} className="mb-4 relative opacity-50">
                      <div className="absolute top-4 right-4 z-10">
                        {appliedJobs.some(
                          (appliedJob) => appliedJob.jobID === job.jobID
                        ) ? (
                          <Badge variant="secondary">Đã ứng tuyển</Badge>
                        ) : (
                          <></>
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
                          {job.createdAt?.toString()}
                          <span>
                            {job.createdAt
                              ? new Date(job.createdAt).toLocaleDateString(
                                  "vi-VN"
                                )
                              : "N/A"}
                          </span>
                        </div>
                        <Button asChild variant={"outline"}>
                          <Link href={`/job/${job.jobID}`}>Xem chi tiết</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">Không có công việc nào</div>
                )}
              </div>
            </div>
          ) : (
            <div>
              {initialData.length > 0 ? (
                initialData.map((job) => (
                  <Card key={job.jobID} className="mb-4 relative">
                    <div className="absolute top-4 right-4 z-10">
                      {appliedJobs.some(
                        (appliedJob) => appliedJob.jobID === job.jobID
                      ) ? (
                        <Badge variant="secondary">Đã ứng tuyển</Badge>
                      ) : (
                        <></>
                      )}
                    </div>

                    <CardHeader>
                      <CardTitle className="flex items-center text-xl gap-2 pr-32">
                        {job.title}
                        <Badge>{job.category}</Badge>
                      </CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5">
                        {job.description.split(".").map((des, index) => (
                          <li key={index} className="flex items-center">
                            <p>{des.trim()}</p>
                          </li>
                        ))}
                      </ul>
                      {/* <ul className="space-y-2">
                        {job.requirements.split(".").map((des, index) => (
                          <li key={index} className="flex items-center">
                            <p>{des.trim()}</p>
                          </li>
                        ))}
                      </ul> */}
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
                          {job.createdAt
                            ? new Date(job.createdAt).toLocaleDateString(
                                "vi-VN"
                              )
                            : "N/A"}
                        </span>
                      </div>
                      <Button asChild variant={"outline"}>
                        <Link href={`/job/${job.jobID}`}>Xem chi tiết</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">Không có công việc nào</div>
              )}
            </div>
          )}
        </div>

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
