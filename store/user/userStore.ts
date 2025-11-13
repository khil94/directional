import { User } from "@/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "../auth/authStore";

export const USER_STORE_KEY = "directional-user";
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

export const useUserStore = create(
  persist<UserStoreState>(
    (set, get) => ({
      ...initState,
      login: (data) => {
        set({ user: data });
      },
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: USER_STORE_KEY,
    }
  )
);

useAuthStore.subscribe(
  (state) => state.isAuth,
  (isAuth) => {
    if (!isAuth) {
      useUserStore.getState().logout();
    }
  }
);
