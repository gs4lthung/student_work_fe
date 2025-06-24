import api from "@/config/axios-config";
import { JobInterface } from "@/interfaces/job-interface";

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
    console.log("Appending image URL:", data.imageUrl);
    form.append("image", data.imageUrl);
  }
  const url = "/api/Jobs/create";
  const response = await api.post(url, form, { requiresAuth: true });
  if (response) {
    return response.data;
  }
};

export const getJobs = async (
  pageIndex: number,
  pageSize: number,
  title: string,
  category: string,
  location: string,
  minSalary: number,
  max: number
) => {
  const url = `/api/Jobs/search?pageIndex=${pageIndex}&pageSize=${pageSize}&title=${encodeURIComponent(
    title
  )}&category=${encodeURIComponent(category)}&location=${encodeURIComponent(
    location
  )}&minSalary=${minSalary}&maxSalary=${max} `;
  const response = await api.get(url);
  if (response.status === 200) {
    return response.data;
  }
};

export const getJobById = async (id: number) => {
  const url = `/api/Jobs/getById/${id}`;
  const response = await api.get(url);
  if (response.status === 200) {
    console.log("Job fetched successfully:", response);
    return response.data;
  } else {
    console.error("Failed to fetch job:", response);
    throw new Error("Failed to fetch job");
  }
};

export const getJobByEmployerId = async (
  pageIndex: number,
  pageSize: number
) => {
  const url = `/api/Jobs/employer-jobs?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  const response = await api.get(url, { requiresAuth: true });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to fetch jobs by employer ID");
};
