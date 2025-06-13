export interface JobInterface {
  id?: string;
  employerId?: string;
  subscriptionId?: string;
  title: string;
  category: string;
  description: string;
  requirements: string[];
  location: string;
  salary: number;
  workingHours: string;
  startDate: Date;
  status: "Active" | "Inactive";
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JobSubcriptionInterface {
  id: string;
  name: string;
  descriptions: string;
  price: number;
  duration: number;
  isActive?: boolean;
}

export interface JobComment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  jobId: string
  text: string
  rating: number
  createdAt: Date
}
