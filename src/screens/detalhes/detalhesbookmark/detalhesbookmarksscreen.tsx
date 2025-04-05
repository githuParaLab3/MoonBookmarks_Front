import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import ModalScreen from "@/src/components/ModalScreen"; // Caminho do seu modal

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
  status: string;
  progresso: number;
  comentario: string;
}

interface Colecao {
  id: string;
  nome: string;
}

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
  const { id } = params as { id: string };

  const [bookmark, setBookmark] = useState<BookmarkDetalhes | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [colecoes, setColecoes] = useState<Colecao[]>([]);
  const [colecoesDoBookmark, setColecoesDoBookmark] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      axios.get(`https://moonbookmarks-back.onrender.com/bookmarks/${id}`)
        .then((res) => setBookmark(res.data))
        .catch(() => Alert.alert("Erro", "Não foi possível carregar os dados do bookmark."));
    }
  }, [id]);

  const handleExcluirBookmark = async () => {
    Alert.alert("Excluir Bookmark", "Tem certeza?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        onPress: async () => {
          try {
            await axios.delete(`https://moonbookmarks-back.onrender.com/bookmarks/${id}`);
            Alert.alert("Excluído com sucesso!");
            router.back();
          } catch {
            Alert.alert("Erro", "Erro ao excluir.");
          }
        },
      },
    ]);
  };

  const handleEditarBookmark = () => {
    // implementar depois
  };

  const carregarColecoes = async () => {
    try {
      const resColecoes = await axios.get("https://moonbookmarks-back.onrender.com/colecoes");
      setColecoes(resColecoes.data);

      const resBookmarkColecoes = await axios.get(`https://moonbookmarks-back.onrender.com/bookmarks/${id}/colecoes`);
      const ids = resBookmarkColecoes.data.map((c: Colecao) => c.id);
      setColecoesDoBookmark(ids);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as coleções.");
    }
  };

  const toggleColecao = async (colecaoId: string) => {
    try {
      const jaTem = colecoesDoBookmark.includes(colecaoId);

      if (jaTem) {
        await axios.delete(`https://moonbookmarks-back.onrender.com/colecoes/${colecaoId}/bookmarks/${id}`);
        setColecoesDoBookmark(prev => prev.filter(cid => cid !== colecaoId));
      } else {
        await axios.post(`https://moonbookmarks-back.onrender.com/colecoes/${colecaoId}/bookmarks`, {
          bookmarkId: id
        });
        setColecoesDoBookmark(prev => [...prev, colecaoId]);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a coleção.");
    }
  };

  const abrirModal = () => {
    setModalVisible(true);
    carregarColecoes();
  };

  if (!bookmark) return <Text>Carregando...</Text>;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Bookmark</Text>
      </View>

      {/* Conteúdo */}
      <Image source={{ uri: `data:image/jpeg;base64,${bookmark.obra.imagem}` }} style={styles.bookmarkImage} />
      <Text style={styles.titulo}>{bookmark.obra.titulo}</Text>
      <Text style={styles.capitulo}>Capítulo: {bookmark.obra.descricao}</Text>
      <Text style={styles.status}>Status: {statusLabels[bookmark.status]}</Text>
      <Text style={styles.progresso}>Progresso: {bookmark.progresso}%</Text>
      <Text style={styles.descricao}>{bookmark.comentario}</Text>

      {/* Ações */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditarBookmark}>
          <MaterialIcons name="edit" size={20} color="white" />
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleExcluirBookmark}>
          <MaterialIcons name="delete" size={20} color="white" />
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.colecaoButton} onPress={abrirModal}>
          <MaterialIcons name="collections-bookmark" size={20} color="white" />
          <Text style={styles.editButtonText}>Coleções</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Coleções */}
      <ModalScreen isVisible={modalVisible} onClose={() => setModalVisible(false)} title="Coleções">
        <ScrollView>
          {colecoes.map((colecao) => {
            const estaNaColecao = colecoesDoBookmark.includes(colecao.id);
            return (
              <TouchableOpacity
                key={colecao.id}
                onPress={() => toggleColecao(colecao.id)}
                style={[styles.colecaoItem, estaNaColecao && styles.colecaoAtiva]}
              >
                <Text style={styles.colecaoTexto}>
                  {estaNaColecao ? "✓ " : ""}{colecao.nome}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ModalScreen>
    </View>
  );
}
const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  // Cabeçalho
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
  },
  deleteButtonText: {
    color: "white",
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },

  // Imagem da obra
  bookmarkImage: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
  },

  // Texto principal
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

  // Botões de ação
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  colecaoButton: {
    backgroundColor: "#3f51b5",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    marginLeft: 8,
  },

  // Itens do modal de coleções
  colecaoItem: {
    padding: 12,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  colecaoTexto: {
    fontSize: 16,
  },
  colecaoAtiva: {
    backgroundColor: "#e0f7fa",
  },
});
