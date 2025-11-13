import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface AuthState {
  isAuth: boolean;
}

interface AuthAction {
  login: () => void;
  logout: () => void;
}

export type AuthStoreState = AuthState & AuthAction;

const initState: AuthState = {
  isAuth: false,
};

export const useAuthStore = create(
  subscribeWithSelector<AuthStoreState>((set, get) => ({
    ...initState,
    login: () => {
      set({ isAuth: true });
    },
    logout: () => {
      set({ isAuth: false });
    },
  }))
);
