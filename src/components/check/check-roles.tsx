"use client";

import {
  getEmployerInfoByUserID,
  getStudentInfoByUserID,
} from "@/api/user-api";
import { useUserStore } from "@/stores/user-store";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CheckRoles() {
  const { user } = useUserStore();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    async function fetchStudentInfo() {
      if (!user) return;
      if (user.employerID || user.studentID) {
        // If user already has employerID or studentID, no need to fetch again
        return;
      }
      if (user?.role === "Student" && user.userId && !isChecked) {
        try {
          const student = await getStudentInfoByUserID(user.userId);
          if (student) {
            useUserStore.getState().setUser({
              ...user,
              studentID: student.studentID,
              university: student.university,
              major: student.major,
              yearOfStudy: student.yearOfStudy,
              dateOfBirth: student.dateOfBirth,
              bio: student.bio,
            });
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            toast.info(
              "Vui lòng cập nhật thông tin công ty để sử dụng đầy đủ tính năng"
            );
          }
        } finally {
          setIsChecked(true);
        }
      } else if (user?.role === "Employer" && user.userId) {
        try {
          const employer = await getEmployerInfoByUserID(user.userId);
          if (employer) {
            useUserStore.getState().setUser({
              ...user,
              employerID: employer.employerID,
              companyName: employer.companyName,
              companySize: employer.companySize,
              description: employer.description,
              industry: employer.industry,
              location: employer.location,
              website: employer.website,
              logoUrl: employer.logoUrl,
            });
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            toast.info(
              "Vui lòng cập nhật thông tin công ty để sử dụng đầy đủ tính năng"
            );
          }
        } finally {
          setIsChecked(true);
        }
      }
    }
    fetchStudentInfo();
  }, [isChecked, user]);
  return <></>;
}
