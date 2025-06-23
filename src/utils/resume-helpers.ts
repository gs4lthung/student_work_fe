/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ResumeAward, ResumeCertificate, ResumeEducation, ResumeExperience, ResumeInterface, ResumeLanguage } from "@/interfaces/resume-interface";

// Helper functions to convert between interface and database string format
export const convertArrayToString = (array: unknown[]): string => {
  return JSON.stringify(array)
}

export const convertStringToArray = <T>(str: string): T[] => {
  try {
    return JSON.parse(str) || [];
  } catch (e) {
    return [];
  }
};

// Convert resume data for API submission
export const prepareResumeForAPI = (resume: ResumeInterface) => {
  return {
    ...resume,
    education: convertArrayToString(resume.education),
    experience: convertArrayToString(resume.experience),
    skills: convertArrayToString(resume.skills),
    languages: convertArrayToString(resume.languages),
    awards: convertArrayToString(resume.awards),
    certificates: convertArrayToString(resume.certificates),
  };
};

// Convert API response back to interface format
export const parseResumeFromAPI = (apiData: any): ResumeInterface => {
  return {
    ...apiData,
    education: convertStringToArray<ResumeEducation>(apiData.education || "[]"),
    experience: convertStringToArray<ResumeExperience>(apiData.experience || "[]"),
    skills: convertStringToArray<string>(apiData.skills || "[]"),
    languages: convertStringToArray<ResumeLanguage>(apiData.languages || "[]"),
    awards: convertStringToArray<ResumeAward>(apiData.awards || "[]"),
    certificates: convertStringToArray<ResumeCertificate>(apiData.certificates || "[]"),
  };
};

// Generate unique IDs for array items
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};
