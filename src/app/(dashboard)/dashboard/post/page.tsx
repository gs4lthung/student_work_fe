"use client";
import {
  JobInterface,
  JobSubcriptionInterface,
} from "@/interfaces/job-interface";

import React from "react";

import { jobConst } from "@/const/job-const";
import JobTable from "@/components/data/tables/job-table";

const jobPosts: JobInterface[] = jobConst.data;
const jobSubscriptions: JobSubcriptionInterface[] = jobConst.subscriptions;

export default function DashboardPost() {
  return <JobTable jobs={jobPosts} jobSubscriptions={jobSubscriptions} />;
}
