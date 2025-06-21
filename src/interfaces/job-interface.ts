export interface JobInterface {
  jobID?: string;
  employerID?: string;
  subscriptionID: number;
  title: string;
  category: string;
  description: string;
  requirements: string;
  location: string;
  salary: number;
  workingHours: string;
  startDate: Date;
  status: "ACTIVE" | "INACTIVE";
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JobComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  jobId: string;
  text: string;
  rating: number;
  createdAt: Date;
}
