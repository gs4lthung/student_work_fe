import api from "@/config/axios-config";
import { ResumeInterface } from "@/interfaces/resume-interface";
import {
  parseResumeFromAPI,
  prepareResumeForAPI,
} from "@/utils/resume-helpers";

export const searchResumes = async (
  studentId: string,
  pageIndex: number,
  pageSize: number
) => {
  const url = `/api/Resumes/search?studentId=${studentId}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
  const response = await api.get(url);
  if (response.status === 200) {
    console.log("Fetched resumes:", response.data);
    return response.data.items.map((item: unknown) => parseResumeFromAPI(item));
  } else {
    throw new Error("Failed to fetch resumes");
  }
};

export const getResumeById = async (id: number) => {
  const url = `/api/Resumes/${id}`;
  const response = await api.get(url);
  if (response.status === 200) {
    console.log("Fetched resume by ID:", response.data);
    return parseResumeFromAPI(response.data);
  } else {
    throw new Error("Failed to fetch resume by ID");
  }
};

export const createResume = async (
  studentId: string,
  data: ResumeInterface
) => {
  const url = "/api/Resumes/create";
  const requestData = prepareResumeForAPI(data);

  console.log("Prepared resume data for API:", requestData);

  const response = await api.post(url, {
    ...requestData,
    studentId: studentId,
    fileUrl: "content",
    resumeType: "content",
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Failed to create resume");
  }
};
