import { UserInterface } from "@/interfaces/user-interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";
type UserStore = Pick<
  UserInterface,
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
    }
  )
);
