import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TypographyH2 } from "@/components/ui/typography";
import { colorConst } from "@/const/color-const";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import React from "react";

const posts = [
  {
    id: 1,
    title: "Tuyển dụng nhân viên kế toán",
    created_at: "2021-10-10",
    status: "Closed",
    service: "Standard",
  },
  {
    id: 2,
    title: "Tuyển dụng nhân viên kế toán",
    created_at: "2021-10-10",
    status: "Open",
    service: "Premium",
  },
  {
    id: 3,
    title: "Tuyển dụng nhân viên kế toán",
    created_at: "2021-10-10",
    status: "Closed",
    service: "Featured",
  },
  {
    id: 4,
    title: "Tuyển dụng nhân viên kế toán",
    created_at: "2021-10-10",
    status: "Open",
    service: "Enterprise",
  },
];

export default function DashboardPost() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <TypographyH2 className="">Danh sách</TypographyH2>
        <Button variant={"outline"} className={colorConst.createBtnHoverColor}>
          <Plus />
        </Button>
      </div>
      <Table>
        <TableCaption>Danh sách tin đăng</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12">ID</TableHead>
            <TableHead className="w-4/12">Tiêu đề</TableHead>
            <TableHead className="w-2/12">Dịch vụ</TableHead>
            <TableHead className="w-2/12">Ngày tạo</TableHead>
            <TableHead className="w-1/12">Trạng thái</TableHead>
            <TableHead className="w-2/12">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-semibold">{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>
                {post.service === "Standard" ? (
                  <Badge className="bg-blue-500 dark:bg-blue-400">Cơ bản</Badge>
                ) : post.service === "Premium" ? (
                  <Badge className="bg-green-500 dark:bg-green-400">
                    Nâng cao
                  </Badge>
                ) : post.service === "Featured" ? (
                  <Badge className="bg-purple-500 dark:bg-purple-500">
                    Nổi bật
                  </Badge>
                ) : (
                  <Badge className="bg-cyan-500 dark:bg-cyan-400">
                    Doanh nghiệp
                  </Badge>
                )}
              </TableCell>
              <TableCell>{post.created_at}</TableCell>
              <TableCell>
                {post.status === "Open" ? (
                  <Badge className="bg-green-600 dark:bg-green-300">
                    Đang mở
                  </Badge>
                ) : (
                  <Badge variant="default">Đã đóng</Badge>
                )}
              </TableCell>
              <TableCell className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"outline"}>
                      <Eye />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="min-w-[80%] min-h-[80%]">
                    <DialogHeader>
                      <DialogTitle>Những ứng viên tiềm năng</DialogTitle>
                      <DialogDescription>
                        Đây là danh sách những ứng viên đã ứng tuyển vào tin
                        đăng của bạn. Bạn có thể xem chi tiết hồ sơ của họ và
                        quyết định có nên liên hệ hay không.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Button
                  variant={"outline"}
                  className={colorConst.updateBtnHoverColor}
                >
                  <Pencil />
                </Button>
                <Button
                  variant={"outline"}
                  className="hover:bg-red-500 hover:dark:bg-red-300"
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
