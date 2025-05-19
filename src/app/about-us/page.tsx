import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { TypographyH1 } from "@/components/ui/typography";

const testimonials = [
  {
    quote:
      "This platform has transformed our workflow. The user experience is top-notch and the support team is always ready to help.",
    name: "Lâm Tiên Hưng",
    designation: "Founder & CEO at SWork",
    src: "/images/about-us/lthung.png",
  },
  {
    quote:
      "The integration capabilities are fantastic. We were able to connect all our tools seamlessly, which has saved us a lot of time.",
    name: "Bùi Đức Triệu",
    designation: "Founder & COO at SWork",
    src: "/images/about-us/bdtrieu.png",
  },
  {
    quote:
      "The analytics and reporting features are incredibly useful. We can now make data-driven decisions with ease.",
    name: "Nguyễn Thị Trà Mi",
    designation: "Founder & CFO at SWork",
    src: "/images/about-us/nttmi.png",
  },
  {
    quote:
      "The collaboration tools have made remote work so much easier for our team. We can communicate and share files effortlessly.",
    name: "Chu Sỹ Tú",
    designation: "Founder & CMO at SWork",
    src: "/images/about-us/cstu.png",
  },
  {
    quote:
      "The platform is very intuitive and easy to use. Our team was able to get started right away without any training.",
    name: "Nguyễn Thị Thu Hoài",
    designation: "Founder & CEO at SWork",
    src: "/images/about-us/ntthoai.png",
  },
  {
    quote:
      "The customer support is outstanding. They are always available to help us with any issues we encounter.",
    name: "Cao Văn Dũng",
    designation: "Founder & CTO at SWork",
    src: "/images/about-us/cvdung.png",
  },
];

export default function AboutUsPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <TypographyH1>Về chúng tôi</TypographyH1>
      <p className="text-gray-500 w-1/2 text-center dark:text-gray-400">
        Chúng tôi là một nhóm những người đam mê công nghệ và thiết kế, với sứ
        mệnh tạo ra những sản phẩm và dịch vụ tốt nhất cho khách hàng. Chúng tôi
        tin rằng công nghệ có thể thay đổi cuộc sống của mọi người theo hướng
        tích cực, và chúng tôi muốn đóng góp vào điều đó.
      </p>
      <AnimatedTestimonials testimonials={testimonials} autoplay />
    </div>
  );
}
