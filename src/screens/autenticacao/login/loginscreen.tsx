import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./loginscreen.styles";

export function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Envia a requisição de login para o backend
      const response = await axios.post("https://moonbookmarks-back.onrender.com/auth/login", {
        email: email,
        senha: password, // Certifique-se de enviar o campo correto "senha" ao invés de "password"
      });

      // Verifique a resposta recebida
      console.log("Resposta do login:", response.data); // Aqui você vai ver a estrutura da resposta

      const { token, userId } = response.data;  // Supondo que o backend retorne `token` e `userId`

      if (token && userId) {
        // Armazene o token e o userId no AsyncStorage
        await AsyncStorage.setItem("authToken", token);
        await AsyncStorage.setItem("userId", userId);  // Armazene o id do usuário

        // Redirecione para a tela principal após login bem-sucedido
        router.navigate('/(tabs)/(home)');
      } else {
        console.error("Token ou ID do usuário não encontrados na resposta do servidor.");
        Alert.alert("Erro", "Falha no login, tente novamente.");
      }
    } catch (error: any) {
      // Afirmando que o erro é do tipo 'any' para poder acessar 'response' de forma segura
      if (axios.isAxiosError(error)) {
        console.error("Erro no login:", error.response ? error.response.data : error.message);
      } else {
        console.error("Erro inesperado:", error);
      }
      // Exibir um erro para o usuário se houver falha no login
      Alert.alert("Erro", "Não foi possível fazer login.");
    }
  };

  const handleRegisterRedirect = () => {
    router.navigate('/(autenticacao)/(cadastro)'); // Ajuste a rota conforme necessário
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection} />

      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>É bom ver você novamente</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} color="#9748FF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="@Seuemail"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="key-outline" size={20} color="#9748FF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegisterRedirect} style={styles.registerRedirect}>
        <Text style={styles.registerText}>
          Ainda não tem uma conta? <Text style={styles.registerLink}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
