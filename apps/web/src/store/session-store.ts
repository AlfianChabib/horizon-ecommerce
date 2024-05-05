import { createStore } from 'zustand/vanilla';

export type SessionData = {
  name: string;
  userId: number;
  email: string;
  role: string;
};

export type SessionState = {
  isAuthenticated: boolean;
  session: SessionData | null;
};

export type SessionActions = {
  logout: () => void;
  setSession: (data: SessionData) => void;
};

export type SessionStore = SessionState & SessionActions;

export const defaultSessionState: SessionState = {
  isAuthenticated: false,
  session: null,
};

export const createSessionStore = (initialState: SessionState = defaultSessionState) => {
  return createStore<SessionStore>((set) => ({
    ...initialState,
    logout: () => set({ session: null }),
    setSession: (data: SessionData) => set({ session: data }),
  }));
};

const useAuthStore = createSessionStore().getState();

const { isAuthenticated, session, logout, setSession } = useAuthStore;
