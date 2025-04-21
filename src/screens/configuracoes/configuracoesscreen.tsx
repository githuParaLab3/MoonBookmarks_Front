import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario } from "@/src/types/usuario";
import styles from "./configuracoesscreen.styles";


export function ConfiguracoesScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const [usuario, setUsuario] = useState<Usuario>({
    id: "",
    nome: "",
    email: "",
    senha: "",
    fotoPerfil: "",
  });

  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const response = await axios.get(`https://moonbookmarks-back.onrender.com/usuarios/${userId}`);
      setUsuario(response.data);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário", error);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      base64: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const base64 = result.assets[0].base64 || null;
      setImageBase64(base64);
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem("userId");
      const updatedUser = {
        ...usuario,
        fotoPerfil: imageBase64 || usuario.fotoPerfil,
      };
      await axios.put(`https://moonbookmarks-back.onrender.com/usuarios/${userId}`, updatedUser);
      alert("Dados atualizados com sucesso!");
      setModalVisible(false);
      fetchUserData();
    } catch (error) {
      console.error("Erro ao atualizar dados", error);
      alert("Erro ao atualizar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userId");
    router.push("/telainicial");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Image
          source={
            usuario.fotoPerfil
              ? { uri: `data:image/jpeg;base64,${usuario.fotoPerfil}` }
              : require("@/assets/images/logo.png")
          }
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{usuario.nome}</Text>
        <Text style={styles.userEmail}>{usuario.email}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.editButton}>
          <Ionicons name="create-outline" size={18} color="white" />
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="black" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>


      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={usuario.nome}
              onChangeText={(text) => setUsuario({ ...usuario, nome: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={usuario.email}
              onChangeText={(text) => setUsuario({ ...usuario, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={usuario.senha}
              secureTextEntry
              onChangeText={(text) => setUsuario({ ...usuario, senha: text })}
            />

            <TouchableOpacity onPress={handlePickImage} style={styles.imagePickerButton}>
              <Ionicons name="camera" size={20} color="white" />
              <Text style={styles.imagePickerText}>Escolher Foto</Text>
            </TouchableOpacity>

            {imageBase64 && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
                style={styles.imagePreview}
              />
            )}

            <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButton}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>Salvar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      

    </View>
  );
}

