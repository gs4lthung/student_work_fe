"use client";

import {
  getInterviewsByEmployerId,
  getInterviewsByStudentId,
} from "@/api/interview-api";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InterviewInterface } from "@/interfaces/interview-interface";
import { UserStore, useUserStore } from "@/stores/user-store";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function InterviewPage() {
  const [interviews, setInterviews] = useState<InterviewInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useUserStore();
  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchInterviews = async () => {
      setLoading(true);
      console.log("Fetching interviews for user:", user);
      if (user?.role === "Employer" && user.employerID) {
        const res = await getInterviewsByEmployerId(user.employerID);
        console.log(res);
        setInterviews(res.result);
      } else if (user?.role === "Student" && user.studentID) {
        console.log("Fetching interviews for student ID:", user.studentID);
        const res = await getInterviewsByStudentId(user.studentID);
        setInterviews(res.result);
      }
      setLoading(false);
    };
    fetchInterviews();
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Lịch phỏng vấn</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        user && <InterviewTable user={user} interviews={interviews} />
      )}
    </div>
  );
}
function InterviewTable({
  user,
  interviews,
}: {
  user: UserStore;
  interviews: InterviewInterface[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tên công việc</TableHead>
          <TableHead>Lịch phỏng vấn</TableHead>
          <TableHead>Địa điểm hẹn</TableHead>
          <TableHead>Thời gian phỏng vấn</TableHead>
          <TableHead>Link trực tuyến</TableHead>
          {user.role === "Employer" && <TableHead>Ứng viên</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {interviews.length > 0 ? (
          interviews.map((interview) => (
            <TableRow key={interview.interviewID}>
              <TableHead className="font-semibold">
                {interview.jobTitle}
              </TableHead>
              <TableHead>
                {new Date(interview.scheduledTime).toLocaleDateString("vi-VN")}{" "}
                -{" "}
                {new Date(interview.scheduledTime).toLocaleTimeString("vi-VN")}
              </TableHead>
              <TableHead>{interview.location}</TableHead>
              <TableHead>{interview.duration_minutes} phút</TableHead>
              <TableHead>
                {interview.meetingLink ? (
                  <Link
                    href={interview.meetingLink}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    {interview.meetingLink}
                  </Link>
                ) : (
                  "Không có"
                )}
              </TableHead>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableHead colSpan={6} className="text-center">
              Không có lịch phỏng vấn nào
            </TableHead>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
