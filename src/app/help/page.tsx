import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";
import React from "react";

const FAQ = [
  {
    question: "Làm thế nào để tạo một tài khoản trên SWork?",
    answer:
      "Để tạo một tài khoản trên SWork, bạn chỉ cần truy cập vào trang đăng ký và điền thông tin cần thiết như tên, địa chỉ email và mật khẩu. Sau khi hoàn tất, bạn sẽ nhận được một email xác nhận để kích hoạt tài khoản của mình.",
  },
  {
    question: "Làm thế nào để khôi phục mật khẩu của tôi?",
    answer:
      'Nếu bạn quên mật khẩu của mình, hãy nhấp vào liên kết "Quên mật khẩu?" trên trang đăng nhập. Bạn sẽ được yêu cầu nhập địa chỉ email của mình và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu.',
  },
  {
    question: "Làm thế nào để thay đổi thông tin tài khoản của tôi?",
    answer:
      'Để thay đổi thông tin tài khoản của bạn, hãy đăng nhập vào tài khoản của bạn và truy cập vào phần "Cài đặt tài khoản". Tại đây, bạn có thể cập nhật thông tin cá nhân, địa chỉ email và mật khẩu của mình.',
  },
];

export default function HelpPage() {
  return (
    <div className="grid gap-6 lg:gap-12">
      <div className="px-4 md:px-6">
        <div className="py-8 space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Trung tâm hỗ trợ
          </h1>
          <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Chúng tôi ở đây để giúp bạn. Nếu bạn có bất kỳ câu hỏi nào về sản
            phẩm hoặc dịch vụ của chúng tôi, hãy tìm kiếm trong cơ sở kiến thức
            của chúng tôi hoặc liên hệ với chúng tôi qua biểu mẫu bên dưới.
          </p>
        </div>
        <div className="mx-auto max-w-3xl flex items-start space-x-4">
          <Input
            type="search"
            placeholder="Tìm kiếm thông tin..."
            className="flex-1"
          />
          <Button type="submit">
            <Search />
          </Button>
        </div>
      </div>
      <div className="border-t border-b py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="space-y-4">
            {FAQ.map((item, index) => (
              <div key={index} className="border rounded-lg">
                <details className="border-b last:border-0">
                  <summary className="flex items-center space-x-2 cursor-pointer py-4 px-4">
                    <span className="font-medium">{item.question}</span>
                    <div className="w-4 h-4 ml-auto opacity-50" />
                  </summary>
                  <div className="p-4 bg-gray-100 dark:bg-gray-800">
                    <p>{item.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl">
            Hỗ trợ ngay
          </h2>
          <div className="space-y-2">
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Điền thông tin của bạn vào biểu mẫu bên dưới và chúng tôi sẽ liên
              hệ với bạn trong thời gian sớm nhất.
            </p>
            <form className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="name">Tên</Label>
                <Input id="name" required placeholder="Điền tên của bạn" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="Điền email của bạn"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="subject">Mô tả</Label>
                <Input
                  id="subject"
                  required
                  placeholder="Điền mô tả vấn đề của bạn"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="message">Chi tiết</Label>
                <Textarea
                  id="message"
                  required
                  placeholder="Điền chi tiết vấn đề của bạn"
                  className="min-h-[150px] resize-none"
                />
              </div>
              <Button className="mb-16" type="submit">
                Gửi yêu cầu
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
