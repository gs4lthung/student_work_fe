import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Users, Award, Heart, Star, Phone } from "lucide-react";

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

const teamMembers = [
  {
    name: "Lâm Tiên Hưng",
    role: "Founder & CEO",
    image: "/images/about-us/lthung.png",
  },
  {
    name: "Bùi Đức Triệu",
    role: "Founder & COO",
    image: "/images/about-us/bdtrieu.png",
  },
  {
    name: "Nguyễn Thị Trà Mi",
    role: "Founder & CFO",
    image: "/images/about-us/nttmi.png",
  },
  {
    name: "Chu Sỹ Tú",
    role: "Founder & CMO",
    image: "/images/about-us/cstu.png",
  },
  {
    name: "Nguyễn Thị Thu Hoài",
    role: "Founder & CEO",
    image: "/images/about-us/ntthoai.png",
  },
  {
    name: "Cao Văn Dũng",
    role: "Founder & CTO",
    image: "/images/about-us/cvdung.png",
  },
];

const values = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Khách hàng là trọng tâm",
    description:
      "Chúng tôi đặt nhu cầu của khách hàng lên hàng đầu trong mọi quyết định.",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Chất lượng vượt trội",
    description:
      "Chúng tôi cam kết mang đến những sản phẩm và dịch vụ chất lượng cao nhất.",
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "Đam mê sáng tạo",
    description: "Chúng tôi luôn tìm kiếm những giải pháp sáng tạo và đột phá.",
  },
  {
    icon: <Star className="h-8 w-8 text-primary" />,
    title: "Liên tục cải tiến",
    description:
      "Chúng tôi không ngừng học hỏi và cải tiến để trở nên tốt hơn mỗi ngày.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-400 dark:bg-green-200 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-green-400 dark:bg-green-200 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Về Chúng Tôi
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Chúng tôi là một nhóm những người đam mê công nghệ và thiết kế,
              với sứ mệnh tạo ra những sản phẩm và dịch vụ tốt nhất cho khách
              hàng. Chúng tôi tin rằng công nghệ có thể thay đổi cuộc sống của
              mọi người theo hướng tích cực, và chúng tôi muốn đóng góp vào điều
              đó.
            </p>
            <Button size="lg" className="rounded-full">
              Liên hệ với chúng tôi <Phone className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Giá trị cốt lõi</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Những giá trị định hướng mọi hoạt động của chúng tôi
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-400 dark:bg-green-800 mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Đội ngũ của chúng tôi</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Những con người tài năng và đam mê đằng sau thành công của chúng
              tôi
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Những đánh giá từ khách hàng đã sử dụng sản phẩm và dịch vụ của
            chúng tôi
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <AnimatedTestimonials testimonials={testimonials} autoplay />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-200 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Sẵn sàng hợp tác với chúng tôi?
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Hãy liên hệ ngay hôm nay để chúng tôi có thể giúp bạn đạt được mục
            tiêu kinh doanh của mình.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default">Tìm hiểu thêm</Button>
            <Button variant="outline">Liên hệ ngay</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
