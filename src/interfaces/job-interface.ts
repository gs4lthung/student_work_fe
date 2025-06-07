import { EmployerInterface } from "./user-interface";

export interface JobInterface {
  id: string;
  employer?: EmployerInterface;
  subscription?: JobSubcriptionInterface;
  title: string;
  type: string;
  description: string;
  requirements: string[];
  location: string;
  salary: number;
  workingHours: string;
  startDate: Date;
  endDate: Date;
  status: string;
  imageUrl?: string;
}

export interface JobSubcriptionInterface {
  id: string;
  name: string;
  descriptions: string;
  price: number;
  duration: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
