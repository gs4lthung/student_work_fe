import api from "@/config/axios-config";

export const savedJob = async (studentID: number, jobID: number) => {
  const url = `/api/JobBookMark/create`;

  const form=new FormData();
  form.append("studentID", studentID.toString());
  form.append("jobID", jobID.toString());
  form.append("createdAt", new Date().toISOString());

  const response = await api.post(url, form, { requiresAuth: true });

  if (response) {
    return response.data;
  }
};

export const getSavedJobs = async (pageIndex: string, pageSize: string) => {
  const url = `/api/JobBookMark/student/bookmark-job?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  const response = await api.get(url, { requiresAuth: true });
  if (response) {
    return response.data;
  }
};
