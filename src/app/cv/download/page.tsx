"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CvDownloadPage() {
  const searchParams = useSearchParams();
  const [cvData, setCvData] = useState(null);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setCvData(parsed);
        setTimeout(() => {
          window.print();
        }, 1000);
      } catch (err) {
        console.error("Invalid JSON:", err);
      }
    }
  }, [searchParams]);

  if (!cvData) {
    return <p>Loading...</p>;
  }
  return (
    <div className="bg-white p-8 shadow-lg max-w-2xl mx-auto print:shadow-none print:p-0 print:max-w-full">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {cvData.personalInfo.fullName || "Họ và tên"}
        </h1>
        <div className="text-gray-600 space-y-1">
          {cvData.personalInfo.email && <p>{cvData.personalInfo.email}</p>}
          {cvData.personalInfo.phone && <p>{cvData.personalInfo.phone}</p>}
          {cvData.personalInfo.location && (
            <p>{cvData.personalInfo.location}</p>
          )}
          {cvData.personalInfo.website && <p>{cvData.personalInfo.website}</p>}
        </div>
      </div>

      {/* Summary */}
      {cvData.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">
            Mô tả bản thân
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {cvData.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {cvData.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Kinh nghiệm làm việc
          </h2>
          <div className="space-y-4">
            {cvData.workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {exp.position || "Position"}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate &&
                      new Date(exp.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}{" "}
                    -{" "}
                    {exp.current
                      ? "Present"
                      : exp.endDate &&
                        new Date(exp.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                  </span>
                </div>
                <p className="text-gray-700 font-medium mb-2">
                  {exp.company || "Company"}
                </p>
                {exp.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Học tập
          </h2>
          <div className="space-y-3">
            {cvData.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree || "Trình độ"}{" "}
                    {edu.field && `ngành ${edu.field}`}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate &&
                      new Date(edu.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}{" "}
                    -{" "}
                    {edu.endDate &&
                      new Date(edu.endDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                  </span>
                </div>
                <p className="text-gray-700">
                  {edu.institution || "Trương đại học"}
                </p>
                {edu.gpa && (
                  <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Kỹ năng
          </h2>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill) => (
              <span
                key={skill}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
