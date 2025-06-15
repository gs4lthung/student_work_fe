"use client";

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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TypographyH2 } from "@/components/ui/typography";
import { JobInterface } from "@/interfaces/job-interface";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, ChevronRight, Eye } from "lucide-react";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import ApplicationTable from "./application-table";
import { SubscriptionInterface } from "@/interfaces/subscription-interface";

export default function JobTable({
  jobs,
  jobSubscriptions,
}: {
  jobs: JobInterface[];
  jobSubscriptions: SubscriptionInterface[];
}) {
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: limit,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [expanded, setExpanded] = useState({});

  const columns: ColumnDef<JobInterface>[] = useMemo(
    () => [
      {
        id: "expander",
        header: () => null,
        cell: ({ row }) => (
          <Button
            variant="ghost"
            onClick={() => row.toggleExpanded()}
            disabled={!row.getCanExpand()}
          >
            {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
          </Button>
        ),
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "title",

        header: ({ column }) => {
          return (
            <Button
              variant={"ghost"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Tiêu đề
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="font-semibold">{row.getValue("title")}</div>
        ),
      },
      {
        accessorKey: "category",
        header: ({ column }) => {
          return (
            <Button
              variant={"ghost"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Danh mục
            </Button>
          );
        },
        cell: ({ row }) => <div>{row.getValue("category")}</div>,
      },
      {
        accessorKey: "description",
        header: ({ column }) => {
          return (
            <Button
              variant={"ghost"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Mô tả
            </Button>
          );
        },
        cell: ({ row }) => (
          <Tooltip>
            <TooltipTrigger>
              {(row.getValue("description") as string).length > 30
                ? (row.getValue("description") as string).slice(0, 30) + "..."
                : (row.getValue("description") as string)}
            </TooltipTrigger>
            <TooltipContent>{row.getValue("description")}</TooltipContent>
          </Tooltip>
        ),
      },
      {
        accessorKey: "salary",
        header: ({ column }) => {
          return (
            <Button
              variant={"ghost"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Mức lương
            </Button>
          );
        },
        cell: ({ row }) => (
          <div>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(row.getValue("salary"))}
          </div>
        ),
      },
      {
        accessorKey: "workingHours",
        header: ({ column }) => {
          return (
            <Button
              variant={"ghost"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Giờ làm việc
            </Button>
          );
        },
        cell: ({ row }) => <div>{row.getValue("workingHours")}</div>,
      },
      {
        accessorKey: "startDate",
        header: ({ column }) => {
          return (
            <Button
              variant={"ghost"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Ngày bắt đầu
            </Button>
          );
        },
        cell: ({ row }) => (
          <div>
            {new Intl.DateTimeFormat("vi-VN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(new Date(row.getValue("startDate")))}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => {
          return (
            <Button
              variant={"ghost"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Trạng thái
            </Button>
          );
        },
        cell: ({ row }) => (
          <Badge
            className={cn(
              row.getValue("status") === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800",
              "text-center",
              "w-fit",
              "px-2",
              "py-1",
              "rounded-full"
            )}
          >
            {row.getValue("status") === "Active" ? (
              <span className="text-green-600">Hoạt động</span>
            ) : (
              <span className="text-red-600">Đã dừng</span>
            )}
          </Badge>
        ),
      },
      {
        accessorKey: "view",
        header: ({ column }) => {
          return (
            <Button
              variant={"ghost"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Xem
            </Button>
          );
        },
        cell: ({ row }) => (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"ghost"}>
                <Eye />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
              <DialogHeader>
                <DialogTitle>Chi tiết công việc</DialogTitle>
                <DialogDescription>
                  Xem chi tiết công việc {row.getValue("title")}.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <div className="flex items-center gap-4 mb-4">
                  <p className="mb-2t text-3xl">{row.getValue("title")}</p>
                  <Badge
                    className={cn(
                      row.getValue("status") === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800",
                      "text-center",
                      "w-fit",
                      "px-2",
                      "py-1",
                      "rounded-full"
                    )}
                  >
                    {row.getValue("status") === "Active" ? (
                      <span className="text-green-600">Hoạt động</span>
                    ) : (
                      <span className="text-red-600">Đã dừng</span>
                    )}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4">
                  {row.getValue("description")}
                </p>
                <div className="flex flex-col gap-2">
                  <span>
                    <strong>Gói dịch vụ: </strong>
                    {jobSubscriptions.find(
                      (sub) =>
                        sub.subscriptionID === row.original.subscriptionID
                    )?.subscriptionName || "Không có gói dịch vụ"}
                  </span>
                  <span>
                    <strong>Danh mục:</strong> {row.getValue("category")}
                  </span>
                  <span>
                    <strong>Mức lương:</strong>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(row.getValue("salary"))}
                  </span>
                  <span>
                    <strong>Giờ làm việc:</strong>{" "}
                    {row.getValue("workingHours")}
                  </span>
                  <span>
                    <strong>Địa điểm:</strong> {row.original.location}
                  </span>
                  <span>
                    <strong>Ngày bắt đầu:</strong>{" "}
                    {new Intl.DateTimeFormat("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(row.getValue("startDate")))}
                  </span>
                  <span>
                    <strong>Yêu cầu:</strong> {row.original.requirements}
                  </span>
                  <span>
                    <strong>Ngày tạo: </strong>
                    {row.original.createdAt?.toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}{" "}
                  </span>
                  <span>
                    <strong>Cập nhật lần cuối: </strong>
                    {row.original.updatedAt?.toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}{" "}
                  </span>
                  {row.original.imageUrl && (
                    <Image
                      src={row.original.imageUrl}
                      alt={row.getValue("title")}
                      width={200}
                      height={200}
                      className="rounded-lg mt-4"
                    />
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ),
      },
    ],
    [jobSubscriptions]
  );

  const renderSubRow = ({ row }: { row: Row<JobInterface> }) => {
    return (
      <tr>
        <td colSpan={columns.length} className="p-4">
          <ApplicationTable jobId={row.original.jobID ?? ""} />
        </td>
      </tr>
    );
  };

  const table = useReactTable({
    data: jobs,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      expanded,
    },
    getRowCanExpand: (row) => row.original.status === "Active",
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <TypographyH2 className="">Danh sách</TypographyH2>
        <div className="flex items-center gap-2">
          <select
            value={String(
              table.getColumn("status")?.getFilterValue() ?? "Active"
            )}
            onChange={(e) => {
              const status = e.target.value;
              table.setColumnFilters((prev) => [
                ...prev.filter((f) => f.id !== "status"),
                { id: "status", value: status },
              ]);
            }}
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option value="Active">Đang hoạt động</option>
            <option value="Inactive">Không hoạt động</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <Table className="min-w-[900px] ">
          <TableCaption>Danh sách tin đăng</TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={`job-${header.id}`}
                    className="font-semibold text-center align-middle"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    key={`job-${row.id}`}
                    data-state={row.getIsSelected() ? "selected" : ""}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && renderSubRow({ row })}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Hiển thị</span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPagination({
                  pageIndex: 0,
                  pageSize: Number(e.target.value),
                });
              }}
              className="border rounded p-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm">bản ghi</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={"outline"}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Trước
            </Button>
            <Button
              variant={"outline"}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Tiếp theo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
