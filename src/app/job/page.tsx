"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Briefcase,
  MapPin,
  Clock,
  BookOpen,
  Filter,
  ArrowUpDown,
  Users,
  Award,
  Leaf,
  Book,
  Soup,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobInterface } from "@/interfaces/job-interface"

// Sample student job data
const jobsData: JobInterface[] = [
  {
    id: "1",
    title: "Thực tập Marketing Online",
    type: "Thực tập",
    description:
      "Cần tuyển thực tập sinh Marketing Online làm việc tại văn phòng, hỗ trợ các chiến dịch quảng cáo trên mạng xã hội và tối ưu hóa nội dung.",
    requirements: ["Sinh viên năm 3 trở lên", "Kỹ năng viết tốt", "Hiểu biết về SEO và quảng cáo trực tuyến"],
    location: "Quận 1, TP.HCM",
    salary: 3000000, // Example salary
    workingHours: "Thứ 2 - Thứ 6, 8h - 17h",
    startDate: new Date("2024-05-15"),
    endDate: new Date("2024-11-15"),
    status: "Đang tuyển",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Nhân viên phục vụ nhà hàng",
    type: "Bán thời gian",
    description:
      "Nhà hàng cần tuyển nhân viên phục vụ bán thời gian, ưu tiên sinh viên năng động, nhiệt tình, có khả năng giao tiếp tốt.",
    requirements: ["Nhanh nhẹn", "Giao tiếp tốt", "Có trách nhiệm"],
    location: "Quận 3, TP.HCM",
    salary: 2500000,
    workingHours: "Linh hoạt, ca tối",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-12-31"),
    status: "Đang tuyển",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "3",
    title: "Gia sư Tiếng Anh",
    type: "Dự án",
    description:
      "Tuyển gia sư Tiếng Anh cho học sinh cấp 2, yêu cầu phát âm chuẩn, ngữ pháp vững và có kinh nghiệm giảng dạy.",
    requirements: ["IELTS 7.0+", "Kinh nghiệm gia sư", "Kiên nhẫn", "Yêu trẻ"],
    location: "Làm từ xa",
    salary: 4000000,
    workingHours: "Theo lịch học sinh",
    startDate: new Date("2024-04-20"),
    endDate: new Date("2025-04-20"),
    status: "Đang tuyển",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "4",
    title: "Cộng tác viên viết bài",
    type: "Thời vụ",
    description:
      "Tuyển cộng tác viên viết bài cho website tin tức, ưu tiên sinh viên báo chí, truyền thông, có khả năng viết lách sáng tạo.",
    requirements: ["Kỹ năng viết tốt", "Nghiên cứu thông tin", "Đúng deadline"],
    location: "Bình Thạnh, TP.HCM",
    salary: 2000000,
    workingHours: "Linh hoạt",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-08-31"),
    status: "Đang tuyển",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "5",
    title: "Thực tập sinh IT Helpdesk",
    type: "Thực tập",
    description:
      "Công ty công nghệ cần tuyển thực tập sinh IT Helpdesk, hỗ trợ kỹ thuật cho người dùng nội bộ, cài đặt phần mềm.",
    requirements: ["Kiến thức IT cơ bản", "Giải quyết vấn đề", "Giao tiếp tốt"],
    location: "Quận 7, TP.HCM",
    salary: 2800000,
    workingHours: "Thứ 2 - Thứ 6, 9h - 18h",
    startDate: new Date("2024-06-10"),
    endDate: new Date("2024-12-10"),
    status: "Đang tuyển",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "6",
    title: "Nhân viên bán hàng thời trang",
    type: "Bán thời gian",
    description:
      "Cửa hàng thời trang tuyển nhân viên bán hàng, yêu cầu ngoại hình ưa nhìn, nhiệt tình, có kinh nghiệm bán hàng là một lợi thế.",
    requirements: ["Yêu thích thời trang", "Giao tiếp tốt", "Nhiệt tình"],
    location: "Quận 1, TP.HCM",
    salary: 2200000,
    workingHours: "Ca xoay",
    startDate: new Date("2024-05-25"),
    endDate: new Date("2024-11-25"),
    status: "Đang tuyển",
    imageUrl: "/placeholder.svg",
  },
]

export default function JobPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [salaryRange, setSalaryRange] = useState<[number, number]>([1000000, 5000000]) // Adjusted default range for total salary
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedJobType, setSelectedJobType] = useState("")
  const [sortOption, setSortOption] = useState("newest")
  const [activeTab, setActiveTab] = useState("all") // 'all' is the only tab now
  const [filteredJobs, setFilteredJobs] = useState<JobInterface[]>(jobsData)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 4
  const [paginatedJobs, setPaginatedJobs] = useState<JobInterface[]>([])
  const [totalPages, setTotalPages] = useState(1)

  // Apply filters and sorting
  useEffect(() => {
    let result = jobsData

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.requirements.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply salary filter
    result = result.filter((job) => job.salary >= salaryRange[0] && job.salary <= salaryRange[1])

    // Apply location filter
    if (selectedLocation && selectedLocation !== "all") {
      result = result.filter((job) => job.location.includes(selectedLocation))
    }

    // Apply job type filter
    if (selectedJobType && selectedJobType !== "all") {
      result = result.filter((job) => job.type === selectedJobType)
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return b.startDate.getTime() - a.startDate.getTime()
        case "oldest":
          return a.startDate.getTime() - b.startDate.getTime()
        case "highestPay":
          return b.salary - a.salary
        case "lowestPay":
          return a.salary - b.salary
        default:
          return 0
      }
    })

    setFilteredJobs(result)
    setTotalPages(Math.ceil(result.length / jobsPerPage))
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, salaryRange, selectedLocation, selectedJobType, sortOption, activeTab])

  // Handle pagination
  useEffect(() => {
    const indexOfLastJob = currentPage * jobsPerPage
    const indexOfFirstJob = indexOfLastJob - jobsPerPage
    setPaginatedJobs(filteredJobs.slice(indexOfFirstJob, indexOfLastJob))
  }, [filteredJobs, currentPage])

  // Format salary to VND
  const formatSalary = (salary: string | number | bigint) => {
    const numericSalary = typeof salary === "string" ? Number(salary) : salary
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(numericSalary)
  }

  // Pagination controls
  const goToPage = (page: number) => {
    if (page < 1) page = 1
    if (page > totalPages) page = totalPages
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-800 dark:to-emerald-700 text-white py-10 px-4 md:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 relative z-10">
              <h1 className="text-3xl md:text-5xl font-bold mb-3 flex items-center dark:text-white">
                <Book className="h-8 w-8 mr-3 text-green-200" />
                Việc làm cho sinh viên
              </h1>
              <p className="text-green-100 text-lg max-w-xl leading-relaxed">
                Tìm kiếm công việc bán thời gian phù hợp với lịch học và phát triển kỹ năng của bạn
              </p>
              <div className="mt-4 flex items-center space-x-3">
                <Badge variant={"secondary"} className="px-3 py-1.5 text-sm">
                  <Users className="h-3.5 w-3.5 mr-1" /> {jobsData.length} việc làm
                </Badge>
                {/* Removed "Việc hot" badge as isFeatured is no longer in interface */}
              </div>
            </div>
            <div className="hidden md:block relative z-10">
              <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center p-2">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-green-400 to-emerald-300 dark:from-green-600 dark:to-emerald-500 flex items-center justify-center">
                  {/* Removed GraduationCap icon as it's not directly related to job data */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform translate-y-1">
          <svg
            className="relative block w-full h-12"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-green-50 dark:fill-gray-900"
            ></path>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Main search bar */}
        <div className="relative mb-8 max-w-3xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Tìm kiếm công việc, kỹ năng, công ty..."
            className="pl-10 py-6 text-lg rounded-xl shadow-lg border-0 focus-visible:ring-2 focus-visible:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant={"outline"} className="absolute right-2 top-2 rounded-lg" onClick={() => setSearchTerm("")}>
            Tìm kiếm
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-800 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 pb-2 pt-4">
                <CardTitle className="flex flex-row items-center gap-2 text-green-800 dark:text-green-200">
                  <Filter className="h-5 w-5" />
                  Bộ lọc tìm kiếm
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Accordion type="single" collapsible className="w-full" defaultValue="jobType">
                  {/* Job type filter */}
                  <AccordionItem value="jobType" className="border-b border-green-100 dark:border-gray-700">
                    <AccordionTrigger className="text-base hover:text-green-600 dark:hover:text-green-400">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Loại công việc
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                        <SelectTrigger className="border-green-200 focus:ring-green-500">
                          <SelectValue placeholder="Chọn loại công việc" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          <SelectItem value="Bán thời gian">Bán thời gian</SelectItem>
                          <SelectItem value="Thời vụ">Thời vụ</SelectItem>
                          <SelectItem value="Dự án">Dự án</SelectItem>
                          <SelectItem value="Thực tập">Thực tập</SelectItem>
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Location filter */}
                  <AccordionItem value="location" className="border-b border-green-100 dark:border-gray-700">
                    <AccordionTrigger className="text-base hover:text-green-600 dark:hover:text-green-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Khu vực
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="border-green-200 focus:ring-green-500">
                          <SelectValue placeholder="Chọn khu vực" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          <SelectItem value="Quận 1">Quận 1</SelectItem>
                          <SelectItem value="Quận 3">Quận 3</SelectItem>
                          <SelectItem value="Quận 7">Quận 7</SelectItem>
                          <SelectItem value="Quận 9">Quận 9</SelectItem>
                          <SelectItem value="Thủ Đức">Thủ Đức</SelectItem>
                          <SelectItem value="Bình Thạnh">Bình Thạnh</SelectItem>
                          <SelectItem value="Tân Bình">Tân Bình</SelectItem>
                          <SelectItem value="Làm từ xa">Làm từ xa</SelectItem>
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Salary range filter */}
                  <AccordionItem value="salaryRange" className="border-b-0">
                    <AccordionTrigger className="text-base hover:text-green-600 dark:hover:text-green-400">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Mức lương
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider
                          defaultValue={[1000000, 5000000]}
                          max={10000000} // Increased max for total salary
                          min={500000} // Decreased min for total salary
                          step={100000}
                          value={salaryRange}
                          onValueChange={(value) => setSalaryRange(value as [number, number])}
                          className="py-4"
                        />
                        <div className="flex justify-between text-sm">
                          <span>{formatSalary(salaryRange[0])}</span>
                          <span>{formatSalary(salaryRange[1])}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button
                  variant={"outline"}
                  className="w-full mt-4"
                  onClick={() => {
                    setSearchTerm("")
                    setSalaryRange([1000000, 5000000]) // Reset to default range
                    setSelectedLocation("")
                    setSelectedJobType("")
                    setActiveTab("all")
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </CardContent>
            </Card>

            {/* Quick tips card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-green-700 dark:text-green-300 flex items-center gap-2">
                  <Soup className="h-5 w-5 text-green-500" />
                  Mẹo tìm việc
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg shadow-sm">
                    <Award className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Tìm kiếm công việc theo từ khóa, kỹ năng hoặc công ty yêu thích</span>
                  </li>
                  <li className="flex items-start gap-2 bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg shadow-sm">
                    <Award className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Sử dụng bộ lọc để thu hẹp kết quả tìm kiếm theo nhu cầu của bạn</span>
                  </li>
                  <li className="flex items-start gap-2 bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg shadow-sm">
                    <Award className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Đọc kỹ mô tả công việc và yêu cầu trước khi nộp đơn</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main content with job listings */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs and sort options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border-0 backdrop-blur-sm">
              <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
                <TabsList className="bg-green-100 dark:bg-gray-700 shadow-sm">
                  <TabsTrigger
                    value="all"
                    className="border-0 data-[state=active]:bg-green-600 data-[state=active]:text-white dark:data-[state=active]:bg-green-900 dark:data-[state=active]:text-white"
                  >
                    Tất cả
                  </TabsTrigger>
                  {/* Removed "Việc hot" tab trigger */}
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <ArrowUpDown className="h-4 w-4 text-green-500" />
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-full sm:w-[200px] border-green-200 focus:ring-green-500">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="oldest">Cũ nhất</SelectItem>
                    <SelectItem value="highestPay">Lương cao nhất</SelectItem>
                    <SelectItem value="lowestPay">Lương thấp nhất</SelectItem>
                    {/* Removed "Phổ biến nhất" sort option */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job count */}
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md border-0 backdrop-blur-sm">
              <h2 className="font-medium text-green-700 dark:text-green-300 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Hiển thị {filteredJobs.length} công việc phù hợp
              </h2>
            </div>

            {/* Job listings */}
            {filteredJobs.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {paginatedJobs.map((job) => (
                    <Card
                      key={job.id}
                      className={`hover:shadow-xl transition-all duration-300 border-0 group ${
                        job.status === "Đang tuyển" // Using status as a simple indicator for styling
                          ? "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/40 dark:to-emerald-900/40 shadow-lg"
                          : "bg-white dark:bg-gray-800 shadow-md"
                      }`}
                    >
                      {job.status === "Đang tuyển" && ( // Using status as a simple indicator for badge
                        <div className="relative top-0 right-0 p-2">
                          <Badge className="bg-gradient-to-r from-amber-500 to-green-500 text-white border-0 rounded-tl-none rounded-br-none">
                            Hot
                          </Badge>
                        </div>
                      )}
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl text-green-800 dark:text-green-300 group-hover:text-green-600 transition-colors">
                              {job.title}
                            </CardTitle>
                            <p className="text-gray-600 dark:text-gray-400 font-medium">{job.status}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0"
                          >
                            {job.startDate.toLocaleDateString()} - {job.endDate.toLocaleDateString()}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{job.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 mb-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="h-3.5 w-3.5 text-green-500" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <Briefcase className="h-3.5 w-3.5 text-green-500" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <Clock className="h-3.5 w-3.5 text-green-500" />
                            <span className="font-medium text-green-600 dark:text-green-400">{job.workingHours}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <BookOpen className="h-3.5 w-3.5 text-green-500" />
                            <span>{formatSalary(job.salary)}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((requirement, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 hover:bg-green-200"
                            >
                              {requirement}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium text-green-600 dark:text-green-400">
                            {/* Removed applicantsCount */}
                          </span>{" "}
                          {/* Removed "sinh viên đã ứng tuyển" text */}
                        </div>
                        <Button variant={"default"} className=" group-hover:scale-105 transition-transform">
                          Ứng tuyển ngay
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                        className="h-8 w-8 border-green-200"
                      >
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="h-8 w-8 border-green-200"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      {/* Page numbers */}
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="icon"
                            onClick={() => goToPage(page)}
                            className={`h-8 w-8 ${
                              currentPage === page
                                ? "bg-green-600 hover:bg-green-700"
                                : "border-green-200 hover:border-green-300"
                            }`}
                          >
                            {page}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="h-8 w-8 border-green-200"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="h-8 w-8 border-green-200"
                      >
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border-0 text-center">
                <div className="flex justify-center mb-4">
                  <Search className="h-12 w-12 text-green-300 dark:text-green-700" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-green-700 dark:text-green-300">
                  Không tìm thấy công việc phù hợp
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Vui lòng thử lại với các bộ lọc khác hoặc mở rộng tiêu chí tìm kiếm
                </p>
                <Button
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/30"
                  onClick={() => {
                    setSearchTerm("")
                    setSalaryRange([1000000, 5000000])
                    setSelectedLocation("")
                    setSelectedJobType("")
                    setActiveTab("all")
                  }}
                >
                  Xóa tất cả bộ lọc
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-green-800 mt-12 py-8 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold flex items-center text-white dark:text-green-200">
                <Leaf className="h-6 w-6 mr-2" />
                Việc làm cho sinh viên
              </h2>
              <p className="text-green-200 mt-2">
                Kết nối sinh viên với công việc bán thời gian thân thiện với môi trường
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="secondary">Đăng ký nhận thông báo</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation keyframes */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
