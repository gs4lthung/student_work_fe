import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersistentFormState<T> {
  data: T | null;
  setData: (data: T | null) => void;
  clearData: () => void;
}

export function createPersistentFormStore<T>(name: string) {
  return create<PersistentFormState<T>>()(
    persist(
      (set) => ({
        data: null,
        setData: (data) => set({ data }),
        clearData: () => set({ data: null }),
      }),
      { name }
    )
  );
}
