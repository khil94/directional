import { create } from "zustand";

export const USER_STORE_KEY = "directional-user-data";

export interface UserState {
  isLoggedIn: boolean;
}

interface UserAction {
  login: () => void;
  logout: () => void;
}

export type UserStoreState = UserAction & UserState;

const initState: UserState = {
  isLoggedIn: false,
};

export const useUserStore = create<UserStoreState>((set, get) => ({
  ...initState,
  login: () => {
    set({ isLoggedIn: true });
  },
  logout: () => {
    set({ isLoggedIn: false });
  },
}));
