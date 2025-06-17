"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, Eye, FileText } from "lucide-react";
import { ResumeInterface } from "@/interfaces/resume-interface";
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
    } catch (error) {
      toast.error("Không thể tạo CV. Vui lòng thử lại.");
      console.error("Error creating resume:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sections = [
    { id: "personal", label: "Thông tin cá nhân", icon: FileText },
    { id: "education", label: "Học vấn", icon: FileText },
    { id: "experience", label: "Kinh nghiệm", icon: FileText },
    { id: "skills", label: "Kỹ năng", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tạo CV mới</h1>
          <p className="text-gray-600">
            Điền thông tin để tạo CV chuyên nghiệp của bạn
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Các mục CV</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection(section.id)}
                  >
                    <section.icon className="w-4 h-4 mr-2" />
                    {section.label}
                  </Button>
                ))}

                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2">
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
                    <label htmlFor="isDefault" className="text-sm">
                      Đặt làm CV mặc định
                    </label>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="w-full"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Đang lưu..." : "Lưu CV"}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Xem trước
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {activeSection === "personal" && (
              <PersonalInfoSection
                personalInfo={{
                  fullName: resumeData.fullName,
                  email: resumeData.email,
                  phoneNumber: resumeData.phoneNumber,
                  address: resumeData.address,
                  jobTitle: resumeData.jobTitle,
                  introduction: resumeData.introduction,
                }}
                onChange={(field, value) => updatePersonalInfo(field, value)}
              />
            )}

            {activeSection === "education" && (
              <EducationSection
                education={resumeData.education}
                onChange={(education) =>
                  setResumeData((prev) => ({ ...prev, education }))
                }
              />
            )}

            {activeSection === "experience" && (
              <ExperienceSection
                experience={resumeData.experience}
                onChange={(experience) =>
                  setResumeData((prev) => ({ ...prev, experience }))
                }
              />
            )}

            {activeSection === "skills" && (
              <SkillsSection
                skills={resumeData.skills}
                onChange={(skills) =>
                  setResumeData((prev) => ({ ...prev, skills }))
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
