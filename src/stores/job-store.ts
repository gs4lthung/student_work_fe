import { JobInterface } from "@/interfaces/job-interface";
import { createPersistentFormStore } from "./persisten-store";

type DraftJobPostStore = Pick<
  JobInterface,
  | "subscriptionId"
  | "title"
  | "category"
  | "description"
  | "requirements"
  | "location"
  | "salary"
  | "workingHours"
  | "startDate"
  | "imageUrl"
>;

export const useDraftJobPostStore =
  createPersistentFormStore<DraftJobPostStore>("draft-job-post-store");
