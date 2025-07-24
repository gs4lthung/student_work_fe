// import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { InfiniteMovingCards } from "@/components/ui/cards-infinite-moving";

import HowToUseLoader from "@/components/ui/how-to-use-loader";
import { Input } from "@/components/ui/input";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
// import { ColourfulText } from "@/components/ui/text-colorful";
import { TypographyH2 } from "@/components/ui/typography";
import {
  Briefcase,
  Building,
  CheckCircle2,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  // X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// const specialJob = {
//   title: "Senior Software Engineer",
//   url: "/special-job",
//   company: "Meta",
//   companyLogo:
//     "https://i0.wp.com/siliconvalleyjournals.com/wp-content/uploads/2023/02/meta_PNG12.png?fit=4000%2C4000&ssl=1",
//   companyUrl: "https://www.facebook.com/careers/jobs/1234567890",
//   location: "Hà Nội, Vietnam",
//   salary: "30-50 triệu VNĐ/tháng",
//   experience: "3+ năm",
// };

// type SpecialJob = {
//   title: string;
//   url: string;
//   company: string;
//   companyLogo: string;
//   companyUrl: string;
//   location: string;
//   salary: string;
//   experience: string;
// };

// const SpecialJobCard = ({ specialJob }: { specialJob: SpecialJob }) => {
//   return (
//     <div className="fixed bottom-4 right-4 z-100 hidden lg:block">
//       <BackgroundGradient className="rounded-[22px] w-[400px] lg:w-[400px] md:w-[350px] max-w-sm bg-white dark:bg-zinc-900">
//         <Card
//           className="bg-transparent border-none"
//           style={{
//             animation: "slideUpFadeIn 0.5s ease-out",
//           }}
//         >
//           <CardHeader>
//             <CardTitle className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Sparkles
//                   className="animate-pulse"
//                   fill="yellow"
//                   stroke="none"
//                 />
//                 <span className="font-medium">
//                   Đừng bỏ lỡ cơ hội việc làm đặc biệt
//                 </span>
//               </div>
//               <Button variant="ghost" size="icon" className="rounded-full">
//                 <X size={16} />
//               </Button>
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="flex gap-4 items-center">
//             <div className="flex-shrink-0">
//               <Image
//                 src={specialJob.companyLogo || "/placeholder.svg"}
//                 alt="Company Logo"
//                 width={70}
//                 height={70}
//                 className="rounded-xl bg-white shadow-md hover:scale-105 transition-transform"
//               />
//             </div>
//             <div className="flex flex-col">
//               <TypographyH2 className="text-lg font-semibold">
//                 {specialJob.title}
//               </TypographyH2>
//               <p className="text-sm text-gray-600 dark:text-gray-300">
//                 {specialJob.company}
//               </p>
//               <div className="text-xl">
//                 <ColourfulText text={specialJob.salary} />
//               </div>
//               <div className="flex gap-2 mt-2 flex-wrap">
//                 <Badge variant="secondary">{specialJob.experience}</Badge>
//                 <Badge variant="secondary">{specialJob.location}</Badge>
//               </div>
//             </div>
//           </CardContent>

//           <CardFooter className="flex justify-between items-center px-4 pb-4">
//             <Button variant={"default"}>Ứng tuyển ngay</Button>
//             <Button variant="ghost" className=" hover:underline">
//               Xem chi tiết
//             </Button>
//           </CardFooter>
//         </Card>
//       </BackgroundGradient>
//     </div>
//   );
// };

// const feedbacks = [
//   {
//     quote:
//       "Tôi đã tìm được công việc mơ ước của mình nhờ vào trang web này. Cảm ơn các bạn rất nhiều!",
//     name: "Nguyễn Văn A",
//     title: "Senior Software Engineer",
//   },
//   {
//     quote:
//       "Trang web này đã giúp tôi tìm được công việc phù hợp với mình. Tôi rất hài lòng với dịch vụ của các bạn.",
//     name: "Nguyễn Văn B",
//     title: "Junior Software Engineer",
//   },
//   {
//     quote: "Cảm ơn các bạn đã giúp tôi tìm được công việc mơ ước của mình.",
//     name: "Nguyễn Văn C",
//     title: "Product Manager",
//   },
// ];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen w-full p-4 sm:p-8 pb-20 gap-12 sm:gap-16 lg:gap-24 lg:p-20">
      {/* <CheckRoles />
      <CheckWallet /> */}
      {/* <SpecialJobCard specialJob={specialJob} /> */}
      <HeroSection />
      <HowItWorkSection />
      <ForCustomerSection />
      <StatisticsSection />
      <CompanySection />
      {/* <ReviewSection /> */}
      <RegisterSection />
    </div>
  );
}

const HeroSection = () => {
  return (
    <section className="flex flex-col lg:flex-row justify-between items-center gap-8 w-full">
      <div className="flex flex-col items-start gap-4 w-full lg:w-auto">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter lg:text-4xl xl:text-5xl/none">
          Nền tảng tìm kiếm công việc cho sinh viên
        </h1>
        <p className="text-gray-500 w-full lg:w-1/2">
          Chúng tôi giúp bạn tìm kiếm các công việc part-time linh hoạt nhất,
          phù hợp với thời gian của bạn
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <HowToUseLoader />
          <Input
            type="text"
            className="w-full sm:w-[300px]"
            placeholder="Nhập từ khóa tìm kiếm"
          />
          <Link href={"/job"}>
            <Button variant="default" className="w-full sm:w-auto">
              <Search />
            </Button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <p className="text-gray-500 dark:text-gray-400">Phổ biến: </p>
          {["Lập trình viên", "Thiết kế", "Marketing"].map((item, index) => (
            <Badge key={index} variant="secondary">
              {item}
            </Badge>
          ))}
        </div>
      </div>
      {/* <div className="max-w-[400px] w-full h-[300px] sm:h-[400px] lg:h-[500px] relative">
        <Banner />
      </div> */}
      <Image
        src={"https://cdn-blog.novoresume.com/articles/job-hunt/bg.png"}
        alt="Hero"
        width={600}
        height={300}
        className="object-cover rounded-2xl shadow-lg"
      />
    </section>
  );
};

const HowItWorkSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
              Cách chúng tôi giúp bạn tìm việc làm
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl dark:text-gray-300">
              Cung cấp cho bạn một nền tảng tìm kiếm việc làm đơn giản và hiệu
              quả, giúp bạn tìm được công việc phù hợp với mình trong thời gian
              ngắn nhất.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            {
              title: "Tạo hồ sơ của bạn",
              description:
                "Tạo hồ sơ cá nhân của bạn với thông tin chi tiết về kỹ năng và kinh nghiệm.",
              icon: (
                <Users className="h-12 w-12 text-green-500 dark:text-green-400" />
              ),
              step: "1",
            },
            {
              title: "Tìm kiếm việc làm",
              description:
                "Tìm kiếm việc làm phù hợp với bạn bằng cách sử dụng các bộ lọc thông minh.",
              icon: (
                <Search className="h-12 w-12 text-green-500 dark:text-green-400" />
              ),
              step: "2",
            },
            {
              title: "Ứng tuyển dễ dàng",
              description:
                "Ứng tuyển vào các công việc mà bạn quan tâm chỉ với một cú nhấp chuột.",
              icon: (
                <Briefcase className="h-12 w-12 text-green-500 dark:text-green-400" />
              ),
              step: "3",
            },
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex flex-col items-center">
                {/* Step number badge */}
                <div className="w-8 h-8 mb-3 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
                {/* Icon circle */}
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-800 mb-4">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">
                {step.title}
              </h3>
              <p className="text-muted-foreground dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RegisterSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-500 dark:bg-green-800 text-gray-900 dark:text-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Tìm kiếm việc làm bán thời gian dễ dàng hơn bao giờ hết
              </h2>
              <p className="max-w-[600px] md:text-xl dark:text-green-100">
                Chúng tôi cung cấp cho bạn một nền tảng tìm kiếm việc làm đơn
                giản và hiệu quả, giúp bạn tìm được công việc phù hợp với mình
                trong thời gian ngắn nhất.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button variant={"default"}>Đăng ký tài khoản miễn phí</Button>
            </div>
          </div>
          <div className="space-y-4 bg-white/10 dark:bg-green-700/50 rounded-lg p-6">
            <h3 className="text-xl font-bold">
              Tham gia bản tin của chúng tôi
            </h3>
            <p>
              Nhận thông tin mới nhất về việc làm, mẹo phỏng vấn và nhiều hơn
              nữa!
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input type="email" placeholder="Nhập email của bạn" />
              <Button variant={"default"}>Đăng ký</Button>
            </div>
            <p className="text-xs dark:text-green-200">
              Bằng cách nhấp vào nút Đăng ký, bạn đồng ý với các điều khoản dịch
              vụ và chính sách bảo mật của chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CompanySection = () => {
  return (
    <section className="flex flex-col items-center justify-center px-4">
      <TypographyH2 className="text-center mb-8">
        Đối tác hàng đầu của chúng tôi
      </TypographyH2>
      <div className="-z-1 relative flex h-[300px] sm:h-[400px] lg:h-[500px] w-full flex-col items-center justify-center overflow-hidden">
        <OrbitingCircles iconSize={50} radius={100}>
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
        <OrbitingCircles iconSize={50} radius={200} reverse>
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
          <Image
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTGu5ZKgiCLFkKadPTR6K_s4EtES8anmJPMQ&s"
            }
            alt="Hero"
            width={100}
            height={100}
          />
          <Image
            src={
              "https://cdn.tgdd.vn/GameApp/3/224114/Screentshots/bkav-mobile-security-diet-virus-phan-mem-bao-ve-smartphone-224114-logo-07-06-2020.png"
            }
            alt="Hero"
            width={100}
            height={100}
          />
        </OrbitingCircles>
      </div>
      <Button variant={"outline"}>
        <Building />
        Xem tất cả đối tác
      </Button>
    </section>
  );
};

// const ReviewSection = () => {
//   return (
//     <section className="flex flex-col items-center justify-center gap-4">
//       <TypographyH2>
//         Chúng tôi đã giúp hàng ngàn người tìm được việc làm mơ ước
//       </TypographyH2>
//       <InfiniteMovingCards
//         className="-z-10"
//         items={feedbacks}
//         direction="right"
//         speed="slow"
//       />
//     </section>
//   );
// };

const ForCustomerSection = () => {
  return (
    <section className="flex flex-col lg:flex-row justify-around gap-8 w-full">
      <div className="flex flex-col items-start gap-4 w-full lg:w-1/2">
        <TypographyH2>Dành cho ứng viên tìm việc</TypographyH2>
        {[
          "Tiếp cận hàng ngàn cơ hội bán thời gian linh hoạt",
          "Đề xuất công việc được cá nhân hóa dựa trên hồ sơ của bạn",
          "Quy trình ứng dụng dễ dàng với một cú nhấp chuột áp dụng",
          "Thông báo việc làm cho các vị trí mới phù hợp với tiêu chí của bạn",
          "Các nguồn lực để giúp bạn thành công trong việc tìm kiếm việc làm",
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-2 text-gray-500 dark:text-gray-300"
          >
            <Sparkles className="h-4 w-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm sm:text-base">{item}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-start gap-4 w-full lg:w-1/2">
        <TypographyH2>Dành cho nhà tuyển dụng</TypographyH2>
        {[
          "Tiếp cận với một lượng lớn các ứng viên bán thời gian đủ điều kiện",
          "Bảng điều khiển dễ sử dụng để quản lý các bài đăng công việc và ứng dụng",
          "Quảng cáo việc làm có mục tiêu để tiếp cận đúng ứng viên",
          "Công cụ sàng lọc để xác định các kết quả phù hợp nhất",
          "Hỗ trợ tận tình để giúp bạn tìm thấy sự phù hợp hoàn hảo",
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-2 text-gray-500 dark:text-gray-300"
          >
            <Sparkles className="h-4 w-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm sm:text-base">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const StatisticsSection = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-green-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            {
              icon: <Briefcase className="h-8 w-8 mx-auto text-primary" />,
              value: "10,000+",
              label: "Công việc",
            },
            {
              icon: <Users className="h-8 w-8 mx-auto text-primary" />,
              value: "50,000+",
              label: "Ứng viên",
            },
            {
              icon: <TrendingUp className="h-8 w-8 mx-auto text-primary" />,
              value: "5,000+",
              label: "Nhà tuyển dụng",
            },
            {
              icon: <CheckCircle2 className="h-8 w-8 mx-auto text-primary" />,
              value: "25,000+",
              label: "Đơn ứng tuyển",
            },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              {stat.icon}
              <h3 className="mt-4 text-3xl font-bold">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
