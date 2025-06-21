"use client";

import { getInterviewsByEmployerId } from "@/api/interview-api";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InterviewInterface } from "@/interfaces/interview-interface";
import { useUserStore } from "@/stores/user-store";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function InterviewPage() {
  const [interviews, setInterviews] = useState<InterviewInterface[]>([]);

  const { user } = useUserStore();
  useEffect(() => {
    const fetchInterviews = async () => {
      if (user?.role === "Employer" && user.employerID) {
        const res = await getInterviewsByEmployerId(user.employerID);
        setInterviews(res.result);
      }
    };
    fetchInterviews();
  }, [user]);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tên công việc</TableHead>
          <TableHead>Lịch phỏng vấn</TableHead>
          <TableHead>Địa điểm hẹn</TableHead>
          <TableHead>Thời gian phỏng vấn</TableHead>
          <TableHead>Link trực tuyến</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {interviews.length > 0 ? (
          interviews.map((interview) => (
            <TableRow key={interview.interviewID}>
              <TableHead className="font-semibold">{interview.jobTitle}</TableHead>
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
