"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Save,
  Eye,
  User,
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle,
} from "lucide-react";
import type { ResumeInterface } from "@/interfaces/resume-interface";
import { toast } from "sonner";
import {
  EducationSection,
  ExperienceSection,
  PersonalInfoSection,
  SkillsSection,
} from "@/components/page/forms/resume-form-sections";
import { useUserStore } from "@/stores/user-store";
import { createResume } from "@/api/resume-api";

export default function CreateResumePage() {
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");

  const [resumeData, setResumeData] = useState<ResumeInterface>({
    isDefault: false,
    fullName: user?.firstName + " " + user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    address: "",
    jobTitle: "",
    introduction: user?.bio || "",
    education: user?.studentID
      ? [
          {
            id: "",
            institution: user?.university || "",
            degree: "",
            field: user?.major || "",
            startDate: "",
            endDate: "",
            gpa: "",
          },
        ]
      : [],
    experience: [],
    skills: [],
    languages: [],
    awards: [],
    certificates: [],
  });

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!resumeData.fullName.trim()) {
      toast.error("Vui lòng nhập họ tên");
      return false;
    }

    if (!resumeData.email.trim()) {
      toast.error("Vui lòng nhập email");
      return false;
    }

    if (!resumeData.phoneNumber.trim()) {
      toast.error("Vui lòng nhập số điện thoại");
      return false;
    }

    if (!resumeData.jobTitle.trim()) {
      toast.error("Vui lòng nhập vị trí mong muốn");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log("Saving resume data:", resumeData);
      const result = await createResume(user?.studentID || "", resumeData);
      toast.success("CV đã được tạo thành công");
      console.log("Created resume:", result);
      setTimeout(() => {
        window.location.href = `/cv`;
      }, 2000);
    } catch (error) {
      toast.error("Không thể tạo CV. Vui lòng thử lại.");
      console.error("Error creating resume:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sections = [
    {
      id: "personal",
      label: "Thông tin cá nhân",
      icon: User,
      description: "Họ tên, liên hệ, giới thiệu",
      completed: !!(
        resumeData.fullName &&
        resumeData.email &&
        resumeData.phoneNumber
      ),
    },
    {
      id: "education",
      label: "Học vấn",
      icon: GraduationCap,
      description: "Trình độ học vấn, bằng cấp",
      completed: resumeData.education.length > 0,
    },
    {
      id: "experience",
      label: "Kinh nghiệm",
      icon: Briefcase,
      description: "Kinh nghiệm làm việc",
      completed: resumeData.experience.length > 0,
    },
    {
      id: "skills",
      label: "Kỹ năng",
      icon: Award,
      description: "Kỹ năng chuyên môn",
      completed: resumeData.skills.length > 0,
    },
  ];

  const completedSections = sections.filter(
    (section) => section.completed
  ).length;
  const progressPercentage = (completedSections / sections.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Enhanced Header */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Tạo CV chuyên nghiệp
              </h1>
              <p className="text-gray-600 text-lg">
                Xây dựng CV ấn tượng để chinh phục nhà tuyển dụng
              </p>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Tiến độ hoàn thành
                </span>
                <Badge
                  variant={
                    completedSections === sections.length
                      ? "default"
                      : "secondary"
                  }
                >
                  {completedSections}/{sections.length}
                </Badge>
              </div>
              <Progress value={progressPercentage} className="w-48" />
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Enhanced Mobile Navigation */}
          <div className="xl:hidden">
            <Card className="mb-6 shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sections.map((section) => (
                    <Button
                      key={section.id}
                      variant={
                        activeSection === section.id ? "default" : "outline"
                      }
                      className={`h-auto p-4 justify-start ${
                        activeSection === section.id
                          ? "bg-green-600 hover:bg-green-700 shadow-md"
                          : "hover:bg-green-50 border-gray-200"
                      }`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <section.icon className="w-5 h-5" />
                          {section.completed && (
                            <CheckCircle className="w-3 h-3 text-green-500 absolute -top-1 -right-1 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-sm">
                            {section.label}
                          </div>
                          <div className="text-xs opacity-70">
                            {section.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Desktop Sidebar */}
          <div className="hidden xl:block w-80 flex-shrink-0">
            <div className="sticky top-6 space-y-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Các mục CV
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>
                      Hoàn thành: {completedSections}/{sections.length}
                    </span>
                    <Progress value={progressPercentage} className="flex-1" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {sections.map((section) => (
                    <Button
                      key={section.id}
                      variant={
                        activeSection === section.id ? "default" : "ghost"
                      }
                      className={`w-full justify-start h-auto p-4 ${
                        activeSection === section.id
                          ? "bg-green-600 hover:bg-green-700 shadow-md"
                          : "hover:bg-green-50"
                      }`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="relative">
                          <section.icon className="w-5 h-5" />
                          {section.completed && (
                            <CheckCircle className="w-3 h-3 text-green-500 absolute -top-1 -right-1 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="text-left flex-1">
                          <div className="font-medium">{section.label}</div>
                          <div className="text-xs opacity-70">
                            {section.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Enhanced Settings Card */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold">
                    Cài đặt CV
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                    <Checkbox
                      id="isDefault"
                      checked={resumeData.isDefault}
                      onCheckedChange={(checked) =>
                        setResumeData((prev) => ({
                          ...prev,
                          isDefault: checked as boolean,
                        }))
                      }
                    />
                    <div>
                      <label
                        htmlFor="isDefault"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Đặt làm CV mặc định
                      </label>
                      <p className="text-xs text-gray-500">
                        CV này sẽ được sử dụng khi ứng tuyển
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="w-full h-12 bg-green-600 hover:bg-green-700 shadow-md"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? "Đang lưu..." : "Lưu CV"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-12 border-gray-200 hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Xem trước CV
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="flex-1 space-y-6">
            {/* Mobile Action Card */}
            <div className="xl:hidden">
              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="isDefault-mobile"
                        checked={resumeData.isDefault}
                        onCheckedChange={(checked) =>
                          setResumeData((prev) => ({
                            ...prev,
                            isDefault: checked as boolean,
                          }))
                        }
                      />
                      <div>
                        <label
                          htmlFor="isDefault-mobile"
                          className="text-sm font-medium cursor-pointer"
                        >
                          Đặt làm CV mặc định
                        </label>
                        <p className="text-xs text-gray-500">
                          Sử dụng khi ứng tuyển
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex-1 h-12 bg-green-600 hover:bg-green-700 shadow-md"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? "Đang lưu..." : "Lưu CV"}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 h-12 border-gray-200 hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Xem trước
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section Content with Enhanced Styling */}
            <div className="space-y-6">
              {activeSection === "personal" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <User className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Thông tin cá nhân
                      </h2>
                      <p className="text-gray-600">
                        Điền thông tin liên hệ và giới thiệu bản thân
                      </p>
                    </div>
                  </div>
                  <PersonalInfoSection
                    personalInfo={{
                      fullName: resumeData.fullName,
                      email: resumeData.email,
                      phoneNumber: resumeData.phoneNumber,
                      address: resumeData.address,
                      jobTitle: resumeData.jobTitle,
                      introduction: resumeData.introduction,
                    }}
                    onChange={(field, value) =>
                      updatePersonalInfo(field, value)
                    }
                  />
                </div>
              )}

              {activeSection === "education" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Học vấn
                      </h2>
                      <p className="text-gray-600">
                        Thêm thông tin về trình độ học vấn và bằng cấp
                      </p>
                    </div>
                  </div>
                  <EducationSection
                    education={resumeData.education}
                    onChange={(education) =>
                      setResumeData((prev) => ({ ...prev, education }))
                    }
                  />
                </div>
              )}

              {activeSection === "experience" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Briefcase className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Kinh nghiệm làm việc
                      </h2>
                      <p className="text-gray-600">
                        Mô tả kinh nghiệm và thành tích trong công việc
                      </p>
                    </div>
                  </div>
                  <ExperienceSection
                    experience={resumeData.experience}
                    onChange={(experience) =>
                      setResumeData((prev) => ({ ...prev, experience }))
                    }
                  />
                </div>
              )}

              {activeSection === "skills" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Kỹ năng
                      </h2>
                      <p className="text-gray-600">
                        Liệt kê các kỹ năng chuyên môn và mềm
                      </p>
                    </div>
                  </div>
                  <SkillsSection
                    skills={resumeData.skills}
                    onChange={(skills) =>
                      setResumeData((prev) => ({ ...prev, skills }))
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
