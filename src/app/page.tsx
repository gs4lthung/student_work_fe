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
import HowToUseLoader from "@/components/ui/how-to-use-loader";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { ColourfulText } from "@/components/ui/text-colorful";
import { TypographyH2 } from "@/components/ui/typography";
import { Building, Building2, File, Search, Settings, Sparkles, X } from "lucide-react";
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
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SpecialJobCard specialJob={specialJob} />
      <div className="flex flerx-row justify-between items-center gap-4 w-full">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
            Tìm kiếm công việc Part-time tốt nhất
          </h1>
          <p className="text-gray-500 w-1/2">
            Chúng tôi giúp bạn tìm kiếm các công việc part-time linh hoạt nhất,
            phù hợp với thời gian của bạn
          </p>
          <div className="flex gap-4">
            <HowToUseLoader />
            <Button variant="default">Tìm việc ngay</Button>
          </div>
        </div>
        <Image
          src={
            "https://www.glassdoor.com/job-search-next/assets/birdwatcher.png"
          }
          alt="Hero"
          width={250}
          height={250}
          className="bg-white rounded-full shadow-md hover:scale-105 transition-transform"
        />
      </div>
      <CompanySection />
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

const CompanySection = () => {
  return (
    <>
    <TypographyH2 className="mb-0">
      Đối tác hàng đầu của chúng tôi
    </TypographyH2>
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
        <Button
          variant="ghost"
        >
          <Building/>
          <span className="">Công ty</span>
        </Button>
        <OrbitingCircles iconSize={50}>
          <Image
            src={
              "https://yte.viettel.vn/upload/1000337/20210118/Viettel-without_slogan-01_34bf1bf614.png"
            }
            alt="Hero"
            width={100}
            height={100}
          />
          <Image
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFucOpvd5nwV7mb0TQV8rrg7hPURAw5UT2w&s"
            }
            alt="Hero"
            width={100}
            height={100}
          />
          <Image
            src={
              "https://cmctelecom.vn/wp-content/uploads/2020/08/Samsung-SDS.png"
            }
            alt="Hero"
            width={100}
            height={100}
          />
          <Image
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdR3PmH7BJtGjT1iTxa0JjMlKS59Twv5HGtg&s"
            }
            alt="Hero"
            width={100}
            height={100}
          />
        </OrbitingCircles>
        <OrbitingCircles iconSize={50} radius={100} reverse>
          <Image
            src={
              "https://cdn.nhanlucnganhluat.vn/uploads/images/6AF28656/logo/2019-02/logo.png"
            }
            alt="Hero"
            width={100}
            height={100}
          />
          <Image
            src={
              "https://assets.bosch.com/media/global/bosch_group/our_figures/brands/bosch-brand-bosch_res_1280x720.webp"
            }
            alt="Hero"
            width={100}
            height={100}
          />
          <Image
            src={
              "https://fptsoftware.com/-/media/project/fpt-software/fso/uplift/logo-fpt.png?modified=20241017090751/"
            }
            alt="Hero"
            width={100}
            height={100}
          />
          <Image
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7xt3CY3aHe7rUImjMZMOR7iYCir2HRBA_qu9OeYRMSfqfu0h1IU6MrDESoG9LzxzNcBs&usqp=CAU"
            }
            alt="Hero"
            width={100}
            height={100}
          />
        </OrbitingCircles>
      </div>
    </>
  );
};
