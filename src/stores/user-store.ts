import {
  EmployerInterface,
  StudentInterface,
  UserInterface,
} from "@/interfaces/user-interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
export type UserStore = Pick<
  UserInterface,
  | "userId"
  | "firstName"
  | "lastName"
  | "userName"
  | "email"
  | "emailConfirmed"
  | "phoneNumber"
  | "role"
  | "avatarUrl"
  | "isActive"
  | "rating"
  | "walletID"
  | "walletBalance"
> &
  Pick<
    StudentInterface,
    "studentID" | "university" | "major" | "yearOfStudy" | "dateOfBirth" | "bio"
  > &
  Pick<
    EmployerInterface,
    | "employerID"
    | "companyName"
    | "companySize"
    | "description"
    | "location"
    | "industry"
    | "website"
    | "logoUrl"
  >;

interface UserState {
  user: UserStore | null;
  setUser: (user: UserStore | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
    }
  )
);
