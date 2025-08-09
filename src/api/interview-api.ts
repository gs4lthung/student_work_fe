import api from "@/config/axios-config";
import { InterviewInterface } from "@/interfaces/interview-interface";

export const getInterviews = async () => {
  const url = "/api/Interview";
  const response = await api.get(url, {
    requiresAuth: true,
  });
  return response.data;
};

export const getInterviewById = async (interviewID: string) => {
  const url = `/api/Interview/${interviewID}`;
  const response = await api.get(url, {
    requiresAuth: true,
  });
  return response.data;
};

export const getInterviewsByApplicationId = async (applicationID: string) => {
  const url = `/api/Interview/application/${applicationID}`;
  const response = await api.get(url, {
    requiresAuth: true,
  });
  return response.data;
};

export const getInterviewsByEmployerId = async (employerID: string) => {
  const url = `/api/Interview/employer/${employerID}`;
  const response = await api.get(url, {
    requiresAuth: true,
  });
  console.log("Interviews by employer ID response:", response.data);
  return response.data;
};

export const getInterviewsByStudentId = async (studentID: string) => {
  const url = `/api/Interview/student/${studentID}`;
  const response = await api.get(url, {
    requiresAuth: true,
  });
  return response.data;
};

export const createInterview = async (data: InterviewInterface) => {
  const url = "/api/Interview";
  const form = new FormData();
  form.append("applicationID", data.applicationID);
  form.append("scheduledTime", data.scheduledTime.toISOString());
  form.append("duration_minutes", data.duration_minutes.toString());
  form.append("location", data.location);
  form.append("meetingLink", data.meetingLink);
  if (data.note) {
    form.append("note", data.note);
  }
  console.log("Creating interview with data:", data);
  console.log("Form data:", Array.from(form.entries()));

  const response = await api.post(url, form, {
    requiresAuth: true,
  });

  return response.data;
};

export const doneInterview = async (interviewID: number) => {
  const url = `/api/Interview/${interviewID}/status-before`;
  const response = await api.put(
    url,
    {
      newStatus: 1,
    },
    {
      requiresAuth: true,
    }
  );
  return response.data;
};

export const acceptApplicationForInterview = async (interviewID: number) => {
  const url = `/api/Interview/${interviewID}/status`;
  const response = await api.put(
    url,
    {
      newStatus: 2,
    },
    {
      requiresAuth: true,
    }
  );
  return response.data;
};
