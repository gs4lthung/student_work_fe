"use client";

import { getJobs } from "@/api/job-api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { jobConst } from "@/const/job-const";
import type { JobInterface } from "@/interfaces/job-interface";
import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { Banknote, Clock, MapPin, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export default function JobPage() {
  const [initialData, setInitialData] = useState<JobInterface[]>([]);
  const [filteredData, setFilteredData] = useState<JobInterface[]>([]);
  const [displayedData, setDisplayedData] = useState<JobInterface[]>([]);
  useEffect(() => {
    async function fetchJobs() {
      const data = await getJobs();
      setInitialData(data);
      setFilteredData(data);
      setDisplayedData(data.slice(0, initialLimit));
    }
    fetchJobs();
  }, []);

  const initialLimit = 5;

  const [limit, setLimit] = useState(initialLimit);
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Manual filter states
  const [searchValue, setSearchValue] = useState("");
  const [salaryFilter, setSalaryFilter] = useState<[number, number]>([
    0, 10000000,
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [from, to] = salaryFilter;

  // Get unique locations from data
  const uniqueLocations = Array.from(
    new Set(initialData.map((job) => job.location))
  );

  const columns: ColumnDef<JobInterface>[] = [
    {
      accessorKey: "jobID",
    },
    {
      accessorKey: "title",
      header: "Công việc",
      cell: (info) => info.getValue(),
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      accessorKey: "category",
      header: "Danh mục",
      cell: (info) => info.getValue(),
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      accessorKey: "description",
      header: "Mô tả",
      cell: (info) => info.getValue(),
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      accessorKey: "requirements",
      header: "Yêu cầu",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "location",
      header: "Địa điểm",
      cell: (info) => info.getValue(),
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      accessorKey: "salary",
      header: "Lương",
      cell: (info) => info.getValue(),
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      accessorKey: "workingHours",
      header: "Giờ làm việc",
      cell: (info) => info.getValue(),
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      accessorKey: "startDate",
      header: "Ngày bắt đầu",
      cell: (info) => info.getValue(),
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: (info) => info.getValue(),
      enableSorting: true,
      enableColumnFilter: true,
    },
  ];

  const table = useReactTable({
    data: displayedData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualFiltering: true,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const observerRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  // Infinite scroll effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading && limit < filteredData.length) {
          setIsLoading(true);
          setTimeout(() => {
            const newLimit = limit + initialLimit;
            setLimit(newLimit);
            setDisplayedData(filteredData.slice(0, newLimit));
            setIsLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    const current = observerRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [limit, isLoading, filteredData]);

  // Apply manual filters whenever filter states change
  const applyManualFilters = useCallback(() => {
    // Start with all data
    let filtered = [...initialData];

    // Apply title search filter
    if (searchValue.trim()) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          job.description.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Apply salary range filter
    filtered = filtered.filter((job) => {
      return (
        job.salary !== undefined &&
        job.salary !== null &&
        job.salary >= salaryFilter[0] &&
        job.salary <= salaryFilter[1]
      );
    });

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((job) =>
        selectedCategories.includes(job.category)
      );
    }

    // Apply location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((job) =>
        selectedLocations.includes(job.location)
      );
    }

    // Update filtered data and reset pagination
    setFilteredData(filtered);
    setLimit(initialLimit);
    setDisplayedData(filtered.slice(0, initialLimit));

    // Update column filters state for any components that might need it
    const newColumnFilters: ColumnFiltersState = [];

    if (searchValue.trim()) {
      newColumnFilters.push({ id: "title", value: searchValue });
    }

    if (selectedCategories.length > 0) {
      newColumnFilters.push({ id: "category", value: selectedCategories });
    }

    if (selectedLocations.length > 0) {
      newColumnFilters.push({ id: "location", value: selectedLocations });
    }

    setColumnFilters(newColumnFilters);
  }, [
    searchValue,
    salaryFilter,
    selectedCategories,
    selectedLocations,
    initialLimit,
  ]);

  useEffect(() => {
    applyManualFilters();
  }, [
    searchValue,
    salaryFilter,
    selectedCategories,
    selectedLocations,
    applyManualFilters,
  ]);

  function clearFilters() {
    setSearchValue("");
    setSalaryFilter([0, 10000000]);
    setSelectedCategories([]);
    setSelectedLocations([]);

    if (searchRef.current) {
      searchRef.current.value = "";
    }

    // Reset all table states
    setColumnFilters([]);
    setSorting([]);
    setColumnVisibility({});
    setRowSelection({});
    setIsLoading(false);

    // Reset to original data
    setFilteredData(initialData);
    setLimit(initialLimit);
    setDisplayedData(initialData.slice(0, initialLimit));

    window.scrollTo(0, 0);
  }

  function handleSearch(value: string) {
    setSearchValue(value);
    window.scrollTo(0, 0);
  }

  function handleSalaryFilterChange(value: [number, number]) {
    setSalaryFilter(value);
    window.scrollTo(0, 0);
  }

  function handleCategoryChange(category: string) {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
    window.scrollTo(0, 0);
  }

  function handleLocationChange(location: string) {
    setSelectedLocations((prev) => {
      if (prev.includes(location)) {
        return prev.filter((l) => l !== location);
      } else {
        return [...prev, location];
      }
    });
    window.scrollTo(0, 0);
  }

  function removeFilter(type: string, value?: string) {
    switch (type) {
      case "search":
        setSearchValue("");
        if (searchRef.current) {
          searchRef.current.value = "";
        }
        break;
      case "salary":
        setSalaryFilter([0, 10000000]);
        break;
      case "category":
        if (value) {
          setSelectedCategories((prev) => prev.filter((c) => c !== value));
        }
        break;
      case "location":
        if (value) {
          setSelectedLocations((prev) => prev.filter((l) => l !== value));
        }
        break;
      default:
        break;
    }
  }

  // Quick salary filter presets
  const salaryPresets = [
    { label: "< 1 triệu", value: [0, 1000000] as [number, number] },
    { label: "1-2 triệu", value: [1000000, 2000000] as [number, number] },
    { label: "> 2 triệu", value: [2000000, 10000000] as [number, number] },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách công việc</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 space-y-6 sticky top-25 h-full">
          <div className="p-4 rounded-lg shadow">
            <div className="flex gap-2 items-center mb-4">
              <Input
                ref={searchRef}
                type="text"
                placeholder="Tìm kiếm công việc..."
                className="p-2 border rounded w-full"
                defaultValue={searchValue}
                onChange={(e) => {
                  const value = e.target.value;
                  handleSearch(value);
                }}
              />
              <Button
                variant="outline"
                onClick={clearFilters}
                className="whitespace-nowrap"
              >
                Xóa bộ lọc
              </Button>
            </div>

            {/* Salary filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Mức lương</h3>
              <div className="w-full max-w-sm mx-auto mb-4">
                <Slider
                  value={salaryFilter}
                  onValueChange={(value) => {
                    handleSalaryFilterChange(value as [number, number]);
                  }}
                  max={10000000}
                  min={0}
                  step={500000}
                />
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {from.toLocaleString("vi-VN")}₫ - {to.toLocaleString("vi-VN")}
                  ₫
                </p>
              </div>

              {/* Salary presets */}
              <div className="flex flex-wrap gap-2">
                {salaryPresets.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSalaryFilterChange(preset.value)}
                    className={`text-xs ${
                      salaryFilter[0] === preset.value[0] &&
                      salaryFilter[1] === preset.value[1]
                        ? "bg-primary/10"
                        : ""
                    }`}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Category filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Danh mục</h3>
              <div className="space-y-2">
                {jobConst.category.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.name)}
                      onCheckedChange={() =>
                        handleCategoryChange(category.name)
                      }
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="text-sm"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Location filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Địa điểm</h3>
              <div className="space-y-2">
                {uniqueLocations.map((location, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-${index}`}
                      checked={selectedLocations.includes(location)}
                      onCheckedChange={() => handleLocationChange(location)}
                    />
                    <Label htmlFor={`location-${index}`} className="text-sm">
                      {location}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Hiển thị {displayedData.length} / {filteredData.length} công việc
            </div>
          </div>
        </div>

        <div className="flex-1">
          {/* Active filters */}
          {(searchValue ||
            salaryFilter[0] > 0 ||
            salaryFilter[1] < 10000000 ||
            selectedCategories.length > 0 ||
            selectedLocations.length > 0) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {searchValue && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  Tìm kiếm: {searchValue}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0"
                    onClick={() => removeFilter("search")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {(salaryFilter[0] > 0 || salaryFilter[1] < 10000000) && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  Lương: {salaryFilter[0].toLocaleString("vi-VN")}₫ -{" "}
                  {salaryFilter[1].toLocaleString("vi-VN")}₫
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0"
                    onClick={() => removeFilter("salary")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {selectedCategories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  {category}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0"
                    onClick={() => removeFilter("category", category)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              {selectedLocations.map((location) => (
                <Badge
                  key={location}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  {location}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0"
                    onClick={() => removeFilter("location", location)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {displayedData.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <Link key={row.id} href={`/job/${row.getValue("jobID")}`}>
                  <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        {row.getValue("title")}
                        <Badge>{row.getValue("category")}</Badge>
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {row.getValue("description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5">
                        {Array.isArray(row.getValue("requirements"))
                          ? (row.getValue("requirements") as string[]).map(
                              (req: string, index: number) => (
                                <li key={index}>{req}</li>
                              )
                            )
                          : null}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <MapPin className="h-4 w-4" />
                          {row.getValue("location") !== undefined &&
                          row.getValue("location") !== null
                            ? row.getValue("location")
                            : ""}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Banknote className="h-4 w-4" />
                          {row.getValue("salary") !== undefined &&
                          row.getValue("salary") !== null
                            ? Number(row.getValue("salary")).toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "VND",
                                }
                              )
                            : ""}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="h-4 w-4" />
                          {row.getValue("workingHours") !== undefined &&
                          row.getValue("workingHours") !== null
                            ? row.getValue("workingHours")
                            : ""}
                        </div>
                        <Button variant="outline" className="mt-4">
                          Ứng tuyển
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Không tìm thấy công việc phù hợp
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Thử điều chỉnh bộ lọc của bạn
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-4"
                >
                  Xóa tất cả bộ lọc
                </Button>
              </div>
            )}
          </div>
          <div ref={observerRef} className="h-10">
            {isLoading && <Skeleton className="h-40 w-full mt-4" />}
            {limit >= filteredData.length && filteredData.length > 0 && (
              <p className="text-center my-8">
                Không còn công việc nào để hiển thị
              </p>
            )}
          </div>
        </div>

        <div className="hidden lg:block w-1/4 sticky top-25 h-full">
          <Card className="p-4 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Nhận thông báo công việc mới
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Đăng ký nhận thông báo qua email khi có công việc mới phù hợp
                với sở thích của bạn.
              </CardDescription>
              <CardContent>
                <Input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="w-full mb-4"
                />
                <Button className="w-full">Đăng ký</Button>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="p-4 mt-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Tại sao chọn chúng tôi?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Hàng ngàn công việc mới mỗi ngày</li>
                <li>Đăng ký nhận thông báo công việc mới</li>
                <li>Giao diện dễ sử dụng và tìm kiếm nhanh chóng</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
