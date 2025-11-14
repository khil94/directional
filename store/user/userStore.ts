import { API } from "@/app/api/lib/clientAPI";
import { User } from "@/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const USER_STORE_KEY = "directional-user";
export interface UserState {
  user: User | null;
}

interface UserAction {
  login: (data: User) => void;
  logout: () => Promise<void>;
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
      logout: async () => {
        await API.postLogout();
        set({ user: null });
      },
    }),
    {
      name: USER_STORE_KEY,
    }
  )
);
