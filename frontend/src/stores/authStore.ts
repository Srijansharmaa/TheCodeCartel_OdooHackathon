import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiService } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user: User, token: string) => {
        apiService.setToken(token);
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },
      logout: () => {
        apiService.clearToken();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
      updateUser: (user: User) =>
        set((state) => ({
          ...state,
          user,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
); 