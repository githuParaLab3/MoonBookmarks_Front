import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

      // Já que a resposta é o token diretamente, não precisamos acessar `token`
      const token = response.data;  // Agora, `response.data` contém diretamente o token

      if (token) {
        // Armazene o token no AsyncStorage
        await AsyncStorage.setItem("authToken", token);
        
        // Redirecione para a tela principal após login bem-sucedido
        router.navigate('/(tabs)/(home)');
      } else {
        console.error("Token não encontrado na resposta do servidor.");
      }
    } catch (error: any) {
      // Afirmando que o erro é do tipo 'any' para poder acessar 'response' de forma segura
      if (axios.isAxiosError(error)) {
        console.error("Erro no login:", error.response ? error.response.data : error.message);
      } else {
        console.error("Erro inesperado:", error);
      }
      // Exibir um erro para o usuário se houver falha no login
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  topSection: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "112%",
    height: "25%",
    backgroundColor: "#8A42F5",
    borderBottomRightRadius: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#9748FF",
  },
  subtitle: {
    fontSize: 14,
    color: "#A085C3",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9748FF",
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#9748FF",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerRedirect: {
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
    color: "#A085C3",
  },
  registerLink: {
    color: "#9748FF",
    fontWeight: "bold",
  },
});
