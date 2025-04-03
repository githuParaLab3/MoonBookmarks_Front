import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export function CadastroScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    router.navigate('/(tabs)/(home)');
  };

  const handleLoginRedirect = () => {
    router.navigate('/(autenticacao)/(login)'); // Ajuste a rota conforme necessário
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  topSection: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "112%",
    height: "20%",
    backgroundColor: "#8A42F5",
    borderBottomRightRadius: 50,
  },
  title: {
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
  registerButton: {
    backgroundColor: "#9748FF",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  registerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginRedirect: {
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#A085C3",
  },
  loginLink: {
    color: "#9748FF",
    fontWeight: "bold",
  },
});
