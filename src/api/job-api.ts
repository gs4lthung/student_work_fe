import api from "@/config/axios-config";
import { JobInterface } from "@/interfaces/job-interface";
import { toast } from "sonner";

export const createJob = async (data: JobInterface) => {
  console.log("Creating job with data:", data);
  const form = new FormData();
  form.append("title", data.title);
  form.append("description", data.description);
  form.append("category", data.category);
  form.append("location", data.location);
  form.append("salary", data.salary.toString());
  form.append("workingHours", data.workingHours.toString());
  form.append("startDate", data.startDate.toISOString());
  form.append("subscriptionID", data.subscriptionID.toString());
  form.append("requirements", data.requirements);
  form.append("status", data.status);
  if (data.imageUrl) {
    form.append("imageUrl", data.imageUrl);
  }
  const url = "/api/Job/create";
  const response = await api.post(url, form, { requiresAuth: true });
  if (response.status === 201) {
    toast.success("Tạo công việc thành công");
    return response.data;
  }
};

export const getJobs = async () => {
  const url = "/api/Job/pagination?pageIndex=1&pageSize=1000";
  const response = await api.get(url);
  if (response.status === 200) {
    console.log("Jobs fetched successfully:", response);
    return response.data.items;
  }
};

export const getJobById = async (id: number) => {
  const url = `/api/Job/getById/${id}`;
  const response = await api.get(url);
  if (response.status === 200) {
    console.log("Job fetched successfully:", response);
    return response.data;
  } else {
    console.error("Failed to fetch job:", response);
    throw new Error("Failed to fetch job");
  }
};
