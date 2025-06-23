/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { searchResumes } from "@/api/resume-api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { ResumeInterface } from "@/interfaces/resume-interface";
import { useUserStore } from "@/stores/user-store";
import { useEffect, useState } from "react";
import { FileText, Calendar, Eye, Download, Edit } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function CvPage() {
  const { user } = useUserStore();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [resumes, setResumes] = useState<ResumeInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!user?.studentID) {
      toast.warning(
        "Bạn cần điền thông tin sinh viên để sử dụng tính năng này"
      );
      setTimeout(() => {
        window.location.href = "/dashboard/profile";
      }, 3000);
    }
  }, [user]);

  useEffect(() => {
    const fetchResumes = async () => {
      if (!user?.studentID) return;

      setLoading(true);
      setError(null);

      try {
        const res = await searchResumes(user.studentID, page, pageSize);
        if (res) {
          console.log("Fetched resumes:", res);
          setResumes(res);
          // Assuming the API returns total count or pages info
          // You might need to adjust this based on your API response structure
          setTotalPages(Math.ceil(res.length / pageSize));
        } else {
          setError("Không thể tải danh sách CV");
        }
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
        setError("Đã xảy ra lỗi khi tải CV");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [user?.studentID, page, pageSize]);

  const handleViewResume = (resumeId: string) => {
    // Navigate to resume detail page
    window.open(`/cv/${resumeId}`, "_blank");
  };

  const handleEditResume = (resumeId: string) => {
    // Navigate to resume edit page
    window.location.href = `/cv/edit/${resumeId}`;
  };

  const handleDownloadResume = (resumeId: string) => {
    // Implement download functionality
    console.log("Downloading resume:", resumeId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">CV của bạn</h1>
        <div className="w-full max-w-4xl space-y-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">CV của bạn</h1>
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center p-6">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Thử lại</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">CV của bạn</h1>
          <Link href="/cv/add">
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Tạo CV mới
            </Button>
          </Link>
        </div>

        {resumes.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center p-8">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Chưa có CV nào</h3>
              <p className="text-center text-muted-foreground mb-4">
                Bạn chưa tạo CV nào. Hãy tạo CV đầu tiên để bắt đầu tìm kiếm
                việc làm.
              </p>
              <Link href="/cv/add">
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Tạo CV đầu tiên
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {resumes.map((resume) => (
                <Card
                  key={resume.resumeID}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          {resume.jobTitle || "CV không có tiêu đề"}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4" />
                          Cập nhật lần cuối:{" "}
                          {formatDate(
                            resume.updatedAt || resume.createdAt || ""
                          )}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {/* <Badge
                          variant={resume.isPublic ? "default" : "secondary"}
                        >
                          {resume.isPublic ? "Công khai" : "Riêng tư"}
                        </Badge>
                        {resume.status && (
                          <Badge variant="outline">{resume.status}</Badge>
                        )} */}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {resume.introduction && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {resume.introduction}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {resume.skills &&
                          resume.skills.slice(0, 3).map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        {resume.skills && resume.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{resume.skills.length - 3} kỹ năng khác
                          </Badge>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        {/* <div className="text-sm text-muted-foreground">
                          {resume.viewCount
                            ? `${resume.viewCount} lượt xem`
                            : "Chưa có lượt xem"}
                        </div> */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              resume.resumeID &&
                              handleViewResume(resume.resumeID)
                            }
                            disabled={!resume.resumeID}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Xem
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditResume(resume.jobTitle)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Sửa
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleDownloadResume(resume.jobTitle)
                            }
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Tải
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
