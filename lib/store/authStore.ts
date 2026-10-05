import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: User;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

const initialUser: User = {
  _id: "",
  name: "",
  avatarUrl: "",
  articlesAmount: 0,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => {
      return {
        user: initialUser,
        isAuthenticated: false,
        setUser: (user) => set({ user, isAuthenticated: true }),
        clearIsAuthenticated: () =>
          set({ user: initialUser, isAuthenticated: false }),
      };
    },
    {
      name: "authentication",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
