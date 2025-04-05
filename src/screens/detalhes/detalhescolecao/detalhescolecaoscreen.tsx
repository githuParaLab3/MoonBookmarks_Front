import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

interface Obra {
  id: string;
  titulo: string;
  imagem: string;
}

interface Bookmark {
  id: string;
  obra: Obra;
}

interface Colecao {
  id: string;
  titulo: string;
  descricao: string;
  foto: string;
  bookmarks: Bookmark[];
}

export function DetalhesColecaoScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: string };

  const [colecao, setColecao] = useState<Colecao | null>(null);

  useEffect(() => {
    axios
      .get(`https://moonbookmarks-back.onrender.com/colecoes/${id}`)
      .then((response) => setColecao(response.data))
      .catch(() => Alert.alert("Erro", "Não foi possível carregar a coleção."));
  }, [id]);

  const handleExcluirColecao = () => {
    Alert.alert("Excluir Coleção", "Tem certeza que deseja excluir esta coleção?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        onPress: async () => {
          try {
            await axios.delete(`https://moonbookmarks-back.onrender.com/colecoes/${id}`);
            Alert.alert("Coleção excluída com sucesso!");
            navigation.goBack();
          } catch (error) {
            Alert.alert("Erro", "Erro ao excluir coleção.");
          }
        },
      },
    ]);
  };

  if (!colecao) return <Text>Carregando...</Text>;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coleção</Text>
      </View>

      {/* Foto da coleção */}
      {colecao.foto && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${colecao.foto}` }}
          style={styles.colecaoImage}
        />
      )}

      {/* Título e descrição */}
      <Text style={styles.title}>{colecao.titulo}</Text>
      <Text style={styles.descricao}>{colecao.descricao}</Text>

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleExcluirColecao}>
          <Ionicons name="trash-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de obras (bookmarks) */}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flatlist}
        data={colecao.bookmarks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.mangaItem}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${item.obra.imagem}` }}
              style={styles.mangaImage}
            />
            <View style={styles.mangaText}>
              <Text style={styles.mangaTitle}>{item.obra.titulo}</Text>
              <Text style={styles.mangaChapter}>ID: {item.obra.id}</Text>
            </View>
            <TouchableOpacity style={styles.deleteIcon}>
              <Ionicons name="trash-outline" size={18} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
  colecaoImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  descricao: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 20,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#D32F2F",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#FBC02D",
  },
  buttonText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 14,
  },
  flatlist: {
    marginTop: 10,
  },
  mangaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#9C27B0",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mangaImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
  },
  mangaText: {
    flex: 1,
    marginLeft: 12,
  },
  mangaTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  mangaChapter: {
    fontSize: 14,
    color: "gray",
  },
  deleteIcon: {
    backgroundColor: "#D32F2F",
    padding: 8,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
