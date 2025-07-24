"use client";

import {
  createApplication,
  getApplicationsByStudent,
} from "@/api/application-api";
import { getJobById } from "@/api/job-api";
import { savedJob } from "@/api/jobbookmark-api";
import { searchResumes } from "@/api/resume-api";
import { getEmployerInfoByID } from "@/api/user-api";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColourfulText } from "@/components/ui/text-colorful";
import { Textarea } from "@/components/ui/textarea";
import type { ApplicationInterface } from "@/interfaces/application-interface";
import type { JobInterface } from "@/interfaces/job-interface";
import type { ResumeInterface } from "@/interfaces/resume-interface";
import { EmployerInterface } from "@/interfaces/user-interface";
import { useUserStore } from "@/stores/user-store";
import { ApplicationValidationSchema } from "@/validations/application-validation";
import { Form, Formik } from "formik";
import {
  StarIcon,
  MapPin,
  Clock,
  Banknote,
  Building,
  Save,
  Filter,
  PersonStanding,
  Link2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

// Mock comment interface
interface JobComment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  jobId: string
  text: string
  rating: number
  createdAt: Date
}

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
]

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = use(params)
  const { user } = useUserStore()
  const [job, setJob] = useState<JobInterface | null>(null)
  const [jobEmployer, setJobEmployer] = useState<EmployerInterface | null>(null)
  const [isApplied, setIsApplied] = useState(false)
  const [userResumes, setUserResumes] = useState<ResumeInterface[]>([])
  const applicationData: ApplicationInterface = {
    jobID: resolvedParams.slug,
    studentID: user?.studentID || "",
    status: "PENDING",
    coverletter: "",
    resumeID: "",
    appliedAt: new Date(),
    updateAt: new Date(),
  };
  const [comments, setComments] = useState<JobComment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const fetchResumes = useCallback(async () => {
    if (!user?.studentID) return
    const res = await searchResumes(user.studentID, 1, 10)
    setUserResumes(res)
  }, [user?.studentID])

  useEffect(() => {
    const fetchJob = async (slug: string) => {
      setIsLoading(true)
      const fetchedJob = await getJobById(Number(slug))
      setJob(fetchedJob)
      setIsLoading(false)
    }

    const checkAppliedJob = async () => {
      if (!user?.studentID) return
      const res = await getApplicationsByStudent(1, 10)
      if (res) {
        console.log("Fetched applications:", res.items)
        console.log(resolvedParams.slug)
        const appliedJob = res.items.find(
          (app: ApplicationInterface) => String(app.jobID) === String(resolvedParams.slug),
        )
        if (appliedJob) {
          setIsApplied(true)
        } else {
          setIsApplied(false)
        }
      }
    }

    checkAppliedJob()
    fetchJob(resolvedParams.slug)
    fetchResumes()
  }, [fetchResumes, resolvedParams.slug, user?.studentID])

  useEffect(() => {
    const fetchJobEmployer = async () => {
      if (job?.employerID) {
        console.log("Fetching employer info for ID:", job.employerID)
        const res = await getEmployerInfoByID(job.employerID)
        setJobEmployer(res)
      }
    }

    fetchJobEmployer()
  }, [job?.employerID])

  const handleCommentSubmit = () => {
    if (newComment.trim() === "" || userRating === 0) return

    const newCommentObj: JobComment = {
      id: `comment-${Date.now()}`,
      userId: "current-user",
      userName: "Bạn",
      userAvatar: "/placeholder.svg?height=40&width=40",
      jobId: job?.jobID || "",
      text: newComment,
      rating: userRating,
      createdAt: new Date(),
    }

    setComments([newCommentObj, ...comments]);
    setNewComment("");
    setUserRating(0);
  };
  const handleSavedJob = async () => {
    console.log("job:", job);
  console.log("user:", user)
    if (!user?.studentID || !job?.jobID) {
      alert("Thiếu thông tin sinh viên hoặc công việc");
      return;
    }

    try {
      const result = await savedJob(Number(user.studentID), Number(job.jobID));
       if (result) {
      setIsSaved(true); 
      console.log("Đã lưu công việc:", result);
      toast.success("Đã lưu công việc!");
    }
    } catch (err) {
      console.error("Lỗi khi lưu công việc:", err);
      alert("Không thể lưu công việc!");
    };
  };

  const averageRating =
    comments.length > 0 ? comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length : 0

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
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Job Image */}
      <div
        className="relative h-80 overflow-hidden p-4 text-white drop-shadow-lg"
        style={{
          backgroundImage: `url('${job?.imageUrl || "/placeholder.svg"}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
        <div className="absolute inset-0"></div>
        {isApplied && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow-md font-semibold text-base z-10">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Đã ứng tuyển
          </div>
        )}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={"secondary"}>{job?.category}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <ColourfulText text={job?.title || "Công việc"} size="2rem" />
            </h1>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                <span>{jobEmployer?.companyName}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{job?.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Banknote className="h-5 w-5" />
                <span className="font-semibold">{job?.salary.toLocaleString("vi-VN")}₫</span>
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
                      star <= Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-white/40"
                    }`}
                  />
                ))}
              </div>
              <span className="">
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
              <TabsList className="mb-6 shadow-sm">
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
                      className=""
                      onClick={handleSavedJob}
                      disabled={isSaved}
                    >
                      <Save />
                      {isSaved ? "Đã lưu" : "Lưu công việc"}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                        <ul className="space-y-2">
                          {job?.description.split(".").map((des, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="">{des.trim()}</span>
                            </li>
                          ))}
                        </ul>

                      <h3 className="text-lg font-semibold mb-4">
                        Yêu cầu công việc
                      </h3>
                      <ul className="space-y-2 mb-8">
                        {job?.requirements.split(".").map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="">{req}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8">{jobEmployer?.description}</div>
                      <Image
                        src={job?.imageUrl || "/placeholder.svg"}
                        alt={job?.title || "Job Image"}
                        width={800}
                        height={400}
                        className="mt-4 w-full h-auto rounded-lg shadow-sm mb-6"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    {user?.role === "Student" && !isApplied && (
                      <Dialog>
                        <DialogTrigger asChild className="w-full">
                          <Button>Ứng tuyển ngay</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-lg font-semibold mb-4">
                              Chọn CV của bạn để ứng tuyển
                            </DialogTitle>
                          </DialogHeader>
                          <Formik
                            initialValues={applicationData}
                            validationSchema={ApplicationValidationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                              // Handle application submission logic here
                              setSubmitting(true);
                              console.log("Submitting application:", values);
                              const res = await createApplication(values);
                              if (res) {
                                toast.success("Ứng tuyển thành công!");
                                setTimeout(() => {
                                  window.location.reload();
                                }, 1000);
                              } else {
                                toast.error("Ứng tuyển thất bại!");
                              }
                              setSubmitting(false);
                            }}
                          >
                            {({
                              errors,
                              touched,
                              handleSubmit,
                              handleChange,
                              handleBlur,
                              values,
                              isSubmitting,
                            }) => (
                              <Form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                  <Label className="text-sm font-medium">
                                    Chọn CV để ứng tuyển
                                  </Label>
                                  <RadioGroup
                                    value={values.resumeID}
                                    onValueChange={(value) => {
                                      handleChange({
                                        target: { name: "resumeID", value },
                                      });
                                    }}
                                    className="space-y-4"
                                  >
                                    {userResumes.length > 0 ? (
                                      userResumes.map((resume) => (
                                        <div
                                          key={resume.resumeID}
                                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                                        >
                                          <div className="flex items-center space-x-3">
                                            <RadioGroupItem
                                              value={resume.resumeID ?? ""}
                                              id={`resume-${resume.resumeID}`}
                                            />
                                            <Label
                                              htmlFor={`resume-${resume.resumeID}`}
                                              className="text-sm font-medium cursor-pointer"
                                            >
                                              {resume.jobTitle ||
                                                resume.fullName ||
                                                "CV không có tiêu đề"}
                                            </Label>
                                          </div>
                                          <Link
                                            href={`/cv/${resume.resumeID}`}
                                            className="text-blue-600 hover:underline text-sm"
                                            target="_blank"
                                          >
                                            Xem CV
                                          </Link>
                                        </div>
                                      ))
                                    ) : (
                                      <div className="text-center py-8">
                                        <div className="text-gray-500 mb-2">
                                          Bạn chưa có CV nào.
                                        </div>
                                        <Link
                                          href="/cv/add"
                                          className="text-blue-600 hover:underline text-sm"
                                        >
                                          Tạo CV mới
                                        </Link>
                                      </div>
                                    )}
                                  </RadioGroup>

                                  {errors.resumeID && touched.resumeID && (
                                    <div className="text-red-600 text-sm mt-2">
                                      {errors.resumeID}
                                    </div>
                                  )}
                                </div>
                                <Label htmlFor="coverLetter" className="mt-4">
                                  Cover Letter
                                </Label>
                                <Textarea
                                  id="coverletter"
                                  placeholder="Viết thư xin việc của bạn tại đây..."
                                  className="min-h-[100px] resize-none my-4"
                                  value={values.coverletter}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />

                                {errors.coverletter && touched.coverletter && (
                                  <div className="text-red-600 text-sm">
                                    {errors.coverletter}
                                  </div>
                                )}
                                <DialogFooter>
                                  <Button type="submit" disabled={isSubmitting}>
                                    Ứng tuyển
                                  </Button>
                                </DialogFooter>
                              </Form>
                            )}
                          </Formik>
                        </DialogContent>
                      </Dialog>
                    )}
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
                            className="p-4 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow"
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
                                    {comment.createdAt
                                      ? new Date(
                                          comment.createdAt
                                        ).toLocaleDateString("vi-VN")
                                      : ""}
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
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <StarIcon className="h-8 w-8" />
                        </div>
                        <p className="text-lg">
                          Chưa có đánh giá nào cho công việc này
                        </p>
                        <p className="text-sm mt-1">
                          Hãy là người đầu tiên chia sẻ trải nghiệm của bạn
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="bg-zinc-100 dark:bg-slate-900 pt-2">
                <CardTitle className="text-lg">Về chúng tôi</CardTitle>
              </CardHeader>
              <CardContent className="">
                <div className="">
                  <div className="flex items-center gap-3 p-3 rounded-lg">
                    <Building />
                    <div>
                      <h3 className="text-sm font-medium text-gray-600">Công ty</h3>
                      <p className="font-semibold">{jobEmployer?.companyName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg">
                    <MapPin />
                    <div>
                      <h3 className="text-sm font-medium">Địa điểm</h3>
                      <p className="font-semibold">{jobEmployer?.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg">
                    <Filter />
                    <div>
                      <h3 className="text-sm font-medium">Lĩnh vực</h3>
                      <p className="font-semibold">{jobEmployer?.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg">
                    <PersonStanding />
                    <div>
                      <h3 className="text-sm font-medium">Quy mô</h3>
                      <p className="font-semibold">
                        {Number(jobEmployer?.companySize).toLocaleString("vi-VN")} nhân viên
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg">
                    <Link2 />
                    <div>
                      <h3 className="text-sm font-medium">Website</h3>
                      <Link
                        href={jobEmployer?.website || "#"}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        <p className="font-semibold">{jobEmployer?.website}</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Công việc tương tự</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">{/* Similar jobs would go here */}</div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full bg-transparent">
                  Xem thêm công việc
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Reviews Section - Full Width at Bottom */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Đánh giá từ người dùng</CardTitle>
              <CardDescription>Chia sẻ trải nghiệm của bạn về công việc này</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-lg mb-6 border">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Đánh giá của bạn</label>
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
                  <label htmlFor="comment" className="block text-sm font-medium mb-2">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-4 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow bg-white"
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
                          <h4 className="font-medium text-gray-900">{comment.userName}</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= comment.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">
                              {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString("vi-VN") : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <StarIcon className="h-8 w-8" />
                  </div>
                  <p className="text-lg">Chưa có đánh giá nào cho công việc này</p>
                  <p className="text-sm mt-1">Hãy là người đầu tiên chia sẻ trải nghiệm của bạn</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
