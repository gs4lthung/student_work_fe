import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

const ContactSection = ({
  email,
  phone,
  address,
  github,
  linkedin,
}: {
  email: string;
  phone: string;
  address: string;
  github: string;
  linkedin: string;
}) => {
  return (
    <>
      <p className="flex flex-row gap-2 items-center text-sm font-semibold text-gray-600">
        <Mail size={15} /> Email: {email}
      </p>
      <p className="flex flex-row gap-2 items-center text-sm font-semibold text-gray-600">
        <Phone size={15} /> Phone: {phone}
      </p>
      <p className="flex flex-row gap-2 items-center text-sm font-semibold text-gray-600">
        <MapPin size={15} /> Address: {address}
      </p>
      <p className="flex flex-row gap-2 items-center text-sm font-semibold text-gray-600">
        <Github size={15} /> Github: {github}
      </p>
      <p className="flex flex-row gap-2 items-center text-sm font-semibold text-gray-600">
        <Linkedin size={15} /> Linkedin: {linkedin}
      </p>
    </>
  );
};

const IntroSection = ({
  name,
  title,
  description,
}: {
  name: string;
  title: string;
  description: string;
}) => {
  return (
    <>
      <TypographyH2 className="text-lg mb-0">{name}</TypographyH2>
      <TypographyH3 className="text-lg mb-0">{title}</TypographyH3>
      <p className="text-sm text-gray-600">{description}</p>
    </>
  );
};

const EducationSection = ({
  university,
  major,
  graduationYear,
  gpa,
}: {
  university: string;
  major: string;
  graduationYear: string;
  gpa: string;
}) => {
  return (
    <>
      <TypographyH3 className="text-lg mb-0">Học vấn</TypographyH3>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center justify-between text-sm font-semibold text-gray-600">
          <p className="text-sm font-semibold text-gray-600">{university}</p>
          <p className="text-sm font-semibold text-gray-600">
            {graduationYear}
          </p>
        </div>
        <p className="text-sm font-semibold text-gray-600">
          Chuyên ngành: {major}
        </p>
        <p className="text-sm font-semibold text-gray-600">GPA: {gpa}</p>
      </div>
    </>
  );
};

const ExperienceSection = ({
  company,
  position,
  duration,
  description,
}: {
  company: string;
  position: string;
  duration: string;
  description: string;
}) => {
  return (
    <>
      <TypographyH3 className="text-lg mb-0">Kinh nghiệm làm việc</TypographyH3>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center justify-between text-sm font-semibold text-gray-600">
          <p className="text-sm font-semibold text-gray-600">{company}</p>
          <p className="text-sm font-semibold text-gray-600">{duration}</p>
        </div>
        <p className="text-sm font-semibold text-gray-600">{position}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </>
  );
};

export default function AddNewCV() {
  return (
    <div className="flex flex-col gap-4 p-12">
      <TypographyH3 className="text-center">Tạo CV mới</TypographyH3>
      <div className="grid grid-cols-10 gap-8 p-12">
        <div className="col-span-6 flex flex-col gap-2">
          <Card className="p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-gray-800">
                <Image
                  src="data:image/jpeg;base64,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"
                  alt="Briefcase"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </CardTitle>
              <CardDescription className="flex flex-col gap-2">
                <ContactSection
                  email={"lamtienhung93@gmail.com"}
                  phone={"0832428279"}
                  address={"Tp. HCM, Viet Nam"}
                  github={"github.com/lamtienhung93"}
                  linkedin={"linkedin.com/in/lamtienhung93"}
                />
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <IntroSection
                name="Lâm Tiên Hưng"
                title="Full-stack Developer"
                description="I am a software engineer with over 5 years of experience in developing web applications. I have a strong background in JavaScript, React, and Node.js. I am passionate about building scalable and maintainable applications."
              />
              <EducationSection
                university={"FPT University"}
                major={"Kỹ thuật phần mềm"}
                graduationYear={"2021 - 2025"}
                gpa={"7.7/10"}
              />
              <ExperienceSection
                company={"FPT Software"}
                position={"Full-stack Developer"}
                duration={"2021 - Present"}
                description="I am responsible for developing and maintaining web applications using React, Node.js, and MongoDB. I also work with the DevOps team to deploy applications on AWS."
              />
            </CardContent>
            <CardFooter className="flex justify-end">ssd</CardFooter>
          </Card>
        </div>
        <div className="col-span-4 m-auto">s</div>
      </div>
    </div>
  );
}
