import { create } from "zustand";
import { persist } from "zustand/middleware";

export const USER_STORE_KEY = "directional-user-data";

export interface UserState {
  isLoggedIn: boolean;
  token: string | null;
}

interface UserAction {
  login: (val: string) => void;
  logout: () => void;
}

export type UserStoreState = UserAction & UserState;

const initState: UserState = {
  isLoggedIn: false,
  token: null,
};

export const useUserStore = create(
  persist<UserStoreState>(
    (set, get) => ({
      ...initState,
      login: (token: string) => {
        set({ isLoggedIn: true, token });
      },
      logout: () => {
        set({ isLoggedIn: false, token: null });
      },
    }),
    {
      name: USER_STORE_KEY,
    }
  )
);
