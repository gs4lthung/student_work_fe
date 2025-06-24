import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  TrendingUp,
  Users,
  DollarSign,
  BookOpen,
  Target,
  Award,
  Globe,
  Building,
  Heart,
  Calculator,
  GraduationCap,
  Megaphone,
  Wrench,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Search,
  FileText,
  MessageSquare,
  Lightbulb,
} from "lucide-react";

export default function CareerAdviceSite() {
  const industries = [
    {
      name: "Công nghệ",
      icon: <Globe className="h-6 w-6" />,
      growth: "+22%",
      avgSalary: "$95,000",
      topRoles: [
        "Kỹ sư phần mềm",
        "Nhà khoa học dữ liệu",
        "Quản lý dự án",
        "Nhà thiết kế UX",
      ],
      skills: ["Lập trình", "Phân tích dữ liệu", "Điện toán đám mây", "AI/ML"],
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Chăm sóc sức khỏe",
      icon: <Heart className="h-6 w-6" />,
      growth: "+16%",
      avgSalary: "$75,000",
      topRoles: [
        "Y tá hành nghề",
        "Chuyên gia vật lý trị liệu",
        "Trợ lý y khoa",
        "Quản trị viên chăm sóc sức khỏe",
      ],
      skills: [
        "Chăm sóc bệnh nhân",
        "Kiến thức y khoa",
        "Truyền thông",
        "Tuân thủ",
      ],
      color: "bg-red-100 text-red-700",
    },
    {
      name: "Tài chính",
      icon: <Calculator className="h-6 w-6" />,
      growth: "+8%",
      avgSalary: "$85,000",
      topRoles: [
        "Chuyên gia phân tích tài chính",
        "Ngân hàng đầu tư",
        "Kế toán",
        "Quản lý rủi ro",
      ],
      skills: ["Mô hình tài chính", "Đánh giá rủi ro", "Quy định", "Phân tích"],
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Giáo dục",
      icon: <GraduationCap className="h-6 w-6" />,
      growth: "+5%",
      avgSalary: "$55,000",
      topRoles: [
        "Giáo viên",
        "Hiệu trưởng",
        "Thiết kế chương trình học",
        "Công nghệ giáo dục",
      ],
      skills: [
        "Giảng dạy",
        "Phát triển chương trình học",
        "Đánh giá học sinh",
        "Công nghệ",
      ],
      color: "bg-purple-100 text-purple-700",
    },

    {
      name: "Tiếp thị",
      icon: <Megaphone className="h-6 w-6" />,
      growth: "+10%",
      avgSalary: "$65,000",
      topRoles: [
        "Chuyên viên tiếp thị số",
        "Quản lý thương hiệu",
        "Người sáng tạo nội dung",
        "Chuyên gia SEO",
      ],
      skills: [
        "Tiếp thị số",
        "Phân tích dữ liệu",
        "Sáng tạo nội dung",
        "Chiến lược thương hiệu",
      ],
      color: "bg-orange-100 text-orange-700",
    },

    {
      name: "Kỹ thuật",
      icon: <Wrench className="h-6 w-6" />,
      growth: "+7%",
      avgSalary: "$80,000",
      topRoles: [
        "Kỹ sư xây dựng",
        "Kỹ sư cơ khí",
        "Kỹ sư điện",
        "Quản lý dự án",
      ],
      skills: [
        "Thiết kế kỹ thuật",
        "Quản lý dự án",
        "Giải quyết vấn đề",
        "An toàn lao động",
      ],
      color: "bg-gray-100 text-gray-700",
    },
  ];

  const careerStages = [
    {
      stage: "Mới bắt đầu",
      years: "0–2 năm",
      focus: "Học hỏi & Xây dựng nền tảng",
      priorities: [
        "Phát triển kỹ năng",
        "Mở rộng mối quan hệ",
        "Hiệu suất làm việc",
        "Tìm kiếm người hướng dẫn",
      ],
      challenges: [
        "Hội chứng kẻ mạo danh",
        "Thiếu kỹ năng",
        "Thiếu kinh nghiệm",
        "Mức lương thấp",
      ],
      strategies: [
        "Tập trung vào việc học hỏi và tiếp thu kiến thức",
        "Chủ động xin phản hồi và cải thiện nhanh chóng",
        "Xây dựng mối quan hệ với đồng nghiệp",
        "Ghi lại những thành tích đạt được",
      ],
    },
    {
      stage: "Trung cấp",
      years: "3–7 năm",
      focus: "Chuyên môn hóa & Phát triển lãnh đạo",
      priorities: [
        "Xây dựng chuyên môn sâu",
        "Phát triển kỹ năng lãnh đạo",
        "Tư duy chiến lược",
        "Lập kế hoạch sự nghiệp",
      ],
      challenges: [
        "Chững lại trong sự nghiệp",
        "Cân bằng công việc và cuộc sống",
        "Tăng trách nhiệm",
        "Kỹ năng lỗi thời",
      ],
      strategies: [
        "Phát triển chuyên môn sâu trong lĩnh vực của bạn",
        "Tham gia vào các cơ hội lãnh đạo",
        "Xây dựng mối quan hệ đa phòng ban",
        "Cân nhắc chuyển ngang để phát triển thêm",
      ],
    },
    {
      stage: "Cao cấp",
      years: "8–15 năm",
      focus: "Lãnh đạo chiến lược & Hướng dẫn",
      priorities: [
        "Tầm nhìn chiến lược",
        "Phát triển đội ngũ",
        "Tác động trong ngành",
        "Tác phong lãnh đạo",
      ],
      challenges: [
        "Quản lý cấp trên & cấp dưới",
        "Ra quyết định phức tạp",
        "Biến động ngành nghề",
        "Lên kế hoạch kế nhiệm",
      ],
      strategies: [
        "Tập trung vào tác động chiến lược thay vì công việc chi tiết",
        "Hướng dẫn và phát triển người khác",
        "Xây dựng uy tín trong ngành",
        "Chuẩn bị cho vai trò lãnh đạo cấp cao",
      ],
    },
    {
      stage: "Cấp điều hành",
      years: "Trên 15 năm",
      focus: "Lãnh đạo tổ chức",
      priorities: [
        "Xác định tầm nhìn",
        "Xây dựng văn hóa doanh nghiệp",
        "Quản lý các bên liên quan",
        "Tạo dấu ấn sự nghiệp",
      ],
      challenges: [
        "Quan hệ với hội đồng quản trị",
        "Sự giám sát của công chúng",
        "Áp lực thị trường",
        "Kế nhiệm lãnh đạo",
      ],
      strategies: [
        "Xác định rõ tầm nhìn tổ chức",
        "Xây dựng đội ngũ lãnh đạo vững mạnh",
        "Duy trì quan hệ trong ngành",
        "Lập kế hoạch kế nhiệm và di sản để lại",
      ],
    },
  ];

  const universalSkills = [
    {
      category: "Giao tiếp",
      skills: [
        "Giao tiếp bằng văn bản",
        "Nói trước công chúng",
        "Lắng nghe chủ động",
        "Kỹ năng thuyết trình",
      ],
      importance: 95,
    },
    {
      category: "Lãnh đạo",
      skills: [
        "Quản lý nhóm",
        "Ra quyết định",
        "Giải quyết xung đột",
        "Trí tuệ cảm xúc",
      ],
      importance: 90,
    },
    {
      category: "Giải quyết vấn đề",
      skills: [
        "Tư duy phản biện",
        "Kỹ năng phân tích",
        "Tính sáng tạo",
        "Đổi mới sáng tạo",
      ],
      importance: 88,
    },
    {
      category: "Khả năng thích ứng",
      skills: [
        "Quản lý sự thay đổi",
        "Khả năng học hỏi nhanh",
        "Tính kiên cường",
        "Linh hoạt",
      ],
      importance: 85,
    },
    {
      category: "Kiến thức số",
      skills: [
        "Thành thạo công nghệ",
        "Phân tích dữ liệu",
        "Giao tiếp kỹ thuật số",
        "Tự động hóa",
      ],
      importance: 80,
    },
  ];

  const jobSearchStrategies = [
    {
      strategy: "Tìm kiếm qua mạng lưới quan hệ",
      effectiveness: "70%",
      description: "Tận dụng các mối quan hệ chuyên nghiệp và giới thiệu",
      tactics: [
        "Tham dự các sự kiện và hội nghị trong ngành",
        "Tương tác trên mạng xã hội chuyên nghiệp",
        "Liên hệ với mạng lưới cựu sinh viên",
        "Thực hiện các buổi phỏng vấn thông tin",
      ],
    },
    {
      strategy: "Nộp hồ sơ trực tiếp",
      effectiveness: "25%",
      description: "Nộp đơn trực tiếp qua website công ty và trang tuyển dụng",
      tactics: [
        "Tìm hiểu kỹ về công ty",
        "Tùy chỉnh hồ sơ cho từng vị trí",
        "Theo dõi trạng thái đơn ứng tuyển",
        "Sử dụng cảnh báo việc làm và thông báo tuyển dụng",
      ],
    },
    {
      strategy: "Hợp tác với nhà tuyển dụng",
      effectiveness: "40%",
      description: "Làm việc với công ty săn đầu người và nhà tuyển dụng",
      tactics: [
        "Xây dựng mối quan hệ với các nhà tuyển dụng trong ngành",
        "Cập nhật hồ sơ trên các nền tảng tuyển dụng",
        "Phản hồi chuyên nghiệp và kịp thời",
        "Đưa ra mục tiêu nghề nghiệp rõ ràng",
      ],
    },
    {
      strategy: "Xây dựng thương hiệu cá nhân",
      effectiveness: "60%",
      description: "Tạo sự hiện diện và thu hút cơ hội nghề nghiệp",
      tactics: [
        "Tạo nội dung thể hiện vai trò lãnh đạo tư duy",
        "Phát biểu tại các sự kiện ngành",
        "Duy trì hình ảnh chuyên nghiệp trực tuyến",
        "Trình bày rõ ràng chuyên môn và thành tích",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
          Trung tâm Hướng nghiệp Toàn diện
        </h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          Hướng dẫn toàn diện giúp bạn thành công trong sự nghiệp ở mọi lĩnh
          vực. Từ cấp độ mới bắt đầu đến lãnh đạo cấp cao, chúng tôi cung cấp
          những kiến thức và công cụ cần thiết để bạn phát triển sự nghiệp.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-600 to-teal-600"
          >
            Khám phá ngành nghề
          </Button>
          <Button size="lg" variant="outline">
            Đánh giá nghề nghiệp
          </Button>
        </div>
      </div>

      <Tabs defaultValue="industries" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="industries">Ngành nghề</TabsTrigger>
          <TabsTrigger value="stages">Giai đoạn sự nghiệp</TabsTrigger>
          <TabsTrigger value="skills">Kỹ năng chung</TabsTrigger>
          <TabsTrigger value="job-search">Tìm việc</TabsTrigger>
          <TabsTrigger value="salary">Lương & Phúc lợi</TabsTrigger>
          <TabsTrigger value="resources">Tài nguyên</TabsTrigger>
        </TabsList>

        <TabsContent value="industries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Tổng quan ngành nghề & Cơ hội
              </CardTitle>
              <CardDescription>
                Khám phá cơ hội nghề nghiệp trong các ngành lớn và hiểu xu hướng
                tăng trưởng
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <Card
                key={index}
                className="relative overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-2 ${
                    industry.color.split(" ")[0]
                  }`}
                />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${industry.color}`}>
                        {industry.icon}
                      </div>
                      <CardTitle className="text-lg">{industry.name}</CardTitle>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <TrendingUp className="h-3 w-3" />
                      {industry.growth} tăng trưởng
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <DollarSign className="h-3 w-3" />
                      {industry.avgSalary} avg
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Vai trò hàng đầu</h4>
                    <div className="space-y-1">
                      {industry.topRoles.map((role, roleIndex) => (
                        <div
                          key={roleIndex}
                          className="flex items-center gap-2 text-sm"
                        >
                          <ArrowRight className="h-3 w-3 text-blue-500" />
                          {role}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Các kĩ năng chính</h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Các giai đoạn phát triển sự nghiệp
              </CardTitle>
              <CardDescription>
                Định hướng hành trình sự nghiệp của bạn với chiến lược và hiểu
                biết theo từng giai đoạn
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-6">
            {careerStages.map((stage, index) => (
              <Card key={index} className="relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{stage.stage}</CardTitle>
                      <div className="flex gap-4 mt-2">
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Clock className="h-3 w-3" />
                          {stage.years}
                        </Badge>
                        <Badge variant="outline">{stage.focus}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-700">
                      Các ưu tiên chính
                    </h4>
                    <ul className="space-y-2">
                      {stage.priorities.map((priority, pIndex) => (
                        <li
                          key={pIndex}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {priority}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-orange-700">
                      Những thách thức chung
                    </h4>
                    <ul className="space-y-2">
                      {stage.challenges.map((challenge, cIndex) => (
                        <li
                          key={cIndex}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Target className="h-4 w-4 text-orange-500" />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-blue-700">
                      Chiến lược thành công
                    </h4>
                    <ul className="space-y-2">
                      {stage.strategies.map((strategy, sIndex) => (
                        <li
                          key={sIndex}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5" />
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Kỹ năng chuyên nghiệp thiết yếu
              </CardTitle>
              <CardDescription>
                Những kỹ năng cốt lõi giúp bạn thành công ở mọi ngành nghề và
                cấp bậc sự nghiệp
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-6">
            {universalSkills.map((skillGroup, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      {skillGroup.category}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Tầm quan trọng của ngành
                      </span>
                      <Badge variant="default">{skillGroup.importance}%</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {skillGroup.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="flex items-center gap-2 p-3 border rounded-lg"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Kế hoạch hành động phát triển kỹ năng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Đánh giá</h4>
                  <p className="text-sm text-muted-foreground">
                    Xác định trình độ kỹ năng hiện tại
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-950">Học hỏi</h4>
                  <p className="text-sm text-muted-foreground">
                    Phát triển các kỹ năng ưu tiên
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-950">Thực hành</h4>
                  <p className="text-sm text-muted-foreground">
                    Áp dụng kỹ năng trong tình huống thực tế
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-950">Công nhận</h4>
                  <p className="text-sm text-muted-foreground">
                    Nhận phản hồi và được ghi nhận
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="job-search" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Chiến lược tìm việc hiệu quả
              </CardTitle>
              <CardDescription>
                Tối ưu hóa quá trình tìm việc với các chiến lược và phương pháp
                đã được kiểm chứng
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {jobSearchStrategies.map((strategy, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      {strategy.strategy}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-green-700 dark:bg-green-100 dark:text-green-800"
                    >
                      {strategy.effectiveness} hiệu quả
                    </Badge>
                  </div>
                  <CardDescription>{strategy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3">Chiến thuật chính</h4>
                  <ul className="space-y-2">
                    {strategy.tactics.map((tactic, tIndex) => (
                      <li
                        key={tIndex}
                        className="flex items-start gap-2 text-sm"
                      >
                        <ArrowRight className="h-4 w-4 text-blue-500 mt-0.5" />
                        {tactic}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Tối ưu hóa CV & Hồ sơ ứng tuyển
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <span className="text-sm">
                    Tùy chỉnh CV cho từng đơn ứng tuyển và từng ngành nghề
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <span className="text-sm">
                    Sử dụng từ khóa và thuật ngữ chuyên ngành phù hợp
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <span className="text-sm">
                    Định lượng thành tích bằng các số liệu cụ thể
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <span className="text-sm">
                    Đưa vào các chứng chỉ và khóa đào tạo liên quan
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <span className="text-sm">
                    Tối ưu hóa hồ sơ cho hệ thống lọc hồ sơ tự động (ATS)
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chuẩn bị phỏng vấn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    Tìm hiểu về văn hóa, giá trị và tin tức gần đây của công ty
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    Chuẩn bị ví dụ theo phương pháp STAR cho câu hỏi hành vi
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    Luyện tập các câu hỏi kỹ thuật đặc thù theo ngành
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    Chuẩn bị câu hỏi hay về vị trí và đội nhóm
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    Gửi thư cảm ơn chuyên nghiệp sau buổi phỏng vấn
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="salary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Hướng dẫn lương & đàm phán
              </CardTitle>
              <CardDescription>
                Hiểu rõ mức lương thị trường và đàm phán hiệu quả trong nhiều
                ngành nghề
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mức lương theo ngành & cấp bậc</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Công nghệ (Cấp cao)</span>
                    <span className="text-green-600 font-semibold">
                      120.000$ – 180.000$
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Tài chính (Cấp cao)</span>
                    <span className="text-green-600 font-semibold">
                      110.000$ – 160.000$
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Y tế (Cấp cao)</span>
                    <span className="text-green-600 font-semibold">
                      90.000$ – 130.000$
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Marketing (Cấp cao)</span>
                    <span className="text-green-600 font-semibold">
                      80.000$ – 120.000$
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Giáo dục (Cấp cao)</span>
                    <span className="text-green-600 font-semibold">
                      65.000$ – 95.000$
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Các thành phần trong tổng thu nhập</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Thu nhập cơ bản</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Lương cơ bản</li>
                    <li>• Lương theo giờ</li>
                    <li>• Hoa hồng</li>
                    <li>• Lương làm thêm giờ</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Thu nhập biến động</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Thưởng hiệu suất</li>
                    <li>• Chia lợi nhuận</li>
                    <li>• Cổ phiếu/thưởng cổ phần (RSU)</li>
                    <li>• Thưởng khi nhận việc</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Phúc lợi</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Bảo hiểm y tế</li>
                    <li>• Kế hoạch hưu trí</li>
                    <li>• Nghỉ phép có lương</li>
                    <li>• Bảo hiểm nhân thọ</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Đãi ngộ & Linh hoạt</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Làm việc từ xa</li>
                    <li>• Lịch làm việc linh hoạt</li>
                    <li>• Phát triển chuyên môn</li>
                    <li>• Chương trình chăm sóc sức khỏe</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Tài nguyên phát triển nghề nghiệp
              </CardTitle>
              <CardDescription>
                Tài liệu chọn lọc giúp bạn học tập liên tục và phát triển sự
                nghiệp
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Nền tảng học tập</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm space-y-1">
                  <div>• LinkedIn Learning – Kỹ năng chuyên nghiệp</div>
                  <div>• Coursera – Khóa học đại học</div>
                  <div>• Udemy – Đào tạo kỹ năng thực tiễn</div>
                  <div>• MasterClass – Lãnh đạo & sáng tạo</div>
                  <div>• Skillshare – Kỹ năng sáng tạo và kinh doanh</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mạng lưới nghề nghiệp</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm space-y-1">
                  <div>• LinkedIn – Kết nối chuyên nghiệp</div>
                  <div>• Hiệp hội ngành nghề</div>
                  <div>• Mạng lưới cựu sinh viên</div>
                  <div>• Buổi gặp gỡ nghề nghiệp</div>
                  <div>• Cộng đồng hội nghị chuyên môn</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Công cụ hỗ trợ nghề nghiệp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm space-y-1">
                  <div>• Công cụ tạo CV</div>
                  <div>• Nền tảng luyện phỏng vấn</div>
                  <div>• Công cụ so sánh mức lương</div>
                  <div>• Bài kiểm tra đánh giá kỹ năng</div>
                  <div>• Dịch vụ huấn luyện nghề nghiệp</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ấn phẩm ngành nghề</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm space-y-1">
                  <div>• Harvard Business Review</div>
                  <div>• Tạp chí chuyên ngành</div>
                  <div>• Blog chuyên môn</div>
                  <div>• Báo cáo nghiên cứu</div>
                  <div>• Ấn phẩm phân tích xu hướng</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Chương trình chứng chỉ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm space-y-1">
                  <div>• Quản lý dự án (PMP)</div>
                  <div>• Chứng chỉ Marketing số</div>
                  <div>• Chứng chỉ theo ngành nghề</div>
                  <div>• Chương trình phát triển lãnh đạo</div>
                  <div>• Chứng chỉ kỹ thuật</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Đánh giá nghề nghiệp</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm space-y-1">
                  <div>• Đánh giá tính cách</div>
                  <div>• Phân tích khoảng cách kỹ năng</div>
                  <div>• Bảng khảo sát sở thích nghề nghiệp</div>
                  <div>• Công cụ phản hồi 360 độ</div>
                  <div>• Mẫu đánh giá hiệu suất</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                Kế hoạch hành động để thành công trong sự nghiệp
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-950">Xác định mục tiêu</h4>
                  <p className="text-sm text-muted-foreground">
                    Đặt ra mục tiêu nghề nghiệp rõ ràng
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-950">Phát triển kỹ năng</h4>
                  <p className="text-sm text-muted-foreground">
                    Xây dựng các năng lực phù hợp
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-950">Mở rộng mạng lưới</h4>
                  <p className="text-sm text-muted-foreground">
                    Xây dựng quan hệ nghề nghiệp
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <Briefcase className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-950">Thực thi</h4>
                  <p className="text-sm text-muted-foreground">
                    Áp dụng kiến thức và hành động thực tế
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="h-6 w-6 text-red-600" />
                  </div>
                  <h4 className="font-semibold text-gray-950">Thăng tiến</h4>
                  <p className="text-sm text-muted-foreground">
                    Tiến tới cấp bậc tiếp theo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
