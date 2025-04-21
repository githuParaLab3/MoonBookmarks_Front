import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import axios from "axios"; 

export default function Header() {
  const [userName, setUserName] = useState(""); 
  const [userPhoto, setUserPhoto] = useState(""); 
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Recupera o ID do usuário do AsyncStorage
        const userId = await AsyncStorage.getItem("userId");

        if (userId) {
          
          const response = await axios.get(
            `https://moonbookmarks-back.onrender.com/usuarios/${userId}`,
          ); 
          setUserName(response.data.nome); 
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

 
  const defaultProfileImage = require("../../assets/images/logo.png"); 

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Olá, {userName || "Usuário"}</Text>

        <TouchableOpacity onPress={handleNavigateToSettings}>
          {userPhoto ? (
        
            <Image source={{ uri: `data:image/jpeg;base64,${userPhoto}` }} style={styles.profileImage} />
          ) : (
            
            <Image
              source={defaultProfileImage} 
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
    height: 60,
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
