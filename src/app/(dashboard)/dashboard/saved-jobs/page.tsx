import SavedJobTable from "@/components/data/tables/saved-job-table";
import { jobConst } from "@/const/job-const";
import React from "react";

export default function DashboardSavedJob() {
  return <SavedJobTable jobs={jobConst.data} />;
}
