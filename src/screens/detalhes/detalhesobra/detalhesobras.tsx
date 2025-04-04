import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";

// Interface para os dados da obra
interface ObraDetalhes {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
}

export  function DetalhesObraScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params as { id: string }; // Pegando o parâmetro 'id'

  const [obra, setObra] = useState<ObraDetalhes | null>(null);

  // Função para buscar os detalhes da obra na API
  useEffect(() => {
    if (id) {
      axios
        .get(`https://moonbookmarks-back.onrender.com//obras/${id}`) // Substitua pela URL real da sua API
        .then((response) => {
          setObra(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar detalhes da obra:", error);
          Alert.alert("Erro", "Não foi possível carregar os dados da obra.");
        });
    }
  }, [id]);

  // Função para excluir a obra
  const handleExcluirObra = async () => {
    Alert.alert(
      "Excluir Obra",
      "Tem certeza que deseja excluir esta obra?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await axios.delete(`https://api.exemplo.com/obras/${id}`);
              Alert.alert("Obra excluída com sucesso!");
              router.back();
            } catch (error) {
              console.error("Erro ao excluir a obra:", error);
              Alert.alert("Erro", "Não foi possível excluir a obra.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Função para editar a obra
  const handleEditarObra = () => {
   
  };

  if (!obra) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes da Obra</Text>
      </View>

      <Image source={{ uri: obra.imagem }} style={styles.obraImage} />
      <Text style={styles.titulo}>{obra.titulo}</Text>
      <Text style={styles.descricao}>{obra.descricao}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditarObra}>
          <Ionicons name="pencil-outline" size={20} color="white" />
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleExcluirObra}>
          <Ionicons name="trash-outline" size={20} color="white" />
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 60,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  obraImage: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descricao: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    marginLeft: 8,
  },
});
