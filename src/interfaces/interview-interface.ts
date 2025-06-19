export interface InterviewInterface {
  interviewID?: string;
  applicationID: string;
  scheduledTime: Date;
  duration_minutes: number;
  location: string;
  meetingLink: string;
  note?: string;
  status?: "SCHEDULED" | "ACCEPTED" | "REJECTED" | "COMPLETED" | "CANCELED";
  createdAt?: Date;
}
