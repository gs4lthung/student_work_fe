"use client"

import { getResumeById } from "@/api/resume-api"
import type { ResumeInterface } from "@/interfaces/resume-interface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { use, useEffect, useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Award,
  BadgeIcon as Certificate,
  Languages,
  Download,
  Edit,
  ArrowLeft,
  ExternalLink,
} from "lucide-react"

export default function CVDetails({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = use(params)
  const [cv, setCv] = useState<ResumeInterface | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCv = async (slug: string) => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await getResumeById(Number(slug))
        if (res) {
          setCv(res)
        } else {
          setError("Không tìm thấy CV")
        }
      } catch (err) {
        console.error("Failed to fetch CV:", err)
        setError("Đã xảy ra lỗi khi tải CV")
      } finally {
        setIsLoading(false)
      }
    }

    if (resolvedParams.slug) {
      console.log("Fetching CV with slug:", resolvedParams.slug)
      fetchCv(resolvedParams.slug)
    }
  }, [resolvedParams.slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      month: "long",
      year: "numeric",
    })
  }

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const handleDownload = () => {
    // Implement download functionality
    window.print()
  }

  const handleEdit = () => {
    window.location.href = `/resume/edit/${resolvedParams.slug}`
  }

  const handleBack = () => {
    window.history.back()
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !cv) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="flex flex-col items-center p-8">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-xl font-semibold mb-2">{error || "Không tìm thấy CV"}</h2>
            <p className="text-muted-foreground mb-4 text-center">CV bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Button onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 print:p-0">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Chỉnh sửa
          </Button>
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Tải xuống
          </Button>
        </div>
      </div>

      {/* CV Content */}
      <div className="bg-white print:shadow-none">
        {/* Header Section */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{cv.fullName}</h1>
              <h2 className="text-xl text-gray-600 mb-4">{cv.jobTitle}</h2>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {cv.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {cv.phoneNumber}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {cv.address}
                </div>
              </div>
            </div>

            {cv.introduction && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Giới thiệu</h3>
                <p className="text-gray-700 leading-relaxed">{cv.introduction}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Experience Section */}
        {cv.experience && cv.experience.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Kinh nghiệm làm việc
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {cv.experience.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    {index !== cv.experience.length - 1 && (
                      <div className="absolute left-0 top-8 bottom-0 w-px bg-gray-200" />
                    )}
                    <div className="flex gap-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 relative z-10" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                            <p className="text-blue-600 font-medium">{exp.company}</p>
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(exp.startDate)} - {exp.current ? "Hiện tại" : formatDate(exp.endDate)}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Education Section */}
        {cv.education && cv.education.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Học vấn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cv.education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-blue-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {edu.degree} - {edu.field}
                        </h4>
                        <p className="text-blue-600">{edu.institution}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                    </div>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Skills Section */}
        {cv.skills && cv.skills.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Kỹ năng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {cv.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Languages Section */}
        {cv.languages && cv.languages.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Ngôn ngữ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cv.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="font-medium">{lang.name}</span>
                    <Badge variant="outline">{lang.level}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Certificates Section */}
        {cv.certificates && cv.certificates.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Certificate className="h-5 w-5" />
                Chứng chỉ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cv.certificates.map((cert) => (
                  <div key={cert.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          {cert.name}
                          {cert.url && (
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </h4>
                        <p className="text-blue-600">{cert.organization}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatFullDate(cert.issueDate)} - {formatFullDate(cert.expiryDate)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Awards Section */}
        {cv.awards && cv.awards.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Giải thưởng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cv.awards.map((award) => (
                  <div key={award.id} className="border-l-2 border-yellow-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{award.title}</h4>
                        <p className="text-yellow-600">{award.organization}</p>
                      </div>
                      <div className="text-sm text-gray-500">{formatFullDate(award.date)}</div>
                    </div>
                    {award.description && <p className="text-gray-700 text-sm">{award.description}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8 print:hidden">
          <p>CV được tạo vào {formatFullDate(cv.createdAt!)}</p>
          {cv.updatedAt && cv.updatedAt !== cv.createdAt && <p>Cập nhật lần cuối: {formatFullDate(cv.updatedAt)}</p>}
        </div>
      </div>
    </div>
  )
}
