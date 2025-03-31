import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

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
  return <AnimatedTestimonials testimonials={testimonials} autoplay />;
}
