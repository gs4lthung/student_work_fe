export interface InterviewInterface {
  interviewID?: string;
  applicationID: string;
  scheduledTime: Date;
  duration_minutes: number;
  location: string;
  meetingLink: string;
  note?: string;
  status?: "ACCEPTED" | "REJECTED" | "COMPLETED" | "CANCELED" | "PENDING";
  createdAt?: Date;
  jobTitle?: string;
  studentName?: string;
}
