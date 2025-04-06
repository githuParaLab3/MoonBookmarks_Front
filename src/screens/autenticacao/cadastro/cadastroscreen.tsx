import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import styles from "./cadastroscreen.styles";

export function CadastroScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      // Envia a requisição de registro para o backend
      const response = await axios.post("https://moonbookmarks-back.onrender.com/auth/register", {
        email: email,
        nome: nickname,
        senha: password, // Certifique-se de enviar a senha corretamente como "senha"
      });

      // Verifica se a resposta é bem-sucedida
      if (response.data === "Usuário registrado com sucesso!") {
        // Redireciona para a tela de login após o cadastro bem-sucedido
        router.navigate('/(autenticacao)/(login)');
      } else {
        console.error("Erro ao registrar usuário:", response.data);
      }
    } catch (error:any) {
      console.error("Erro no cadastro:", error.response ? error.response.data : error.message);
    }
  };

  const handleLoginRedirect = () => {
    router.navigate('/(autenticacao)/(login)'); // Redireciona para a tela de login
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Registre-se</Text>
        <Text style={styles.subtitle}>É gratuito, rápido e eficiente</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color="#9748FF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="seuemail@gmail.com"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nickname</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} color="#9748FF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="@Seunickname"
            placeholderTextColor="#aaa"
            value={nickname}
            onChangeText={setNickname}
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

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Registrar-se</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLoginRedirect} style={styles.loginRedirect}>
        <Text style={styles.loginText}>
          Já tem uma conta? <Text style={styles.loginLink}>Entrar</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
