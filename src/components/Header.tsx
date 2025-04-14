import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para acessar AsyncStorage
import axios from "axios"; // Para fazer requisição HTTP (caso precise pegar o nome do backend)

export default function Header() {
  const [userName, setUserName] = useState(""); // Estado para armazenar o nome do usuário
  const [userPhoto, setUserPhoto] = useState(""); // Estado para armazenar a foto do usuário
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Recupera o ID do usuário do AsyncStorage
        const userId = await AsyncStorage.getItem("userId");

        if (userId) {
          // Faz a requisição para o backend para pegar o nome do usuário com base no userId
          const response = await axios.get(
            `https://moonbookmarks-back.onrender.com/usuarios/${userId}`,
          ); // Ajuste o endpoint conforme necessário
          setUserName(response.data.nome); // Supondo que o nome do usuário seja retornado com a chave `nome`
          setUserPhoto(response.data.fotoPerfil || '');
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleNavigateToSettings = () => {
    router.navigate("/configuracoes");
  };

  // Usando o require para uma imagem local
  const defaultProfileImage = require("../../assets/images/logo.png"); // Caminho para sua imagem local

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Olá, {userName || "Usuário"}</Text>

        <TouchableOpacity onPress={handleNavigateToSettings}>
          {userPhoto ? (
            // Se o usuário tem uma foto de perfil, exibe a foto dele
            <Image source={{ uri: `data:image/jpeg;base64,${userPhoto}` }} style={styles.profileImage} />
          ) : (
            // Se não tem foto, exibe uma imagem padrão
            <Image
              source={defaultProfileImage} // Usando a imagem local aqui
              style={styles.profileImage}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#9748FF",
    height: 60, // Altura fixa para o header
    justifyContent: "center",
    borderRadius: 9,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  profilePlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
});
