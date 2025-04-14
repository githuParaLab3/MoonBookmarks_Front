import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserStore {
  token: string | null;
  userId: string | null;  // Adiciona o ID do usuário à store
  setToken: (token: string | null) => Promise<void>;
  setUserId: (userId: string | null) => void;
  clearToken: () => Promise<void>;
  checkToken: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  token: null,
  userId: null,  // Inicializa o ID do usuário como null
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
    set({ token: null, userId: null });  // Limpa o token e o ID do usuário
  },
  checkToken: async () => {
    const token = await AsyncStorage.getItem('authToken');
    set({ token });
  },
}));
