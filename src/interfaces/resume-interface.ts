import { StudentInterface } from "./user-interface";

export interface ResumeInterface {
  resumeID?: string;
  studentID?: StudentInterface;
  isDefault: boolean;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  jobTitle: string;
  introduction: string;
  education: ResumeEducation[];
  experience: ResumeExperience[];
  skills: string[];
  languages: ResumeLanguage[];
  awards: ResumeAward[];
  certificates: ResumeCertificate[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ResumeEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface ResumeExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface ResumeLanguage {
  id: string;
  name: string;
  level: string;
}

export interface ResumeAward {
  id: string;
  title: string;
  organization: string;
  date: string;
  description?: string;
}

export interface ResumeCertificate {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate: string;
  url?: string;
}
