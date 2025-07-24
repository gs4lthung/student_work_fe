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

export const updateJob = async (data: JobInterface) => {
  console.log("Updating job with data:", data);
  const form = new FormData();
  if (data.imageUrl) {
    console.log("Appending image URL for update:", data.imageUrl);
    form.append("image", data.imageUrl);
  }
  if (data.title) {
    form.append("title", data.title);
  }
  if (data.description) {
    form.append("description", data.description);
  }
  if (data.category) {
    form.append("category", data.category);
  }
  if (data.location) {
    form.append("location", data.location);
  }
  if (data.salary) {
    form.append("salary", data.salary.toString());
  }
  if (data.workingHours) {
    form.append("workingHours", data.workingHours.toString());
  }
  if (data.startDate) {
    form.append("startDate", data.startDate.toISOString());
  }
  if (data.subscriptionID) {
    form.append("subscriptionID", data.subscriptionID.toString());
  }
  if (data.requirements) {
    form.append("requirements", data.requirements);
  }
  if (data.status) {
    form.append("status", data.status);
  }
  if (data.jobID) {
    form.append("jobID", data.jobID.toString());
  }
  const url = `/api/Jobs/update/${data.jobID}`;
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
