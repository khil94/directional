import { User } from "@/types/auth";
import { create } from "zustand";
import { useAuthStore } from "../auth/authStore";

export interface UserState {
  user: User | null;
}

interface UserAction {
  login: (data: User) => void;
  logout: () => void;
}

export type UserStoreState = UserAction & UserState;

const initState: UserState = {
  user: null,
};

export const useUserStore = create<UserStoreState>((set, get) => ({
  ...initState,
  login: (data) => {
    set({ user: data });
  },
  logout: () => {
    set({ user: null });
  },
}));

useAuthStore.subscribe(
  (state) => state.isAuth,
  (isAuth) => {
    if (!isAuth) {
      useUserStore.getState().logout();
    }
  }
);
