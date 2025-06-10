"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { applicationConst } from "@/const/application-const";
import { ApplicationInterface } from "@/interfaces/application-interface";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Eye, UserRoundCheck, UserRoundX } from "lucide-react";
import React, { useMemo, useState } from "react";

export default function ApplicationTable({ jobId }: { jobId: string }) {
  const applications = useMemo(
    () =>
      applicationConst.data.filter(
        (application) => application.jobId === jobId
      ),
    [jobId]
  );
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: limit,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const columns: ColumnDef<ApplicationInterface>[] = [
    {
      accessorKey: "studentId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Student ID
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div>{row.getValue("studentId")}</div>;
      },
    },
    {
      accessorKey: "resumeId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Resume ID
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div>{row.getValue("resumeId")}</div>;
      },
    },
    {
      accessorKey: "coverLetter",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cover Letter
          </Button>
        );
      },
      cell: ({ row }) => (
        <Tooltip>
          <TooltipTrigger>
            {(row.getValue("coverLetter") as string).length > 30
              ? (row.getValue("coverLetter") as string).slice(0, 30) + "..."
              : (row.getValue("coverLetter") as string)}
          </TooltipTrigger>
          <TooltipContent className="max-w-[400px]">
            {row.getValue("coverLetter")}
          </TooltipContent>
        </Tooltip>
      ),
    },
    {
      accessorKey: "appliedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ứng tuyển lúc
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div>{new Date(row.getValue("appliedAt")).toLocaleString()}</div>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cập nhật lúc
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div>{new Date(row.getValue("updatedAt")).toLocaleString()}</div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Trạng thái
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <div
            className={`${
              status === "Accepted"
                ? "text-green-600"
                : status === "Rejected"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {String(status)}
          </div>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Hành động",
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Button variant="outline">
              <Eye />
            </Button>
            <Button variant="default">
              <UserRoundCheck />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <UserRoundX />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xác nhận từ chối ứng viên</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bạn có chắc chắn muốn từ chối ứng viên{" "}
                    {row.getValue("studentId")} không? Hành động này sẽ không
                    thể hoàn tác.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction>Xác nhận</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: applications,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });
  return (
    <div className="flex flex-col space-y-4">
      <Table>
        <TableCaption>Danh sách ứng viên</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={`application-${header.id}`}
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
              <TableRow
                key={`application-${row.id}`}
                data-state={row.getIsSelected() ? "selected" : ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
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
            <option value={1}>1</option>
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
  );
}
