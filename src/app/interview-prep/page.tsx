import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  Users,
  MessageSquare,
  Clock,
  Target,
  FileText,
  Lightbulb,
  Phone,
  Video,
  Building,
  Star,
  AlertCircle,
  ThumbsUp,
  Calendar,
  Mail,
} from "lucide-react";

export default function InterviewPrep() {
  const interviewTypes = [
    {
      type: "Phỏng vấn qua điện thoại",
      icon: Phone,
      description:
        "Cuộc gọi sàng lọc ban đầu với người tuyển dụng hoặc người quản lý tuyển dụng",
      duration: "15-30 phút",
      tips: [
        "Tìm một không gian yên tĩnh có sóng tốt",
        "Chuẩn bị sơ yếu lý lịch và ghi chú",
        "Nói rõ ràng và nhiệt tình",
        "Ghi chú trong suốt cuộc trò chuyện",
      ],
    },
    {
      type: "Phỏng vấn video",
      icon: Video,
      description:
        "Cuộc gọi video trực tuyến qua Zoom, Skype hoặc nền tảng khác",
      duration: "30-60 phút",
      tips: [
        "Kiểm tra công nghệ của bạn trước",
        "Đảm bảo ánh sáng và nền tốt",
        "Duy trì giao tiếp bằng mắt với máy ảnh",
        "Ăn mặc chuyên nghiệp từ đầu đến chân",
      ],
    },
    {
      type: "Phỏng vấn trực tiếp",
      icon: Building,
      description: "Gặp mặt trực tiếp với người phỏng vấn tại văn phòng",
      duration: "45-90 phút",
      tips: [
        "Đến sớm ít nhất 10 phút",
        "Ăn mặc phù hợp với văn hóa công ty",
        "Mang theo nhiều bản sơ yếu lý lịch",
        "Thể hiện sự tự tin và thân thiện",
      ],
    },
    {
      type: " Phỏng vấn hành vi",
      icon: Users,
      description:
        "Tập trung vào các tình huống trong quá khứ để đánh giá hành vi",
      duration: "60-90 phút",
      tips: [
        "Giao tiếp bằng mắt với tất cả các thành viên trong hội đồng",
        "Trả lời câu hỏi cho người đã hỏi",
        "Ghi nhớ tên và sử dụng tên của họ",
        "Giữ bình tĩnh và điềm tĩnh",
      ],
    },
  ];

  const commonQuestions = [
    {
      category: "Về bạn",
      questions: [
        {
          question: "Nói về bản thân bạn",
          tip: "Tập trung vào lý lịch chuyên môn, thành tích chính và mục tiêu tiếp theo của bạn",
        },
        {
          question: "Điểm mạnh nhất của bạn là gì?",
          tip: "Chọn điểm mạnh có liên quan đến công việc và đưa ra ví dụ cụ thể",
        },
        {
          question: "Điểm yếu của bạn là gì?",
          tip: "Chia sẻ điểm yếu thực sự và giải thích cách bạn đang nỗ lực cải thiện điểm yếu đó",
        },
        {
          question: "Bạn thấy mình sẽ thế nào sau 5 năm nữa?",
          tip: "Thể hiện tham vọng trong khi phù hợp với các cơ hội tăng trưởng của công ty",
        },
      ],
    },
    {
      category: "Kinh nghiệm & Kỹ năng",
      questions: [
        {
          question: "Tại sao bạn lại nghỉ công việc hiện tại?",
          tip: "Tránh nói xấu công ty cũ, tập trung vào lý do tích cực như tìm kiếm cơ hội mới",
        },
        {
          question: "Mô tả một tình huống khó khăn và cách bạn xử lý nó",
          tip: "Sử dụng phương pháp STAR: Tình huống(Situation), Nhiệm vụ(Task), Hành động(Action), Kết quả(Result)",
        },
        {
          question: "Bạn tự hào nhất về thành tích nào?",
          tip: "Chọn một cái gì đó có liên quan đến vai trò có tác động có thể đo lường được",
        },
        {
          question: "Bạn xử lý căng thẳng và áp lực như thế nào?",
          tip: "Cung cấp các chiến lược và ví dụ cụ thể về việc duy trì năng suất dưới áp lực",
        },
      ],
    },
    {
      category: "Công ty & Vai trò",
      questions: [
        {
          question: "Tại sao bạn muốn làm việc ở đây?",
          tip: "Nêu rõ lý do bạn bị thu hút bởi công ty, văn hóa và vai trò",
        },
        {
          question: "Tại sao bạn nghĩ mình phù hợp với vai trò này?",
          tip: "Liên kết kỹ năng và kinh nghiệm của bạn với các yêu cầu công việc",
        },
        {
          question: "Bạn biết gì về công ty chúng tôi?",
          tip: "Chia sẻ thông tin về sứ mệnh, sản phẩm và thành tựu gần đây của công ty",
        },
        {
          question: "Bạn có câu hỏi nào cho chúng tôi không?",
          tip: "Chuẩn bị các câu hỏi thông minh để thể hiện sự quan tâm và tìm hiểu thêm về công ty",
        },
      ],
    },
  ];

  const preparationChecklist = [
    {
      category: "Nghiên cứu",
      items: [
        "Bối cảnh công ty, sứ mệnh và giá trị",
        "Tin tức và diễn biến gần đây",
        "Mô tả công việc và yêu cầu",
        "Xu hướng và thách thức của ngành",
        "Bối cảnh của người phỏng vấn (LinkedIn)",
        "Văn hóa công ty và môi trường làm việc",
      ],
    },
    {
      category: "Tài liệu",
      items: [
        "Nhiều bản sao sơ ​​yếu lý lịch của bạn",
        "Danh mục đầu tư hoặc mẫu công việc",
        "Danh sách tham khảo",
        "Câu hỏi để hỏi người phỏng vấn",
        "Sổ tay và bút",
        "Danh thiếp (nếu có)",
      ],
    },
    {
      category: "Luyện tập",
      items: [
        "Các câu hỏi phỏng vấn phổ biến",
        "Bài giới thiệu tóm tắt của bạn",
        "Ví dụ về phương pháp STAR",
        "Các câu hỏi về vai trò",
        "Phỏng vấn thử với bạn bè",
        "Ngôn ngữ cơ thể và cách trình bày",
      ],
    },
  ];

  const questionsToAsk = [
    {
      category: "Vai trò & Trách nhiệm",
      questions: [
        "Một ngày làm việc bình thường của vị trí này như thế nào?",
        "Những thách thức lớn nhất mà vị trí này phải đối mặt là gì?",
        "Bạn đánh giá thành công trong vai trò này như thế nào?",
        "Có những cơ hội nào để phát triển chuyên môn?",
      ],
    },
    {
      category: "Đội ngũ & Văn hóa",
      questions: [
        "Bạn có thể cho tôi biết về nhóm mà tôi sẽ làm việc cùng không?",
        "Bạn sẽ mô tả văn hóa công ty như thế nào?",
        "Bạn thích nhất điều gì khi làm việc ở đây?",
        "Công ty hỗ trợ cân bằng giữa công việc và cuộc sống như thế nào?",
      ],
    },
    {
      category: "Tăng trưởng & Tương lai",
      questions: [
        "Mục tiêu của công ty trong năm tới là gì?",
        "Có những cơ hội thăng tiến nghề nghiệp nào?",
        "Công ty đầu tư vào phát triển nhân viên như thế nào?",
        "Các bước tiếp theo trong quy trình phỏng vấn là gì?",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                Chuẩn bị cho phỏng vấn xin việc
              </h1>
              <p className="text-gray-600 mt-1">
                Nắm vững nghệ thuật phỏng vấn và giành được công việc mơ ước của
                bạn
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg text-white">
          <h2 className="text-xl font-semibold mb-2">
            🎯 Tips thành công nhanh{" "}
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Nghiên cứu doanh nghiệp một cách kỹ lưỡng</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Luyện tập trả lời to, rõ ràng</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Chuẩn bị những câu hỏi chu đáo</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="preparation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="preparation">Chuẩn bị</TabsTrigger>
            <TabsTrigger value="types">Các loại phỏng vấn</TabsTrigger>
            <TabsTrigger value="questions">Các câu thường gặp</TabsTrigger>
            <TabsTrigger value="ask">Câu hỏi cần hỏi</TabsTrigger>
            <TabsTrigger value="followup">Theo dõi</TabsTrigger>
          </TabsList>

          <TabsContent value="preparation" className="space-y-6 ">
            <div className="grid lg:grid-cols-3 gap-6">
              {preparationChecklist.map((section, index) => (
                <Card key={index} >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {section.category === "Research" && (
                        <Lightbulb className="h-5 w-5" />
                      )}
                      {section.category === "Materials" && (
                        <FileText className="h-5 w-5" />
                      )}
                      {section.category === "Practice" && (
                        <Target className="h-5 w-5" />
                      )}
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-500">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Thời gian chuẩn bị phỏng vấn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">
                          1W
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Trước 1 tuần</h3>
                      <p className="text-sm text-gray-600">
                        Nghiên cứu công ty, xem xét mô tả công việc, chuẩn bị
                        STAR ví dụ
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-green-600">
                          1D
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Trước 1 ngày</h3>
                      <p className="text-sm text-gray-600">
                        Xác nhận hậu cần, chuẩn bị trang phục, luyện tập trả
                        lời, ngủ ngon
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-orange-600">
                          1H
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Trước 1 giờ</h3>
                      <p className="text-sm text-gray-600">
                        Xem lại ghi chú cuối cùng, đến sớm, thư giãn và giữ thái
                        độ tích cực
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="types" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {interviewTypes.map((type, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <type.icon className="h-5 w-5" />
                      {type.type}
                    </CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                    <Badge variant="outline" className="w-fit">
                      <Clock className="h-3 w-3 mr-1" />
                      {type.duration}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {type.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-500">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Ngôn ngữ cơ thể & Mẹo trình bày</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-600 mb-3 flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4" />
                      Hãy
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Duy trì giao tiếp tốt bằng mắt </li>
                      <li>• Ngồi thẳng lưng với tư thế tốt</li>
                      <li>• Bắt tay một cách tự tin </li>
                      <li>• Mỉm cười một cách chân thành và phù hợp</li>
                      <li>• Sử dụng ngôn ngữ cơ thể cởi mở</li>
                      <li>• Nói rõ ràng và với tốc độ vừa phải</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-600 mb-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Tránh
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Khoanh tay hoặc bồn chồn</li>
                      <li>• Nhìn vào điện thoại hoặc đồng hồ</li>
                      <li>• Bắt tay yếu hoặc quá chặt</li>
                      <li>• Nói quá nhanh hoặc quá nhỏ</li>
                      <li>• Tránh giao tiếp bằng mắt</li>
                      <li>• Ngắt lời người phỏng vấn</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <Accordion type="single" collapsible className="space-y-4">
              {commonQuestions.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      {category.questions.map((item, questionIndex) => (
                        <AccordionItem
                          key={questionIndex}
                          value={`${categoryIndex}-${questionIndex}`}
                        >
                          <AccordionTrigger className="text-left">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <p className="text-sm text-blue-800">
                                <strong>💡 Tip:</strong> {item.tip}
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </Accordion>

            <Card>
              <CardHeader>
                <CardTitle>Phương pháp STAR</CardTitle>
                <CardDescription>
                  Cấu trúc câu trả lời hành vi của bạn một cách hiệu quả
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      S
                    </div>
                    <h4 className="font-semibold text-gray-700">Tình huống (Situation)</h4>
                    <p className="text-xs text-gray-600 mt-1">Đặt bối cảnh</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      T
                    </div>
                    <h4 className="font-semibold text-gray-700">Nhiệm vụ (Task)</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Mô tả trách nhiệm của bạn
                    </p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      A
                    </div>
                    <h4 className="font-semibold text-gray-700">Hành động (Action)</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Giải thích những gì bạn đã làm
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      R
                    </div>
                    <h4 className="font-semibold text-gray-700">Kết quả (Result)</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Chia sẻ kết quả và bài học rút ra
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ask" className="space-y-6">
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Lưu ý: </strong> Đặt những câu hỏi chu đáo thể hiện sự
                quan tâm thực sự của bạn và giúp bạn đánh giá xem công ty có phù
                hợp với bạn không.
              </p>
            </div>

            <div className="grid gap-6">
              {questionsToAsk.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.questions.map((question, qIndex) => (
                        <li key={qIndex} className="flex items-start gap-3">
                          <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-500">{question}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">
                  Những câu hỏi cần tránh
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>
                    • Công ty của bạn làm gì? (cho thấy thiếu sự nghiên cứu)
                  </li>
                  <li>
                    • Tôi được nghỉ phép bao nhiêu ngày? (tập trung vào đóng góp
                    trước)
                  </li>
                  <li>
                    • Tôi có thể làm việc tại nhà không? (lưu lại để thảo luận
                    sau)
                  </li>
                  <li>
                    • Khi nào tôi có thể được thăng chức? (thể hiện sự thiếu
                    kiên nhẫn)
                  </li>
                  <li>• Bạn có kiểm tra lý lịch không? (gây ra cảnh báo)</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="followup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Mẫu Email Cảm Ơn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-300 p-4 rounded-lg font-mono text-sm text-gray-900">
                  <p>
                    <strong>Tiêu đề:</strong> Cảm ơn - [Vị trí ứng tuyển] -
                    Phỏng vấn
                  </p>
                  <br />
                  <p>Thân gửi [Tên người phỏng vấn],</p>
                  <br />
                  <p>
                    Cảm ơn bạn đã dành thời gian gặp tôi hôm nay để thảo luận về
                    vai trò [Chức danh] tại [Tên công ty]. Tôi rất thích cuộc
                    trò chuyện của chúng ta về [chủ đề cụ thể được thảo luận] và
                    tìm hiểu thêm về [sáng kiến ​​hoặc thách thức cụ thể của
                    công ty].
                  </p>
                  <br />
                  <p>
                    Cuộc thảo luận của chúng ta đã củng cố thêm sự nhiệt tình
                    của tôi đối với cơ hội này. Tôi đặc biệt hào hứng về [khía
                    cạnh cụ thể của vai trò] và tin rằng kinh nghiệm của tôi về
                    [kỹ năng/kinh nghiệm có liên quan] sẽ cho phép tôi đóng góp
                    hiệu quả cho nhóm của bạn.
                  </p>
                  <br />
                  <p>
                    Vui lòng cho tôi biết nếu bạn cần thêm thông tin từ tôi. Tôi
                    mong muốn được nghe về các bước tiếp theo trong quy trình.
                  </p>
                  <br />
                  <p>
                    Trân trọng,
                    <br />
                    [Tên của bạn]
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dòng thời gian theo dõi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Badge variant="outline">24h</Badge>
                      <span className="text-sm">Gửi email cảm ơn</span>
                    </div>
                    <div className="flex gap-3">
                      <Badge variant="outline">1 tuần</Badge>
                      <span className="text-sm">
                        Theo dõi nếu không có phản hồi
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <Badge variant="outline">2 tuần</Badge>
                      <span className="text-sm">Email theo dõi cuối cùng</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Những gì cần bao gồm</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Chi tiết cụ thể từ cuộc trò chuyện</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Lặp lại sở thích và trình độ của bạn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Giải quyết mọi mối quan tâm nảy sinh</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Giọng điệu chuyên nghiệp và súc tích</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Xử lý các kết quả khác nhau</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="offer">
                    <AccordionTrigger>
                      Bạn nhận được một lời đề nghị
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Bày tỏ lòng biết ơn và sự nhiệt tình</li>
                        <li>
                          • Yêu cầu cung cấp thông tin chi tiết bằng văn bản
                        </li>
                        <li>
                          • Yêu cầu thời gian hợp lý để xem xét (24-48 giờ)
                        </li>
                        <li>• Đàm phán chuyên nghiệp nếu cần</li>
                        <li>• Phản hồi nhanh chóng với quyết định của bạn</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="rejection">
                    <AccordionTrigger>
                      Bạn nhận được một sự từ chối
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Cảm ơn họ đã dành thời gian và cân nhắc</li>
                        <li>• Yêu cầu phản hồi nếu phù hợp</li>
                        <li>
                          • Bày tỏ sự quan tâm đến các cơ hội trong tương lai
                        </li>
                        <li>• Duy trì mối quan hệ chuyên nghiệp</li>
                        <li>• Học hỏi từ kinh nghiệm</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="waiting">
                    <AccordionTrigger>
                      Bạn vẫn đang chờ đợi để nghe lại
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Chờ thời gian họ cung cấp</li>
                        <li>• Gửi thư theo dõi lịch sự sau thời hạn</li>
                        <li>• Tiếp tục quá trình tìm kiếm việc làm của bạn</li>
                        <li>• Không theo dõi quá thường xuyên</li>
                        <li>• Giữ thái độ tích cực và kiên nhẫn</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <section className="mt-12">
          <Card className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Bạn đã sẵn sàng để thành công! 🎉
              </h2>
              <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                Với sự chuẩn bị và luyện tập phù hợp, bạn sẽ cảm thấy tự tin và
                sẵn sàng thể hiện bản thân tốt nhất trong mọi tình huống phỏng
                vấn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Thực hành phỏng vấn giả
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
