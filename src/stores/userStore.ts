import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserStore {
  token: string | null;
  userId: string | null;  
  setToken: (token: string | null) => Promise<void>;
  setUserId: (userId: string | null) => void;
  clearToken: () => Promise<void>;
  checkToken: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  token: null,
  userId: null, 
  setToken: async (token: string | null) => {
    if (token) {
      await AsyncStorage.setItem('authToken', token);
      set({ token });
    } else {
      await AsyncStorage.removeItem('authToken');
      set({ token: null });
    }
  },
  setUserId: (userId: string | null) => {
    set({ userId });
  },
  clearToken: async () => {
    await AsyncStorage.removeItem('authToken');
    set({ token: null, userId: null });  
  },
  checkToken: async () => {
    const token = await AsyncStorage.getItem('authToken');
    set({ token });
  },
}));
