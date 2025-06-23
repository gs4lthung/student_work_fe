"use client";

import type React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { generateId } from "@/utils/resume-helpers";
import {
  ResumeEducation,
  ResumeExperience,
} from "@/interfaces/resume-interface";

interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  address: string;
  introduction: string;
}

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  onChange: (field: string, value: string) => void;
}

export function PersonalInfoSection({
  personalInfo,
  onChange,
}: PersonalInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin cá nhân</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Họ và tên *</Label>
            <Input
              id="fullName"
              value={personalInfo.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              placeholder="Nguyễn Văn A"
            />
          </div>
          <div>
            <Label htmlFor="jobTitle">Vị trí mong muốn *</Label>
            <Input
              id="jobTitle"
              value={personalInfo.jobTitle}
              onChange={(e) => onChange("jobTitle", e.target.value)}
              placeholder="Frontend Developer"
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="example@email.com"
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Số điện thoại *</Label>
            <Input
              id="phoneNumber"
              value={personalInfo.phoneNumber}
              onChange={(e) => onChange("phoneNumber", e.target.value)}
              placeholder="0123456789"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            id="address"
            value={personalInfo.address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh"
          />
        </div>
        <div>
          <Label htmlFor="introduction">Giới thiệu bản thân</Label>
          <Textarea
            id="introduction"
            value={personalInfo.introduction}
            onChange={(e) => onChange("introduction", e.target.value)}
            placeholder="Mô tả ngắn gọn về bản thân, kinh nghiệm và mục tiêu nghề nghiệp..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface EducationSectionProps {
  education: ResumeEducation[];
  onChange: (education: ResumeEducation[]) => void;
}

export function EducationSection({
  education,
  onChange,
}: EducationSectionProps) {
  const addEducation = () => {
    const newEducation: ResumeEducation = {
      id: generateId(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    };
    onChange([...education, newEducation]);
  };

  const updateEducation = (
    index: number,
    field: keyof ResumeEducation,
    value: string
  ) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Học vấn</CardTitle>
        <Button onClick={addEducation} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Thêm học vấn
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.map((edu, index) => (
          <div key={edu.id} className="border rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => removeEducation(index)}
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Trường/Đại học *</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  placeholder="Đại học ABC"
                />
              </div>
              <div>
                <Label>Bằng cấp *</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  placeholder="Cử nhân"
                />
              </div>
              <div>
                <Label>Chuyên ngành *</Label>
                <Input
                  value={edu.field}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  placeholder="Công nghệ thông tin"
                />
              </div>
              <div>
                <Label>GPA</Label>
                <Input
                  value={edu.gpa || ""}
                  onChange={(e) =>
                    updateEducation(index, "gpa", e.target.value)
                  }
                  placeholder="3.5/4.0"
                />
              </div>
              <div>
                <Label>Ngày bắt đầu *</Label>
                <Input
                  type="date"
                  value={edu.startDate}
                  onChange={(e) =>
                    updateEducation(index, "startDate", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Ngày kết thúc *</Label>
                <Input
                  type="date"
                  value={edu.endDate}
                  onChange={(e) =>
                    updateEducation(index, "endDate", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
        {education.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Chưa có thông tin học vấn.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface ExperienceSectionProps {
  experience: ResumeExperience[];
  onChange: (experience: ResumeExperience[]) => void;
}

export function ExperienceSection({
  experience,
  onChange,
}: ExperienceSectionProps) {
  const addExperience = () => {
    const newExperience: ResumeExperience = {
      id: generateId(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    onChange([...experience, newExperience]);
  };

  const updateExperience = (
    index: number,
    field: keyof ResumeExperience,
    value: string | boolean
  ) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeExperience = (index: number) => {
    onChange(experience.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Kinh nghiệm làm việc</CardTitle>
        <Button onClick={addExperience} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Thêm kinh nghiệm
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {experience.map((exp, index) => (
          <div key={exp.id} className="border rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => removeExperience(index)}
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Công ty *</Label>
                <Input
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  placeholder="Công ty ABC"
                />
              </div>
              <div>
                <Label>Vị trí *</Label>
                <Input
                  value={exp.position}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  placeholder="Frontend Developer"
                />
              </div>
              <div>
                <Label>Ngày bắt đầu *</Label>
                <Input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(index, "startDate", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Ngày kết thúc</Label>
                <Input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) =>
                    updateExperience(index, "endDate", e.target.value)
                  }
                  disabled={exp.current}
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) =>
                    updateExperience(index, "current", checked as boolean)
                  }
                />
                <Label htmlFor={`current-${exp.id}`}>
                  Đang làm việc tại đây
                </Label>
              </div>
              <Label>Mô tả công việc</Label>
              <Textarea
                value={exp.description}
                onChange={(e) =>
                  updateExperience(index, "description", e.target.value)
                }
                placeholder="Mô tả chi tiết về công việc, trách nhiệm và thành tích..."
                rows={3}
              />
            </div>
          </div>
        ))}
        {experience.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Chưa có kinh nghiệm làm việc.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface SkillsSectionProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export function SkillsSection({ skills, onChange }: SkillsSectionProps) {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kỹ năng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập kỹ năng (VD: JavaScript, React, Node.js...)"
          />
          <Button onClick={addSkill}>Thêm</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => removeSkill(skill)}
            >
              {skill}
              <X />
            </Badge>
          ))}
        </div>
        {skills.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            Chưa có kỹ năng nào. Thêm kỹ năng để hoàn thiện CV.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
