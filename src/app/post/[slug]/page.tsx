/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TypographyH2 } from "@/components/ui/typography";
import { History, MapPin, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import React from "react";

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
    "https://www.training.com.au/wp-content/uploads/Full-Stack-Developer-1.jpeg",
  companyName: "FPT Software",
  companyLogo:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjNrth9D12U-w1YDVelzT5eSzetDjf_zGJ4Q&s",
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
      avatar: "/placeholder-user.jpg",
    },
    content:
      "Công việc rất thú vị, môi trường làm việc thân thiện và chuyên nghiệp.",
    createdAt: "2023-10-01",
  },
  {
    id: 2,
    user: {
      name: "Nguyen Van B",
      avatar: "/placeholder-user.jpg",
    },
    content:
      "Mình đã làm việc ở đây được 2 năm, rất hài lòng với công việc và đồng nghiệp.",
    createdAt: "2023-10-02",
  },
  {
    id: 3,
    user: {
      name: "Nguyen Van C",
      avatar: "/placeholder-user.jpg",
    },
    content: "Công ty có nhiều cơ hội phát triển nghề nghiệp và học hỏi.",
    createdAt: "2023-10-03",
  },
  {
    id: 4,
    user: {
      name: "Nguyen Van D",
      avatar: "/placeholder-user.jpg",
    },
    content:
      "Mình rất thích văn hóa làm việc ở đây, mọi người rất thân thiện và hỗ trợ nhau.",
    createdAt: "2023-10-04",
  },
];

const FirstSection = () => {
  return (
    <div className="grid grid-cols-8 gap-8 p-12">
      <div className="col-span-6 flex flex-col gap-2">
        <Image
          src={job.companyLogo}
          alt="Company Logo"
          width={150}
          height={150}
        />
        <h1 className="text-lg">{job.companyName}</h1>
        <TypographyH2 className="text-gray-600 text-6xl border-0">
          {job.title}
        </TypographyH2>
        <div className="flex gap-2 items-center">
          <History color="gray" />
          <p className="text-gray-500 text-sm">{job.timeLeft}</p>
          <p className="text-gray-500 text-sm"> </p>
          <MapPin color="gray" />
          <p className="text-gray-500 text-sm">{job.companyAddress}</p>
        </div>
      </div>
      <div className="col-span-2 m-auto">
        <Button className="w-[1/3]" variant="default">
          Nộp đơn ngay
        </Button>
      </div>
    </div>
  );
};

const SecondSection = () => {
  return (
    <div className="grid grid-cols-10 gap-8 p-12">
      <div className="col-span-7 flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-600">
          Thông tin công việc
        </h1>
        <p>{job.description}</p>
        <h1 className="text-3xl font-bold mb-4 text-gray-600">
          Chi tiết công việc
        </h1>
        <ul className="list-disc list-inside">
          {job.duties.map((duty, index) => (
            <li key={index} className="text-md mb-2">
              {duty}
            </li>
          ))}
        </ul>
        <h1 className="text-3xl font-bold mb-4 text-gray-600">Yêu cầu</h1>
        <ul className="list-disc list-inside">
          {job.requirements.map((requirement, index) => (
            <li key={index} className="text-md mb-2">
              {requirement}
            </li>
          ))}
        </ul>
        <Image src={job.image} alt="Job Image" width={1000} height={100} />
        <h1 className="text-3xl font-bold mb-4 text-gray-600">Mô tả công ty</h1>
        <p>{job.companyDescription}</p>
      </div>
      <div className="col-span-3 flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-600 text-center">
          Tổng quan
        </h1>
        <div className="flex flex-col gap-4 justify-between">
          <div className="flex justify-between items-center">
            <p className="font-bold text-gray-600">Lương:</p>
            <p className="text-gray-600">{job.salary}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-gray-600">Kinh nghiệm:</p>
            <p className="text-gray-600">{job.experienceRequired}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-gray-600">Thời gian làm việc:</p>
            <p className="text-gray-600">{job.type}</p>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501715.50184849347!2d106.3548500664715!3d10.761253013396889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eefdb25d923%3A0x4bcf54ddca2b7214!2zSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1743174282799!5m2!1svi!2s"
          width="100%"
          height="450"
          className="border-0"
          loading="lazy"
        ></iframe>
        <h1 className="text-3xl font-bold mb-4 text-gray-600 text-center">
          Về chúng tôi
        </h1>
        <div className="flex flex-col gap-4 justify-between">
          <div className="flex justify-between items-center">
            <p className="font-bold text-gray-600">Website:</p>
            <p className="text-gray-600">{job.companyWebsite}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-gray-600">Email:</p>
            <p className="text-gray-600">{job.companyEmail}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-gray-600">SDT:</p>
            <p className="text-gray-600">{job.companyPhone}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-gray-600">Thành lập:</p>
            <p className="text-gray-600">{job.companyEstablished}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-gray-600">Số lượng nhân viên:</p>
            <p className="text-gray-600">{job.companySize}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentSection = () => {
  return (
    <div className="mx-auto space-y-8 py-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Đánh giá</h2>
        <div className="grid gap-2">
          <Textarea
            placeholder="Viết đánh giá..."
            className="resize-none rounded-md border border-input bg-background p-3 text-sm shadow-sm"
          />
          <Button className="w-[100px] ml-auto" variant="default">
            <MessageCircleMore />
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-4">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={comment.user.avatar} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-1.5">
              <div className="flex items-center gap-2">
                <div className="font-medium">{comment.user.name}</div>
                <div className="text-xs text-muted-foreground">
                  {comment.createdAt}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {comment.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function JobDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // You can use `slug` to fetch data here or in generateStaticParams
  return (
    <>
      <FirstSection />
      <SecondSection />
    </>
  );
}
