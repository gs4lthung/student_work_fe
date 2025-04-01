import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InfiniteMovingCards } from "@/components/ui/cards-infinite-moving";
import { ColourfulText } from "@/components/ui/text-colorful";
import { TypographyH2 } from "@/components/ui/typography";
import { Sparkles, X } from "lucide-react";
import Image from "next/image";

const specialJob = {
  title: "Senior Software Engineer",
  url: "/special-job",
  company: "Meta",
  companyLogo:
    "https://i0.wp.com/siliconvalleyjournals.com/wp-content/uploads/2023/02/meta_PNG12.png?fit=4000%2C4000&ssl=1",
  companyUrl: "https://www.facebook.com/careers/jobs/1234567890",
  location: "Hà Nội, Vietnam",
  salary: "30-50 triệu VNĐ/tháng",
  experience: "3+ năm",
};

const SpecialJobCard = ({ specialJob }) => {
  return (
    <div className="fixed bottom-4 right-4">
      <BackgroundGradient className="rounded-[22px] w-[400px] max-w-sm bg-white dark:bg-zinc-900">
        <Card
          className="bg-transparent border-none"
          style={{
            animation: "slideUpFadeIn 0.5s ease-out",
          }}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles
                  className="animate-pulse"
                  fill="yellow"
                  stroke="none"
                />
                <span className="font-medium">
                  Đừng bỏ lỡ cơ hội việc làm đặc biệt
                </span>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X size={16} />
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex gap-4 items-center">
            <div className="flex-shrink-0">
              <Image
                src={specialJob.companyLogo}
                alt="Company Logo"
                width={70}
                height={70}
                className="rounded-xl bg-white shadow-md hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <TypographyH2 className="text-lg font-semibold">
                {specialJob.title}
              </TypographyH2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {specialJob.company}
              </p>
              <div className="text-xl">
                <ColourfulText text={specialJob.salary} />
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge variant="secondary">{specialJob.experience}</Badge>
                <Badge variant="secondary">{specialJob.location}</Badge>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between items-center px-4 pb-4">
            <Button
              variant={"default"}
              className="bg-green-500 dark:bg-green-300"
            >
              Ứng tuyển ngay
            </Button>
            <Button variant="ghost" className=" hover:underline">
              Xem chi tiết
            </Button>
          </CardFooter>
        </Card>
      </BackgroundGradient>
    </div>
  );
};

const feedbacks = [
  {
    quote:
      "Tôi đã tìm được công việc mơ ước của mình nhờ vào trang web này. Cảm ơn các bạn rất nhiều!",
    name: "Nguyễn Văn A",
    title: "Senior Software Engineer",
  },
  {
    quote:
      "Trang web này đã giúp tôi tìm được công việc phù hợp với mình. Tôi rất hài lòng với dịch vụ của các bạn.",
    name: "Nguyễn Văn B",
    title: "Junior Software Engineer",
  },
  {
    quote: "Cảm ơn các bạn đã giúp tôi tìm được công việc mơ ước của mình.",
    name: "Nguyễn Văn C",
    title: "Product Manager",
  },
];

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SpecialJobCard specialJob={specialJob} />
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <div className="flex flex-col items-center justify-center gap-4">
        <TypographyH2>
          Chúng tôi đã giúp hàng ngàn người tìm được việc làm mơ ước
        </TypographyH2>
        <InfiniteMovingCards
          className="-z-10"
          items={feedbacks}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  );
}
