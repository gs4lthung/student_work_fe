export interface ApplicationInterface {
  stt?: string;
  studentID: string;
  jobID: string;
  resumeID: string;
  coverletter: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  appliedAt?: Date;
  updateAt?: Date;
}

export type StudentApplicationResType = Pick<
  ApplicationInterface,
  | "stt"
  | "resumeID"
  | "coverletter"
  | "status"
  | "appliedAt"
  | "updateAt"
  | "jobID"
> & {
  jobName: string;
  studentName: string;
};
