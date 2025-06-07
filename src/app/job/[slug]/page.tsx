import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  MapPin,
  MessageCircleMore,
  DollarSign,
  Briefcase,
  Calendar,
  Users,
  Globe,
  Mail,
  Phone,
  Building,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const job = {
  id: 1,
  title: "Lập trình viên",
  type: "Part Time",
  timeLeft: "Còn 5 ngày",
  salary: "10 triệu - 15 triệu",
  experienceRequired: "1 năm",
  description:
    "FPT Software đang tìm kiếm một lập trình viên phần mềm có kinh nghiệm để tham gia vào các dự án phát triển phần mềm của chúng tôi. Bạn sẽ làm việc trong một môi trường năng động và sáng tạo, cùng với đội ngũ kỹ sư tài năng.",
  requirements: [
    "Tốt nghiệp đại học chuyên ngành CNTT hoặc liên quan.",
    "Có ít nhất 1 năm kinh nghiệm lập trình phần mềm.",
    "Sử dụng thành thạo ngôn ngữ lập trình như Java, C#, Python.",
  ],
  duties: [
    "Tham gia phát triển phần mềm theo yêu cầu của dự án.",
    "Làm việc với nhóm để hoàn thành các nhiệm vụ được giao.",
    "Thực hiện kiểm tra và sửa lỗi phần mềm.",
    "Cập nhật tài liệu kỹ thuật liên quan đến dự án.",
  ],
  image:
    "https://imgcdn.tapchicongthuong.vn/tcct-media/24/6/19/tap-doan-fpt_6672e32301b4f.jpg",
  companyName: "FPT Software",
  companyLogo:
    "https://aptech.fpt.edu.vn/wp-content/uploads/2021/04/logo-fpt.jpg",
  companyEstablished: "2020",
  companySize: "50-100",
  companyAddress: "123 Đường ABC, Quận 1, TP.HCM",
  companyWebsite: "https://example.com",
  companyDescription:
    "FPT Software là một trong những công ty hàng đầu trong lĩnh vực phát triển phần mềm tại Việt Nam. Chúng tôi cung cấp các giải pháp công nghệ thông tin cho khách hàng trong và ngoài nước.",
  companyEmail: "swork@gmail.com",
  companyPhone: "0123456789",
};

const comments = [
  {
    id: 1,
    user: {
      name: "Nguyen Van A",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Công việc rất thú vị, môi trường làm việc thân thiện và chuyên nghiệp.",
    createdAt: "2023-10-01",
  },
  {
    id: 2,
    user: {
      name: "Nguyen Van B",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Mình đã làm việc ở đây được 2 năm, rất hài lòng với công việc và đồng nghiệp.",
    createdAt: "2023-10-02",
  },
  {
    id: 3,
    user: {
      name: "Nguyen Van C",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Công ty có nhiều cơ hội phát triển nghề nghiệp và học hỏi.",
    createdAt: "2023-10-03",
  },
  {
    id: 4,
    user: {
      name: "Nguyen Van D",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Mình rất thích văn hóa làm việc ở đây, mọi người rất thân thiện và hỗ trợ nhau.",
    createdAt: "2023-10-04",
  },
];

const JobHeader = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border-b">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <Image
                src={job.companyLogo || "/placeholder.svg"}
                alt={`${job.companyName} logo`}
                width={120}
                height={120}
                className="rounded-lg border bg-white dark:bg-gray-800 p-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-medium text-muted-foreground dark:text-gray-300">
                  {job.companyName}
                </h1>
                <Badge className="dark:bg-green-700 dark:text-white">
                  {job.type}
                </Badge>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                {job.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{job.timeLeft}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.companyAddress}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Button
              variant="default"
              size="lg"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg transition dark:bg-green-700 dark:hover:bg-green-800"
            >
              Nộp đơn ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
const JobContent = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Briefcase className="h-5 w-5" />
                Thông tin công việc
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed dark:text-gray-300">
                {job.description}
              </p>
              <div>
                <h3 className="text-lg font-semibold mb-3 dark:text-white">
                  Chi tiết công việc
                </h3>
                <ul className="space-y-2">
                  {job.duties.map((duty, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground dark:text-gray-300">
                        {duty}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 dark:text-white">Yêu cầu</h3>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground dark:text-gray-300">
                        {requirement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={job.image || "/placeholder.svg"}
                  alt="Job illustration"
                  width={800}
                  height={600}
                  className="w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Building className="h-5 w-5" />
                Về công ty
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed dark:text-gray-300">
                {job.companyDescription}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Tổng quan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  <span className="font-medium dark:text-gray-200">Lương</span>
                </div>
                <span className="text-muted-foreground dark:text-gray-300">
                  {job.salary}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  <span className="font-medium dark:text-gray-200">Kinh nghiệm</span>
                </div>
                <span className="text-muted-foreground dark:text-gray-300">
                  {job.experienceRequired}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  <span className="font-medium dark:text-gray-200">Thời gian</span>
                </div>
                <span className="text-muted-foreground dark:text-gray-300">
                  {job.type}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Vị trí</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501715.50184849347!2d106.3548500664715!3d10.761253013396889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eefdb25d923%3A0x4bcf54ddca2b7214!2zSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1743174282799!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  className="border-0"
                  loading="lazy"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  <span className="font-medium dark:text-gray-200">Website</span>
                </div>
                <Link
                  href={job.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-green-600 transition dark:text-green-400"
                >
                  {job.companyWebsite}
                </Link>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  <span className="font-medium dark:text-gray-200">Email</span>
                </div>
                <span className="text-muted-foreground text-sm dark:text-gray-300">
                  {job.companyEmail}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  <span className="font-medium dark:text-gray-200">Điện thoại</span>
                </div>
                <span className="text-muted-foreground text-sm dark:text-gray-300">
                  {job.companyPhone}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  <span className="font-medium dark:text-gray-200">Thành lập</span>
                </div>
                <span className="text-muted-foreground text-sm dark:text-gray-300">
                  {job.companyEstablished}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                  <span className="font-medium dark:text-gray-200">Nhân viên</span>
                </div>
                <span className="text-muted-foreground text-sm dark:text-gray-300">
                  {job.companySize}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const CommentSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900 border-t py-12">
      <div className="container mx-auto px-4">
        <Card className="shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader className="bg-white dark:bg-gray-800 rounded-t-lg border-b">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold text-green-700 dark:text-green-300">
              <MessageCircleMore className="h-6 w-6 text-green-500 dark:text-green-300" />
              Đánh giá từ nhân viên
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 bg-white dark:bg-gray-800 rounded-b-lg">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 border-2 border-green-400 dark:border-green-700 shadow">
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                />
                <AvatarFallback className="dark:bg-gray-700 dark:text-gray-200">
                  U
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Textarea
                  placeholder="Chia sẻ trải nghiệm làm việc của bạn..."
                  className="resize-none min-h-[100px] rounded-lg border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                />
                <div className="flex justify-end">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow transition dark:bg-green-700 dark:hover:bg-green-800">
                    <MessageCircleMore className="h-4 w-4 mr-2" />
                    Gửi đánh giá
                  </Button>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-8">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex gap-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 shadow-sm"
                >
                  <Avatar className="h-12 w-12 border-2 border-green-400 dark:border-green-700 shadow">
                    <AvatarImage
                      src={comment.user.avatar || "/placeholder.svg"}
                      alt={comment.user.name}
                    />
                    <AvatarFallback className="dark:bg-gray-700 dark:text-gray-200">
                      {comment.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-green-700 dark:text-green-200">
                        {comment.user.name}
                      </span>
                      <span className="text-xs text-muted-foreground dark:text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function JobDetailPage(props: PageProps) {
  const { slug } = await props.params;

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50 dark:from-gray-900 dark:via-blue-950 dark:to-green-950 text-gray-900 dark:text-white">
      <JobHeader />
      <JobContent />
      <CommentSection />
    </main>
  );
}
