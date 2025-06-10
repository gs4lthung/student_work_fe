export interface ApplicationInterface {
  id?: string;
  studentId: string;
  jobId: string;
  resumeId: string;
  coverLetter?: string;
  status: "Pending" | "Accepted" | "Rejected";
  appliedAt: Date;
  updatedAt?: Date;
}
