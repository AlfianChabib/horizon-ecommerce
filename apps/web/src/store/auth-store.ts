import { create } from 'zustand';

interface SessionData {
  name: string;
  userId: number;
  email: string;
  role: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  session: SessionData | null;
  logout: () => void;
  setSession: (data: SessionData) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  session: null,
  logout: () => set({ session: null }),
  setSession: (data: SessionData) => set({ session: data }),
}));
