"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Briefcase,
  MapPin,
  Clock,
  BookOpen,
  Filter,
  ArrowUpDown,
  GraduationCap,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
  Users,
  Award,
  Leaf,
  Book,
  Soup,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColourfulText } from "@/components/ui/text-colorful";

// Sample student job data
const jobsData = [
  {
    id: 1,
    title: "Trợ giảng Tiếng Anh",
    company: "Trung tâm Anh ngữ Bright Stars",
    location: "Quận 1, TP.HCM",
    campus: "Gần ĐH Khoa học Xã hội & Nhân văn",
    type: "Bán thời gian",
    schedule: "Tối 2-4-6",
    hourlyRate: 80000,
    skillLevel: "Trung cấp",
    posted: "2 ngày trước",
    description:
      "Hỗ trợ giảng dạy tiếng Anh cho học sinh tiểu học, chuẩn bị tài liệu và hoạt động lớp học.",
    tags: ["Giáo dục", "Tiếng Anh", "Trẻ em"],
    featured: true,
    applicationCount: 12,
  },
  {
    id: 2,
    title: "Nhân viên phục vụ quán cà phê",
    company: "The Coffee House",
    location: "Quận 3, TP.HCM",
    campus: "Gần ĐH Kinh tế",
    type: "Bán thời gian",
    schedule: "Linh hoạt",
    hourlyRate: 25000,
    skillLevel: "Sơ cấp",
    posted: "1 ngày trước",
    description:
      "Phục vụ khách hàng, pha chế đồ uống cơ bản, duy trì vệ sinh quán.",
    tags: ["F&B", "Dịch vụ", "Cà phê"],
    featured: false,
    applicationCount: 24,
  },
  {
    id: 3,
    title: "Content Creator",
    company: "Digital Media Agency",
    location: "Làm từ xa",
    campus: "Online",
    type: "Dự án",
    schedule: "Tự do",
    hourlyRate: 100000,
    skillLevel: "Trung cấp",
    posted: "3 ngày trước",
    description:
      "Sáng tạo nội dung cho các nền tảng mạng xã hội, viết bài, chụp ảnh sản phẩm.",
    tags: ["Marketing", "Sáng tạo", "Social Media"],
    featured: true,
    applicationCount: 18,
  },
  {
    id: 4,
    title: "Gia sư Toán cấp 3",
    company: "Trung tâm gia sư Tài Năng Trẻ",
    location: "Quận 7, TP.HCM",
    campus: "Gần ĐH Tôn Đức Thắng",
    type: "Bán thời gian",
    schedule: "Tối 3-5-7",
    hourlyRate: 120000,
    skillLevel: "Cao cấp",
    posted: "5 ngày trước",
    description:
      "Dạy kèm Toán cho học sinh lớp 11, chuẩn bị cho kỳ thi đại học.",
    tags: ["Giáo dục", "Toán học", "Gia sư"],
    featured: false,
    applicationCount: 7,
  },
  {
    id: 5,
    title: "Trợ lý nghiên cứu",
    company: "Viện Nghiên cứu Khoa học Ứng dụng",
    location: "Thủ Đức, TP.HCM",
    campus: "Trong khuôn viên ĐH Bách Khoa",
    type: "Bán thời gian",
    schedule: "Sáng T2-T6",
    hourlyRate: 75000,
    skillLevel: "Cao cấp",
    posted: "1 tuần trước",
    description:
      "Hỗ trợ các dự án nghiên cứu, thu thập và phân tích dữ liệu, viết báo cáo.",
    tags: ["Nghiên cứu", "Khoa học", "Học thuật"],
    featured: false,
    applicationCount: 5,
  },
  {
    id: 6,
    title: "Nhân viên bán hàng thời vụ",
    company: "Uniqlo",
    location: "Quận 1, TP.HCM",
    campus: "Gần ĐH Kinh tế",
    type: "Thời vụ",
    schedule: "Cuối tuần",
    hourlyRate: 30000,
    skillLevel: "Sơ cấp",
    posted: "2 ngày trước",
    description:
      "Tư vấn khách hàng, sắp xếp hàng hóa, hỗ trợ thanh toán trong dịp lễ hội.",
    tags: ["Bán lẻ", "Thời trang", "Bán hàng"],
    featured: false,
    applicationCount: 30,
  },
  {
    id: 7,
    title: "Thiết kế đồ họa",
    company: "Creative Studio",
    location: "Quận Bình Thạnh, TP.HCM",
    campus: "Gần ĐH Văn Lang",
    type: "Bán thời gian",
    schedule: "Linh hoạt",
    hourlyRate: 90000,
    skillLevel: "Trung cấp",
    posted: "4 ngày trước",
    description:
      "Thiết kế banner, poster, và các ấn phẩm quảng cáo cho các sự kiện và chiến dịch marketing.",
    tags: ["Thiết kế", "Đồ họa", "Sáng tạo"],
    featured: true,
    applicationCount: 15,
  },
  {
    id: 8,
    title: "Trợ lý hành chính",
    company: "Văn phòng Luật sư Công Minh",
    location: "Quận 3, TP.HCM",
    campus: "Gần ĐH Luật",
    type: "Bán thời gian",
    schedule: "Chiều T2-T6",
    hourlyRate: 45000,
    skillLevel: "Trung cấp",
    posted: "1 tuần trước",
    description:
      "Hỗ trợ công việc văn phòng, sắp xếp lịch hẹn, soạn thảo văn bản, tiếp đón khách hàng.",
    tags: ["Hành chính", "Văn phòng", "Luật"],
    featured: false,
    applicationCount: 9,
  },
  {
    id: 9,
    title: "Nhân viên chăm sóc cây xanh",
    company: "Green Garden",
    location: "Quận 9, TP.HCM",
    campus: "Gần ĐH Nông Lâm",
    type: "Bán thời gian",
    schedule: "Sáng T2-T7",
    hourlyRate: 35000,
    skillLevel: "Sơ cấp",
    posted: "3 ngày trước",
    description:
      "Chăm sóc cây cảnh, tưới nước, bón phân và tư vấn khách hàng về cách chăm sóc cây.",
    tags: ["Môi trường", "Làm vườn", "Tự nhiên"],
    featured: false,
    applicationCount: 8,
  },
  {
    id: 10,
    title: "Trợ lý Marketing",
    company: "EcoGreen Solutions",
    location: "Quận 2, TP.HCM",
    campus: "Gần ĐH Quốc tế",
    type: "Bán thời gian",
    schedule: "Chiều T3-T5-T7",
    hourlyRate: 60000,
    skillLevel: "Trung cấp",
    posted: "6 ngày trước",
    description:
      "Hỗ trợ chiến dịch marketing cho các sản phẩm thân thiện với môi trường, quản lý mạng xã hội.",
    tags: ["Marketing", "Môi trường", "Bền vững"],
    featured: true,
    applicationCount: 14,
  },
  {
    id: 11,
    title: "Nhân viên trồng rau hữu cơ",
    company: "Organic Farm",
    location: "Hóc Môn, TP.HCM",
    campus: "Xa trung tâm",
    type: "Bán thời gian",
    schedule: "Sáng T2-T4-T6",
    hourlyRate: 40000,
    skillLevel: "Sơ cấp",
    posted: "1 tuần trước",
    description:
      "Tham gia vào quá trình trồng và chăm sóc rau hữu cơ, thu hoạch và đóng gói sản phẩm.",
    tags: ["Nông nghiệp", "Hữu cơ", "Môi trường"],
    featured: false,
    applicationCount: 6,
  },
  {
    id: 12,
    title: "Nhân viên tái chế",
    company: "RecycleHub",
    location: "Quận Tân Bình, TP.HCM",
    campus: "Gần ĐH Công nghiệp",
    type: "Bán thời gian",
    schedule: "Linh hoạt",
    hourlyRate: 30000,
    skillLevel: "Sơ cấp",
    posted: "4 ngày trước",
    description:
      "Phân loại rác tái chế, hướng dẫn khách hàng về cách phân loại rác, tham gia các chiến dịch nâng cao nhận thức về môi trường.",
    tags: ["Môi trường", "Tái chế", "Bền vững"],
    featured: false,
    applicationCount: 11,
  },
];

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  campus: string;
  type: string;
  schedule: string;
  hourlyRate: number;
  skillLevel: string;
  posted: string;
  description: string;
  tags: string[];
  featured: boolean;
  applicationCount: number;
};

export default function JobPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hourlyRateRange, setHourlyRateRange] = useState<[number, number]>([
    20000, 150000,
  ]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobsData);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;
  const [paginatedJobs, setPaginatedJobs] = useState<Job[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Apply filters and sorting
  useEffect(() => {
    let result = jobsData;

    // Filter by tab
    if (activeTab === "featured") {
      result = result.filter((job) => job.featured);
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply hourly rate filter
    result = result.filter(
      (job) =>
        job.hourlyRate >= hourlyRateRange[0] &&
        job.hourlyRate <= hourlyRateRange[1]
    );

    // Apply location filter
    if (selectedLocation) {
      result = result.filter((job) => job.location.includes(selectedLocation));
    }

    // Apply campus filter
    if (selectedCampus) {
      result = result.filter((job) => job.campus.includes(selectedCampus));
    }

    // Apply job type filter
    if (selectedJobType) {
      result = result.filter((job) => job.type === selectedJobType);
    }

    // Apply schedule filter
    if (selectedSchedule) {
      result = result.filter((job) => job.schedule.includes(selectedSchedule));
    }

    // Apply skill level filter
    if (selectedSkillLevel) {
      result = result.filter((job) => job.skillLevel === selectedSkillLevel);
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        // For demo purposes, we'll just use the original order
        break;
      case "oldest":
        result = [...result].reverse();
        break;
      case "highestPay":
        result = [...result].sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      case "lowestPay":
        result = [...result].sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case "mostPopular":
        result = [...result].sort(
          (a, b) => b.applicationCount - a.applicationCount
        );
        break;
    }

    setFilteredJobs(result);
    setTotalPages(Math.ceil(result.length / jobsPerPage));
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    searchTerm,
    hourlyRateRange,
    selectedLocation,
    selectedCampus,
    selectedJobType,
    selectedSchedule,
    selectedSkillLevel,
    sortOption,
    activeTab,
  ]);

  // Handle pagination
  useEffect(() => {
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    setPaginatedJobs(filteredJobs.slice(indexOfFirstJob, indexOfLastJob));
  }, [filteredJobs, currentPage]);

  // Format hourly rate to VND
  const formatHourlyRate = (rate: string | number | bigint) => {
    const numericRate = typeof rate === "string" ? Number(rate) : rate;
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(numericRate);
  };

  // Pagination controls
  const goToPage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

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
                Tìm kiếm công việc bán thời gian phù hợp với lịch học và phát
                triển kỹ năng của bạn
              </p>
              <div className="mt-4 flex items-center space-x-3">
                <Badge variant={"secondary"} className="px-3 py-1.5 text-sm">
                  <Users className="h-3.5 w-3.5 mr-1" /> {jobsData.length} việc
                  làm
                </Badge>
                <Badge variant={"secondary"} className="px-3 py-1.5 text-sm">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />{" "}
                  {jobsData.filter((job) => job.featured).length} việc hot
                </Badge>
              </div>
            </div>
            <div className="hidden md:block relative z-10">
              <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center p-2">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-green-400 to-emerald-300 dark:from-green-600 dark:to-emerald-500 flex items-center justify-center">
                  <GraduationCap className="h-24 w-24 text-white" />
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
          <Button
            variant={"outline"}
            className="absolute right-2 top-2 rounded-lg"
            onClick={() => setSearchTerm("")}
          >
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
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="jobType"
                >
                  {/* Job type filter */}
                  <AccordionItem
                    value="jobType"
                    className="border-b border-green-100 dark:border-gray-700"
                  >
                    <AccordionTrigger className="text-base hover:text-green-600 dark:hover:text-green-400">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Loại công việc
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Select
                        value={selectedJobType}
                        onValueChange={setSelectedJobType}
                      >
                        <SelectTrigger className="border-green-200 focus:ring-green-500">
                          <SelectValue placeholder="Chọn loại công việc" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          <SelectItem value="Bán thời gian">
                            Bán thời gian
                          </SelectItem>
                          <SelectItem value="Thời vụ">Thời vụ</SelectItem>
                          <SelectItem value="Dự án">Dự án</SelectItem>
                          <SelectItem value="Thực tập">Thực tập</SelectItem>
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Location filter */}
                  <AccordionItem
                    value="location"
                    className="border-b border-green-100 dark:border-gray-700"
                  >
                    <AccordionTrigger className="text-base hover:text-green-600 dark:hover:text-green-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Khu vực
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Select
                        value={selectedLocation}
                        onValueChange={setSelectedLocation}
                      >
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

                  {/* Campus proximity filter */}
                  <AccordionItem
                    value="campus"
                    className="border-b border-green-100 dark:border-gray-700"
                  >
                    <AccordionTrigger className="text-base hover:text-green-600 dark:hover:text-green-400">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Gần trường
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Select
                        value={selectedCampus}
                        onValueChange={setSelectedCampus}
                      >
                        <SelectTrigger className="border-green-200 focus:ring-green-500">
                          <SelectValue placeholder="Chọn trường" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          <SelectItem value="ĐH Bách Khoa">
                            ĐH Bách Khoa
                          </SelectItem>
                          <SelectItem value="ĐH Kinh tế">ĐH Kinh tế</SelectItem>
                          <SelectItem value="ĐH Khoa học Xã hội">
                            ĐH Khoa học Xã hội
                          </SelectItem>
                          <SelectItem value="ĐH Luật">ĐH Luật</SelectItem>
                          <SelectItem value="ĐH Tôn Đức Thắng">
                            ĐH Tôn Đức Thắng
                          </SelectItem>
                          <SelectItem value="ĐH Văn Lang">
                            ĐH Văn Lang
                          </SelectItem>
                          <SelectItem value="ĐH Nông Lâm">
                            ĐH Nông Lâm
                          </SelectItem>
                          <SelectItem value="ĐH Quốc tế">ĐH Quốc tế</SelectItem>
                          <SelectItem value="ĐH Công nghiệp">
                            ĐH Công nghiệp
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Schedule filter */}
                  <AccordionItem
                    value="schedule"
                    className="border-b border-green-100 dark:border-gray-700"
                  >
                    <AccordionTrigger className="text-base hover:text-green-600 dark:hover:text-green-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Lịch làm việc
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Select
                        value={selectedSchedule}
                        onValueChange={setSelectedSchedule}
                      >
                        <SelectTrigger className="border-green-200 focus:ring-green-500">
                          <SelectValue placeholder="Chọn lịch làm việc" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          <SelectItem value="Linh hoạt">Linh hoạt</SelectItem>
                          <SelectItem value="Cuối tuần">Cuối tuần</SelectItem>
                          <SelectItem value="Buổi tối">Buổi tối</SelectItem>
                          <SelectItem value="Buổi sáng">Buổi sáng</SelectItem>
                          <SelectItem value="Buổi chiều">Buổi chiều</SelectItem>
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Skill level filter */}
                  <AccordionItem
                    value="skillLevel"
                    className="border-b border-green-100 dark:border-gray-700"
                  >
                    <AccordionTrigger className="text-base hover:text-green-600 dark:hover:text-green-400">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Trình độ yêu cầu
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Select
                        value={selectedSkillLevel}
                        onValueChange={setSelectedSkillLevel}
                      >
                        <SelectTrigger className="border-green-200 focus:ring-green-500">
                          <SelectValue placeholder="Chọn trình độ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          <SelectItem value="Sơ cấp">
                            Sơ cấp (Không cần kinh nghiệm)
                          </SelectItem>
                          <SelectItem value="Trung cấp">
                            Trung cấp (Có kiến thức cơ bản)
                          </SelectItem>
                          <SelectItem value="Cao cấp">
                            Cao cấp (Có kinh nghiệm)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Hourly rate filter */}
                  <AccordionItem value="hourlyRate" className="border-b-0">
                    <AccordionTrigger className="text-base hover:text-green-600 dark:hover:text-green-400">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Mức lương theo giờ
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider
                          defaultValue={[20000, 150000]}
                          max={200000}
                          min={20000}
                          step={5000}
                          value={hourlyRateRange}
                          onValueChange={(value) =>
                            setHourlyRateRange(value as [number, number])
                          }
                          className="py-4"
                        />
                        <div className="flex justify-between text-sm">
                          <span>
                            {formatHourlyRate(hourlyRateRange[0])}/giờ
                          </span>
                          <span>
                            {formatHourlyRate(hourlyRateRange[1])}/giờ
                          </span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button
                  variant={"outline"}
                  className="w-full mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setHourlyRateRange([20000, 150000]);
                    setSelectedLocation("");
                    setSelectedCampus("");
                    setSelectedJobType("");
                    setSelectedSchedule("");
                    setSelectedSkillLevel("");
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
                    <span>
                      Tìm kiếm công việc theo từ khóa, kỹ năng hoặc công ty yêu
                      thích
                    </span>
                  </li>
                  <li className="flex items-start gap-2 bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg shadow-sm">
                    <Award className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Sử dụng bộ lọc để thu hẹp kết quả tìm kiếm theo nhu cầu
                      của bạn
                    </span>
                  </li>
                  <li className="flex items-start gap-2 bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg shadow-sm">
                    <Award className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Đọc kỹ mô tả công việc và yêu cầu trước khi nộp đơn
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main content with job listings */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs and sort options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border-0 backdrop-blur-sm">
              <Tabs
                defaultValue="all"
                className="w-full sm:w-auto"
                onValueChange={setActiveTab}
              >
                <TabsList className="bg-green-100 dark:bg-gray-700 shadow-sm">
                  <TabsTrigger
                    value="all"
                    className="border-0 data-[state=active]:bg-green-600 data-[state=active]:text-white dark:data-[state=active]:bg-green-900 dark:data-[state=active]:text-white"
                  >
                    Tất cả
                  </TabsTrigger>
                  <TabsTrigger
                    value="featured"
                    className="border-0 data-[state=active]:bg-green-600 data-[state=active]:text-white dark:data-[state=active]:bg-green-900 dark:data-[state=active]:text-white"
                  >
                    Việc hot
                  </TabsTrigger>
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
                    <SelectItem value="mostPopular">Phổ biến nhất</SelectItem>
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
                        job.featured
                          ? "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/40 dark:to-emerald-900/40 shadow-lg"
                          : "bg-white dark:bg-gray-800 shadow-md"
                      }`}
                    >
                      {job.featured && (
                        <div className="relative top-0 right-0 p-2">
                          <Badge className="bg-gradient-to-r from-amber-500 to-green-500 text-white border-0 rounded-tl-none rounded-br-none">
                            <Sparkles className="h-3 w-3 mr-1" /> Hot
                          </Badge>
                        </div>
                      )}
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            {job.featured ? (
                              <ColourfulText text={job.title} size="24px"/>
                            ) : (
                              <CardTitle className="text-xl text-green-800 dark:text-green-300 group-hover:text-green-600 transition-colors">
                                {job.title}
                              </CardTitle>
                            )}
                            <p className="text-gray-600 dark:text-gray-400 font-medium">
                              {job.company}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0"
                          >
                            {job.posted}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                          {job.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 mb-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="h-3.5 w-3.5 text-green-500" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <GraduationCap className="h-3.5 w-3.5 text-green-500" />
                            <span>{job.campus}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <Briefcase className="h-3.5 w-3.5 text-green-500" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="h-3.5 w-3.5 text-green-500" />
                            <span>{job.schedule}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <Clock className="h-3.5 w-3.5 text-green-500" />
                            <span className="font-medium text-green-600 dark:text-green-400">
                              {formatHourlyRate(job.hourlyRate)}/giờ
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <BookOpen className="h-3.5 w-3.5 text-green-500" />
                            <span>{job.skillLevel}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {job.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 hover:bg-green-200"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium text-green-600 dark:text-green-400">
                            {job.applicationCount}
                          </span>{" "}
                          sinh viên đã ứng tuyển
                        </div>
                        <Button
                          variant={"default"}
                          className=" group-hover:scale-105 transition-transform"
                        >
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
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
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
                  Vui lòng thử lại với các bộ lọc khác hoặc mở rộng tiêu chí tìm
                  kiếm
                </p>
                <Button
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/30"
                  onClick={() => {
                    setSearchTerm("");
                    setHourlyRateRange([20000, 150000]);
                    setSelectedLocation("");
                    setSelectedCampus("");
                    setSelectedJobType("");
                    setSelectedSchedule("");
                    setSelectedSkillLevel("");
                    setActiveTab("all");
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
                Kết nối sinh viên với công việc bán thời gian thân thiện với môi
                trường
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
  );
}
