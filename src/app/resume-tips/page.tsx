import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  FileText,
  Users,
  TrendingUp,
  Star,
  Download,
  Eye,
  Edit,
} from "lucide-react";

export default function ResumeTips() {
  const tips = [
    {
      category: "Format & Design",
      icon: <FileText className="h-5 w-5" />,
      tips: [
        "Keep it to 1-2 pages maximum",
        "Use a clean, professional font (Arial, Calibri, or Times New Roman)",
        "Maintain consistent formatting throughout",
        "Use bullet points for easy scanning",
        "Include plenty of white space",
      ],
    },
    {
      category: "Content Strategy",
      icon: <Edit className="h-5 w-5" />,
      tips: [
        "Tailor your resume for each job application",
        "Use action verbs to start bullet points",
        "Quantify achievements with numbers and percentages",
        "Focus on accomplishments, not just responsibilities",
        "Include relevant keywords from the job posting",
      ],
    },
    {
      category: "Professional Impact",
      icon: <TrendingUp className="h-5 w-5" />,
      tips: [
        "Start with a compelling professional summary",
        "Highlight your most relevant experience first",
        "Show career progression and growth",
        "Include relevant certifications and skills",
        "Proofread multiple times for errors",
      ],
    },
  ];

  const sections = [
    { name: "Contact Information", required: true },
    { name: "Professional Summary", required: true },
    { name: "Work Experience", required: true },
    { name: "Education", required: true },
    { name: "Skills", required: true },
    { name: "Certifications", required: false },
    { name: "Projects", required: false },
    { name: "Volunteer Work", required: false },
  ];

  return (
    <div className="min-h-screen">
      <header className=" shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  Mẹo viết CV chuyên nghiệp
                </h1>
                <p className="text-gray-500">
                  Xây dựng một bản lý lịch ấn tượng được chú ý
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold  mb-4">
            Tạo một bản lý lịch giúp bạn được tuyển dụng
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            Thực hiện theo các mẹo chuyên gia và phương pháp hay nhất của chúng
            tôi để tạo ra một bản sơ yếu lý lịch chuyên nghiệp, nổi bật với các
            nhà tuyển dụng và quản lý tuyển dụng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 ">
          <Card className="text-center dark:bg-zinc-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold ">6 giây</div>
              <p className="text-blue-600">
                Thời gian trung bình mà người tuyển dụng dành để xem xét một bản
                sơ yếu lý lịch
              </p>
            </CardContent>
          </Card>
          <Card className="text-center dark:bg-zinc-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold">75%</div>
              <p className="text-green-600">
                Của sơ yếu lý lịch được lọc ra bởi hệ thống ATS
              </p>
            </CardContent>
          </Card>
          <Card className="text-center dark:bg-zinc-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold">3x</div>
              <p className="text-yellow-600">
                Có nhiều khả năng nhận được cuộc phỏng vấn hơn với sơ yếu lý
                lịch được tối ưu hóa
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Mẹo viết sơ yếu lý lịch cần thiết
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tips.map((category, index) => (
              <Card key={index} className="h-full ">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-500 p-2 rounded-lg text-white">
                      {category.icon}
                    </div>
                    <CardTitle className="text-xl">
                      {category.category}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-500">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Các phần thiết yếu của CV
          </h3>
          <Card>
            <CardHeader>
              <CardTitle>Những gì cần đưa vào sơ yếu lý lịch của bạn</CardTitle>
              <CardDescription>
                Sau đây là các phần chính mà mọi sơ yếu lý lịch nên có, cùng với
                các phần tùy chọn cần cân nhắc
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg dark:bg-zinc-800"
                  >
                    <span className="font-medium">
                      {section.name}
                    </span>
                    <Badge variant={section.required ? "default" : "secondary"}>
                      {section.required ? "Bắt buộc" : "Không bắt buộc"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Những từ ngữ mạnh mẽ cho sơ yếu lý lịch của bạn
          </h3>
          <Card>
            <CardHeader>
              <CardTitle>Động từ hành động tạo ra tác động</CardTitle>
              <CardDescription>
                Sử dụng những từ hành động mạnh mẽ này để bắt đầu các điểm chính
                và làm nổi bật những thành tích của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  "Đã đạt được",
                  "Đã phân tích",
                  "Đã xây dựng",
                  "Đã tạo",
                  "Đã phát triển",
                  "Đã nâng cao",
                  "Đã thực hiện",
                  "Đã tạo",
                  "Đã triển khai",
                  "Đã cải thiện",
                  "Đã tăng",
                  "Đã lãnh đạo",
                  "Đã quản lý",
                  "Đã tối ưu hóa",
                  "Đã tổ chức",
                  "Đã giảm",
                  "Đã giải quyết",
                  "Đã tinh giản",
                ].map((word, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="justify-center py-2"
                  >
                    {word}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Những lỗi thường gặp khi viết CV cần tránh
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                mistake: "Sử dụng địa chỉ email không chuyên nghiệp",
                solution: "Tạo email chuyên nghiệp với tên của bạn",
              },
              {
                mistake: "Bao gồm kinh nghiệm làm việc không liên quan",
                solution:
                  "Tập trung vào kinh nghiệm có liên quan cho vai trò mục tiêu",
              },
              {
                mistake: "Sử dụng ngôn ngữ thụ động",
                solution: "Bắt đầu các điểm chính bằng động từ hành động mạnh",
              },
              {
                mistake: "Không định lượng thành tích",
                solution: "Bao gồm số, phần trăm và kết quả cụ thể",
              },
              {
                mistake: "Có lỗi đánh máy và lỗi ngữ pháp",
                solution: "Đọc kỹ và sử dụng công cụ kiểm tra chính tả",
              },
              {
                mistake: "Sử dụng định dạng lỗi thời",
                solution:
                  "Giữ cho thiết kế sạch sẽ, hiện đại và thân thiện với ATSGiữ cho thiết kế sạch sẽ, hiện đại và thân thiện với ATS",
              },
            ].map((item, index) => (
              <Card key={index} className="border-l-4 border-l-gray-950 dark:border-l-gray-500">
                <CardContent className="pt-6">
                  <div className="mb-3">
                    <h4 className="font-semibold text-red-800 mb-2">
                      ❌ Sai lầm:
                    </h4>
                    <p className="text-gray-500">{item.mistake}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">
                      ✅ Giải pháp:
                    </h4>
                    <p className="text-gray-500">{item.solution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center bg-gray-800 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Bạn đã sẵn sàng xây dựng bản sơ yếu lý lịch hoàn hảo chưa?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Tải xuống mẫu sơ yếu lý lịch miễn phí của chúng tôi và bắt đầu tạo
            một sơ yếu lý lịch mang lại kết quả.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Download className="h-5 w-5 mr-2" />
              Tải Mẫu CV Miễn Phí
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-blue-600 border-white hover:bg-white"
            >
              Tùy chỉnh CV Của Bạn
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-700 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Mẹo viết CV chuyên nghiệp</h3>
            </div>
            <p className="text-gray-200 mb-6">
              Giúp người tìm việc tạo ra sơ yếu lý lịch chuyên nghiệp được chú
              ý.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white">
                Chính sách bảo mật
              </a>
              <a href="#" className="hover:text-white">
                Điều khoản dịch vụ
              </a>
              <a href="#" className="hover:text-white">
                Liên hệ với chúng tôi
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
