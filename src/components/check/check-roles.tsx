"use client";

import {
  getEmployerInfoByUserID,
  getStudentInfoByUserID,
} from "@/api/user-api";
import { useUserStore } from "@/stores/user-store";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function CheckRoles() {
  const { user } = useUserStore();
  const [hasHydrated, setHasHydrated] = React.useState(false);

  useEffect(() => {
    if (useUserStore.persist.hasHydrated()) {
      setHasHydrated(true);
    } else {
      const unsub = useUserStore.persist.onHydrate?.(() => {
        setHasHydrated(true);
      });
      return unsub;
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }
    const isChecked = window.localStorage.getItem("isCheckedRoles") === "true";
    console.log("isCheckedRoles:", isChecked);
    if (isChecked) {
      return;
    }
    async function fetchStudentInfo() {
      if (!user) {
        return;
      }
      if (user.employerID || user.studentID) {
        // If user already has employerID or studentID, no need to fetch again
        return;
      }
      window.localStorage.setItem("isCheckedRoles", "true");
      if (user?.role === "Student" && user.userId) {
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
            setTimeout(() => {
              window.location.href = "/dashboard/profile";
            }, 3000);
          }
        } finally {
          window.localStorage.setItem("isCheckedRoles", "true");
        }
      } else if (user?.role === "Employer" && user.userId) {
        try {
          const employer = await getEmployerInfoByUserID(user.userId);
          if (employer) {
            console.log("Employer info fetched:", employer);
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
            setTimeout(() => {
              window.location.href = "/dashboard/profile";
            }, 3000);
          }
        } finally {
          window.localStorage.setItem("isCheckedRoles", "true");
        }
      }
    }
    fetchStudentInfo();
  }, [user, hasHydrated]);
  return <></>;
}
