import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
        <Button variant={"outline"} className="hover:bg-green-300">
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
                  <Badge className="bg-blue-400">Cơ bản</Badge>
                ) : post.service === "Premium" ? (
                  <Badge className="bg-yellow-400">Nâng cao</Badge>
                ) : post.service === "Featured" ? (
                  <Badge className="bg-green-400">Nổi bật</Badge>
                ) : (
                  <Badge className="bg-red-400">Doanh nghiệp</Badge>
                )}
              </TableCell>
              <TableCell>{post.created_at}</TableCell>
              <TableCell>
                {post.status === "Open" ? (
                  <Badge className="bg-green-600">Đang mở</Badge>
                ) : (
                  <Badge variant="default">Đã đóng</Badge>
                )}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button variant={"outline"}>
                  <Eye />
                </Button>
                <Button variant={"outline"} className="hover:bg-blue-500">
                  <Pencil />
                </Button>
                <Button variant={"outline"} className="hover:bg-red-500">
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
