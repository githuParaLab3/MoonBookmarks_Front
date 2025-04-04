import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://moonbookmarks-back.onrender.com/auth"; 

export const login = async (email: string, senha: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, senha });
    const { token } = response.data;

    
    await AsyncStorage.setItem("authToken", token);
    
    return token;
  } catch (error) {
    console.error("Erro no login:", error);
    throw new Error("Não foi possível fazer o login");
  }
};

export const getAuthToken = async () => {
  return await AsyncStorage.getItem("authToken");
};

export const logout = async () => {
  await AsyncStorage.removeItem("authToken");
};
