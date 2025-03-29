import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH2 } from "@/components/ui/typography";
import { Sparkle, X } from "lucide-react";
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
    <Card className="fixed bottom-4 right-4 w-[400px] shadow-lg bg-gradient-to-r from-[#86efac] to-[#bbf7d0]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkle fill="yellow" stroke="none" /> Đừng bỏ lỡ cơ hội việc làm
            đặc biệt
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-4xl bg-green-200 hover:bg-green-300"
          >
            <X size={16} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row gap-4 items-center">
        <Image
          src={specialJob.companyLogo}
          alt="Company Logo"
          width={70}
          height={70}
          className="bg-white shadow-md"
        />
        <div className="flex flex-col">
          <TypographyH2 className="text-md border-b-0 pb-0">
            {specialJob.title}
          </TypographyH2>
          <p className="text-sm text-gray-500">{specialJob.company}</p>
          <p className="text-lg text-green-500">{specialJob.salary}</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="default">{specialJob.experience}</Badge>
            <Badge variant="default">{specialJob.location}</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-around items-center">
        <Button variant="outline">Ứng tuyển ngay</Button>
        <Button variant="outline">Xem chi tiết</Button>
      </CardFooter>
    </Card>
  );
};
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SpecialJobCard specialJob={specialJob} />
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
      <p className="text-2xl text-center">sdsd</p>
    </div>
  );
}
