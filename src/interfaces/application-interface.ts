export interface ApplicationInterface {
  stt?: string;
  studentID: string;
  jobID: string;
  resumeID: string;
  coverletter: string;
  status:
    | "PENDING"
    | "APPROVED"
    | "WORKING"
    | "REJECTED"
    | "FINISHED"
    | "DELETE"
    | "INVITED";
  appliedAt?: Date;
  updateAt?: Date;
  studentName?: string;
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
