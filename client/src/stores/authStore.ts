import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true,

      login: async (email: string, password: string) => {
        try {
          const response = await axios.post('/api/auth/login', {
            email,
            password,
          });

          const { token, user } = response.data;

          // Set axios default authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          set({ user, token, isLoading: false });
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.response?.data?.error || 'Login failed');
        }
      },

      register: async (username: string, email: string, password: string) => {
        try {
          const response = await axios.post('/api/auth/register', {
            username,
            email,
            password,
          });

          const { token, user } = response.data;

          // Set axios default authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          set({ user, token, isLoading: false });
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.response?.data?.error || 'Registration failed');
        }
      },

      logout: () => {
        // Remove axios default authorization header
        delete axios.defaults.headers.common['Authorization'];
        set({ user: null, token: null, isLoading: false });
      },

      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      checkAuth: async () => {
        const { token } = get();
        
        if (!token) {
          set({ isLoading: false });
          return;
        }

        try {
          // Set axios default authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          const response = await axios.get('/api/auth/me');
          set({ user: response.data.user, isLoading: false });
        } catch (error) {
          // Remove invalid token
          delete axios.defaults.headers.common['Authorization'];
          set({ user: null, token: null, isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

export { useAuthStore };
