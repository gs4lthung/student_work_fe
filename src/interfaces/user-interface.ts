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

export interface StudentInterface extends Omit<UserInterface, "role"> {
  role: "Student";
}

export interface EmployerInterface {
  userId?: string;
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
