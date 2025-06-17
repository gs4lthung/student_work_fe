export interface UserInterface {
  userId?: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  emailConfirmed?: boolean;
  phoneNumber: string;
  password: string;
  role: "Student" | "Employer";
  rating?: number;
  avatarUrl?: string;
  isActive?: boolean;
}

export interface StudentInterface {
  studentID?: string;
  role: string | "Student";
  university?: string;
  major?: string;
  yearOfStudy?: number;
  dateOfBirth?: Date;
  bio?: string;
}

export interface EmployerInterface {
  employerID?: string;
  role: string | "Employer";
  companyName: string;
  companySize: number;
  description: string;
  location: string;
  industry: string;
  website: string;
  logoUrl?: string;
}

export type RegisterUser = Pick<
  UserInterface,
  | "firstName"
  | "lastName"
  | "userName"
  | "email"
  | "phoneNumber"
  | "password"
  | "role"
> & {
  confirmPassword?: string;
};

export type LoginUser = Pick<UserInterface, "password"> & {
  usernameOrEmail: string;
};
