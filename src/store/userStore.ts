import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAboutMe, loginUser, logout, refreshToken, registerUser } from "../utils/userUtils";
import type { IStatus, IUser, IUserCreds } from "../types";

interface IUserStore {
  user: IUser | null;
  loading: boolean;
  jwtToken: string | undefined;
  refreshJwt: () => Promise<IStatus>;
  refreshJwtNonLoad: () => Promise<IStatus>;
  login: (creds: IUserCreds) => Promise<IStatus>;
  register: (creds: any) => Promise<IStatus>;
  logout: () => Promise<IStatus>;
  fetchUser: () => Promise<IStatus>;
}

const useUserStore = create<IUserStore>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      jwtToken: undefined,
      refreshJwt: async () => {
        set((state) => ({ ...state, loading: true }));
        const res = await refreshToken();
        set((state) => ({ ...state, loading: false }));
        set((state) => ({ ...state, jwtToken: res.data?.accessToken }));
        if (res.type === "success") {
          await get().fetchUser();
        }
        return res;
      },
      refreshJwtNonLoad: async () => {
        const res = await refreshToken();
        set((state) => ({ ...state, jwtToken: res.data?.accessToken }));
        if (res.type === "success") {
          const abt = await getAboutMe();
          if (abt.type === "success") {
            set((state) => ({ ...state, user: abt.data }));
          }
        }
        return res;
      },
      login: async (creds) => {
        set((state) => ({ ...state, loading: true }));
        const res = await loginUser(creds);
        set((state) => ({ ...state, loading: false }));
        set((state) => ({ ...state, jwtToken: res.data?.accessToken }));
        if (res.type === "success") {
          await get().fetchUser();
        }
        return res;
      },
      register: async (creds) => {
        set((state) => ({ ...state, loading: true }));
        const res = await registerUser(creds);
        set((state) => ({ ...state, loading: false }));
        set((state) => ({ ...state, jwtToken: res.data?.accessToken }));
        if (res.type === "success") {
          await get().fetchUser();
        }
        return res;
      },
      fetchUser: async () => {
        set((state) => ({ ...state, loading: true }));
        const res = await getAboutMe();
        set((state) => ({ ...state, loading: false }));
        if (res.type === "success") {
          set((state) => ({ ...state, user: res.data }));
        }
        return res;
      },
      logout: async () => {
        set((state) => ({ ...state, loading: true }));
        const res = await logout();
        set((state) => ({ ...state, loading: false }));
        if (res.type === "success") {
          set((state) => ({ ...state, user: null, jwtToken: undefined }));
        }
        return res;
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        jwtToken: state.jwtToken,
      }),
    }
  )
);

export default useUserStore;
