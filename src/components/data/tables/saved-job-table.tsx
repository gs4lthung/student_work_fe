"use client";

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
import { JobInterface } from "@/interfaces/job-interface";
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
import Link from "next/link";
import React, { useMemo, useState } from "react";

export default function SavedJobTable({ jobs }: { jobs: JobInterface[] }) {
  const [limit] = useState(10);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: limit,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<JobInterface>[] = useMemo(
    () => [
      {
        accessorKey: "id",
      },
      {
        accessorKey: "title",
        header: "Công việc",
        cell: ({ row }) => {
          const job = row.original;
          return <Link href={`/job/${job.jobID}`}>{job.title}</Link>;
        },
      },
      {
        accessorKey: "category",
        header: "Danh mục",
        cell: ({ row }) => {
          const job = row.original;
          return job.category ? job.category : "Không có danh mục";
        },
      },
      {
        accessorKey: "location",
        header: "Địa điểm",
        cell: ({ row }) => {
          const job = row.original;
          return job.location ? job.location : "Không có địa điểm";
        },
      },
      {
        accessorKey: "salary",
        header: "Lương",
        cell: ({ row }) => {
          const job = row.original;
          return job.salary
            ? job.salary.toLocaleString("vi-VN")
            : "Không có lương";
        },
      },
      {
        accessorKey: "action",
        header: "Hành động",
        cell: ({ row }) => {
          const job = row.original;
          return (
            <div className="flex items-center gap-2">
              <Link href={`/job/${job.jobID}`}>
                <Button variant="outline">Xem chi tiết</Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => {
                  // Handle delete action here
                  alert(`Bạn có chắc chắn muốn xóa công việc "${job.title}"?`);
                }}
              >
                Xóa
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: jobs,
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
    <div className="flex flex-col">
      <Table>
        <TableCaption>Danh sách việc làm đã lưu</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.id !== "id" &&
                    flexRender(
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
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {!cell.id.includes("id") &&
                      flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>Không có dữ liệu</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Hiển thị{" "}
            <strong>
              {pagination.pageIndex * pagination.pageSize + 1}-
              {pagination.pageIndex * pagination.pageSize +
                table.getRowModel().rows.length}{" "}
            </strong>
            trên <strong>{jobs.length}</strong> công việc đã lưu
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            variant="outline"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </div>
      </div>
    </div>
  );
}
