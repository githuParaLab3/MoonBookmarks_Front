import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";

// Interface para os dados do bookmark
interface BookmarkDetalhes {
  id: string;
  obra: {
    titulo: string;
    descricao: string;
    imagem: string;
  };
  usuario: {
    nome: string;
  };
  status: string; // O status agora é uma string que será mapeada
  progresso: number;
  comentario: string;
}

// Mapeando o enum de Status para uma descrição legível
const statusLabels: { [key: string]: string } = {
  PLANEJADO: "Planejado",
  EM_PROGRESSO: "Em progresso",
  PAUSADO: "Pausado",
  CONCLUIDO: "Concluído",
  ABANDONADO: "Abandonado",
};

export function DetalhesBookmarkScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params as { id: string }; // Pegando o parâmetro 'id'

  const [bookmark, setBookmark] = useState<BookmarkDetalhes | null>(null);

  // Função para buscar os detalhes do bookmark na API
  useEffect(() => {
    if (id) {
      axios
        .get(`https://moonbookmarks-back.onrender.com/bookmarks/${id}`) // URL corrigida
        .then((response) => {
          console.log('Dados recebidos:', response.data); // Verifique o que vem no response
          setBookmark(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar detalhes do bookmark:", error);
          Alert.alert("Erro", "Não foi possível carregar os dados do bookmark.");
        });
    }
  }, [id]);

  // Função para excluir o bookmark
  const handleExcluirBookmark = async () => {
    Alert.alert(
      "Excluir Bookmark",
      "Tem certeza que deseja excluir este bookmark?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await axios.delete(`https://moonbookmarks-back.onrender.com/bookmarks/${id}`);
              Alert.alert("Bookmark excluído com sucesso!");
              router.back();
            } catch (error) {
              console.error("Erro ao excluir o bookmark:", error);
              Alert.alert("Erro", "Não foi possível excluir o bookmark.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Função para editar o bookmark
  const handleEditarBookmark = () => {
    // Navegar para a tela de edição do bookmark
  };

  if (!bookmark) {
    return <Text>Carregando...</Text>;
  }

  console.log('Status do bookmark:', bookmark.status);  // Verifique o valor de status no log

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Bookmark</Text>
      </View>

      <Image source={{ uri: bookmark.obra.imagem }} style={styles.bookmarkImage} />
      <Text style={styles.titulo}>{bookmark.obra.titulo}</Text>
      <Text style={styles.capitulo}>Capítulo: {bookmark.obra.descricao}</Text>
      
      {/* Verifique o valor de status antes de renderizar */}
      <Text style={styles.status}>
        Status: {statusLabels[bookmark.status] || "Status não disponível"}
      </Text>
      <Text style={styles.progresso}>Progresso: {bookmark.progresso}%</Text>
      <Text style={styles.descricao}>{bookmark.comentario}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditarBookmark}>
          <MaterialIcons name="edit" size={20} color="white" />
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleExcluirBookmark}>
          <MaterialIcons name="delete" size={20} color="white" />
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
  bookmarkImage: {
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
  capitulo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  progresso: {
    fontSize: 16,
    color: "#666",
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
