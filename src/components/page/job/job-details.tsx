"use client";

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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { jobConst } from "@/const/job-const";
import type { JobInterface } from "@/interfaces/job-interface";
import {
  StarIcon,
  MapPin,
  Clock,
  Banknote,
  Calendar,
  Building,
  Save,
} from "lucide-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";

// Mock comment interface
interface JobComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  jobId: string;
  text: string;
  rating: number;
  createdAt: Date;
}

// Mock comments data
const mockComments: JobComment[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Nguyễn Văn A",
    userAvatar: "/placeholder.svg?height=40&width=40",
    jobId: "1",
    text: "Công việc rất phù hợp với người mới bắt đầu. Môi trường làm việc thoải mái và đồng nghiệp thân thiện.",
    rating: 4,
    createdAt: new Date("2023-11-10"),
  },
  {
    id: "2",
    userId: "user2",
    userName: "Trần Thị B",
    userAvatar: "/placeholder.svg?height=40&width=40",
    jobId: "1",
    text: "Mức lương hợp lý, nhưng khối lượng công việc hơi nhiều. Cần cải thiện về chế độ làm việc ngoài giờ.",
    rating: 3,
    createdAt: new Date("2023-11-05"),
  },
  {
    id: "3",
    userId: "user3",
    userName: "Lê Văn C",
    userAvatar: "/placeholder.svg?height=40&width=40",
    jobId: "1",
    text: "Tuyệt vời! Tôi đã học được rất nhiều kỹ năng mới từ công việc này. Sếp rất tâm lý và luôn hỗ trợ nhân viên.",
    rating: 5,
    createdAt: new Date("2023-10-28"),
  },
];

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [job, setJob] = useState<JobInterface | null>(null);
  const [comments, setComments] = useState<JobComment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, you would fetch the job by ID from an API
  useEffect(() => {
    const foundJob =
      jobConst.data.find((j) => j.id === resolvedParams.slug) ||
      jobConst.data[0];
    setJob(foundJob);
    setIsLoading(false);
    
    // In a real app, you would fetch comments for this specific job
    // For now, we'll just use our mock data
  }, [resolvedParams.slug]);

  const handleCommentSubmit = () => {
    if (newComment.trim() === "" || userRating === 0) return;

    const newCommentObj: JobComment = {
      id: `comment-${Date.now()}`,
      userId: "current-user",
      userName: "Bạn",
      userAvatar: "/placeholder.svg?height=40&width=40",
      jobId: job?.id || "",
      text: newComment,
      rating: userRating,
      createdAt: new Date(),
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");
    setUserRating(0);
  };

  const averageRating =
    comments.length > 0
      ? comments.reduce((sum, comment) => sum + comment.rating, 0) /
        comments.length
      : 0;

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-6">
          <Skeleton className="h-64 w-full rounded-lg" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-96 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Job Image */}
      <div className="relative h-80 bg-gradient-to-r from-green-600 to-green-200 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={job?.imageUrl || "/placeholder.svg?height=320&width=1200"}
            alt={job?.title || "Job Image"}
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={"secondary"}>{job?.category}</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {job?.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                <span>ID: {job?.employerId}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{job?.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Banknote className="h-5 w-5" />
                <span className="font-semibold">
                  {job?.salary.toLocaleString("vi-VN")}₫
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{job?.workingHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-white/40"
                    }`}
                  />
                ))}
              </div>
              <span className="text-white/90">
                {averageRating.toFixed(1)} ({comments.length} đánh giá)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs
              defaultValue="details"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="mb-6 bg-white shadow-sm">
                <TabsTrigger value="details" className="px-6">
                  Chi tiết công việc
                </TabsTrigger>
                <TabsTrigger value="comments" className="px-6">
                  Đánh giá ({comments.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <Card className="shadow-sm">
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle className="text-xl">Mô tả công việc</CardTitle>
                    <Button
                      variant="outline"
                      className="text-gray-600 hover:text-gray-900"
                      onClick={() => alert("Chia sẻ công việc")}
                    >
                      <Save />
                      Lưu công việc
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-8">
                        {job?.description}
                      </p>

                      <h3 className="text-lg font-semibold mb-4 text-gray-900">
                        Yêu cầu công việc
                      </h3>
                      <ul className="space-y-2 mb-8">
                        {job?.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4 text-gray-900">
                            Thông tin chung
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <span>Địa điểm</span>
                              </div>
                              <span className="font-medium text-gray-900">
                                {job?.location}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Banknote className="h-4 w-4" />
                                <span>Mức lương</span>
                              </div>
                              <span className="font-medium text-gray-900">
                                {job?.salary.toLocaleString("vi-VN")}₫
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span>Giờ làm việc</span>
                              </div>
                              <span className="font-medium text-gray-900">
                                {job?.workingHours}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>Ngày bắt đầu</span>
                              </div>
                              <span className="font-medium text-gray-900">
                                {job?.startDate.toLocaleDateString("vi-VN")}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4 text-gray-900">
                            Thông tin nhà tuyển dụng
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Building className="h-4 w-4" />
                                <span>ID nhà tuyển dụng</span>
                              </div>
                              <span className="font-medium text-gray-900">
                                {job?.employerId}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>Ngày đăng</span>
                              </div>
                              <span className="font-medium text-gray-900">
                                {job?.createdAt?.toLocaleDateString("vi-VN")}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>Cập nhật</span>
                              </div>
                              <span className="font-medium text-gray-900">
                                {job?.updatedAt?.toLocaleDateString("vi-VN")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Image
                        src={
                          job?.imageUrl ||
                          "/placeholder.svg?height=400&width=800"
                        }
                        alt={job?.title || "Job Image"}
                        width={800}
                        height={400}
                        className="mt-6 rounded-lg object-cover w-full"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Ứng tuyển ngay</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="comments">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Đánh giá từ người dùng
                    </CardTitle>
                    <CardDescription>
                      Chia sẻ trải nghiệm của bạn về công việc này
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                          Đánh giá của bạn
                        </label>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={`h-6 w-6 cursor-pointer transition-colors ${
                                rating <= (hoveredRating || userRating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 hover:text-yellow-300"
                              }`}
                              onMouseEnter={() => setHoveredRating(rating)}
                              onMouseLeave={() => setHoveredRating(0)}
                              onClick={() => setUserRating(rating)}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="comment"
                          className="block text-sm font-medium mb-2"
                        >
                          Nhận xét của bạn
                        </label>
                        <Textarea
                          id="comment"
                          placeholder="Chia sẻ trải nghiệm của bạn về công việc này..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[100px] resize-none"
                        />
                      </div>

                      <Button
                        onClick={handleCommentSubmit}
                        disabled={newComment.trim() === "" || userRating === 0}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Gửi đánh giá
                      </Button>
                    </div>

                    <Separator className="my-6" />

                    {comments.length > 0 ? (
                      <div className="space-y-6">
                        {comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <Image
                                src={comment.userAvatar || "/placeholder.svg"}
                                alt={comment.userName}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {comment.userName}
                                </h4>
                                <div className="flex items-center gap-2">
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <StarIcon
                                        key={star}
                                        className={`h-4 w-4 ${
                                          star <= comment.rating
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    {comment.createdAt.toLocaleDateString(
                                      "vi-VN"
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                              {comment.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <StarIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-lg">
                          Chưa có đánh giá nào cho công việc này
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          Hãy là người đầu tiên chia sẻ trải nghiệm của bạn
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                <CardTitle className="text-lg">Thông tin nhanh</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Building className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-600">
                        Vị trí
                      </h3>
                      <p className="font-semibold text-gray-900">
                        {job?.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-600">
                        Địa điểm
                      </h3>
                      <p className="font-semibold text-gray-900">
                        {job?.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Banknote className="h-5 w-5 text-yellow-600" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-600">
                        Mức lương
                      </h3>
                      <p className="font-semibold text-gray-900">
                        {job?.salary.toLocaleString("vi-VN")}₫
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-600">
                        Giờ làm việc
                      </h3>
                      <p className="font-semibold text-gray-900">
                        {job?.workingHours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-red-600" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-600">
                        Ngày bắt đầu
                      </h3>
                      <p className="font-semibold text-gray-900">
                        {job?.startDate.toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => alert("Ứng tuyển công việc")}
                >
                  Ứng tuyển ngay
                </Button>
              </CardFooter>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Công việc tương tự</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobConst.data.slice(0, 3).map((similarJob) => (
                    <div
                      key={similarJob.id}
                      className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                    >
                      <div className="flex gap-3">
                        <Image
                          src={
                            similarJob.imageUrl ||
                            "/placeholder.svg?height=60&width=60"
                          }
                          alt={similarJob.title}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {similarJob.title}
                          </h4>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {similarJob.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Banknote className="h-3 w-3 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">
                              {similarJob.salary.toLocaleString("vi-VN")}₫
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Xem thêm công việc
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
