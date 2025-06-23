import api from "@/config/axios-config";
import { ApplicationInterface } from "@/interfaces/application-interface";

export const createApplication = async (data: ApplicationInterface) => {
  const url = "/api/Application";
  const form = new FormData();
  form.append("studentId", data.studentID);
  form.append("jobId", data.jobID);
  form.append("resumeId", data.resumeID);
  form.append("coverletter", data.coverletter);
  form.append("status", data.status);
  if (data?.appliedAt) {
    form.append("appliedAt", data.appliedAt.toISOString());
  }
  if (data?.updateAt) {
    form.append("updatedAt", data.updateAt.toISOString());
  }
  const response = await api.post(url, form, {
    requiresAuth: true,
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Failed to create application");
  }
};

export const getApplicationsByStudent = async (
  pageIndex: number,
  pageSize: number
) => {
  const url = `/api/Application/student/applied-jobs?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  const response = await api.get(url, {
    requiresAuth: true,
  });
  if (response.status === 200) {
    console.log("Applications fetched successfully:", response.data);
    return response.data;
  } else {
    throw new Error("Failed to fetch applications by student");
  }
};

export const getApplicationsByJob = async (
  jobId: number,
  pageIndex: number,
  pageSize: number
) => {
  const url = `/api/Application/employer/jobs/applications?jobId=${jobId}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
  const response = await api.get(url, {
    requiresAuth: true,
  });
  if (response.status === 200) {
    console.log("Applications fetched successfully:", response.data);
    return response.data;
  } else {
    throw new Error("Failed to fetch applications by job");
  }
};

export const updateApplicationStatus = async (
  applicationID: number,
  status: string
) => {
  const url = `/api/Application/${applicationID}`;
  const form = new FormData();
  form.append("status", status);
  form.append("applicationID", applicationID.toString());
  const response = await api.put(url, form, {
    requiresAuth: true,
  });

  if (response.status === 200) {
    console.log("Application status updated successfully:", response.data);
    return response.data;
  } else {
    throw new Error("Failed to update application status");
  }
};
