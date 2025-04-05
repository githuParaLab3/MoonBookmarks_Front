import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";

interface Obra {
  id: string;
  titulo: string;
  imagem: string;
}

interface Bookmark {
  id: string;
  progresso: string;
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
  const { id } = useLocalSearchParams<{ id: string }>();

  const [colecao, setColecao] = useState<Colecao | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addBookmarkModalVisible, setAddBookmarkModalVisible] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [search, setSearch] = useState("");

  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);

  const loadColecao = async () => {
    try {
      const res = await axios.get(`https://moonbookmarks-back.onrender.com/colecoes/${id}`);
      setColecao(res.data);
      setTitulo(res.data.titulo);
      setDescricao(res.data.descricao);
    } catch (err) {
      Alert.alert("Erro", "Erro ao carregar a coleção.");
    }
  };

  const loadBookmarks = async () => {
    try {
      const res = await axios.get("https://moonbookmarks-back.onrender.com/bookmarks/usuario/8fb0fe59-698b-45e3-8fb3-043e984b4e0d");
      setBookmarks(res.data);
      setFilteredBookmarks(res.data);
    } catch (err) {
      Alert.alert("Erro", "Erro ao carregar bookmarks.");
    }
  };

  useEffect(() => {
    loadColecao();
    loadBookmarks();
  }, [id]);

  const handleExcluirColecao = async () => {
    Alert.alert("Excluir", "Tem certeza que deseja excluir a coleção?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir", onPress: async () => {
          try {
            await axios.delete(`https://moonbookmarks-back.onrender.com/colecoes/${id}`);
            Alert.alert("Coleção excluída com sucesso!");
            navigation.goBack();
          } catch {
            Alert.alert("Erro", "Erro ao excluir.");
          }
        }
      }
    ]);
  };

  const handleEditar = async () => {
    try {
      await axios.put(`https://moonbookmarks-back.onrender.com/colecoes/${id}`, {
        titulo,
        descricao,
      });
      setEditModalVisible(false);
      loadColecao();
    } catch {
      Alert.alert("Erro", "Erro ao editar.");
    }
  };

  const handleAdicionarBookmark = async (bookmarkId: string) => {
    try {
      await axios.post(`https://moonbookmarks-back.onrender.com/colecoes/${id}/bookmark/${bookmarkId}`);
      setAddBookmarkModalVisible(false);
      loadColecao();
    } catch {
      Alert.alert("Erro", "Erro ao adicionar bookmark.");
    }
  };

  const handleRemoverBookmark = async (bookmarkId: string) => {
    try {
      await axios.delete(`https://moonbookmarks-back.onrender.com/colecoes/${id}/bookmark/${bookmarkId}`);
      loadColecao();
    } catch {
      Alert.alert("Erro", "Erro ao remover bookmark.");
    }
  };

  useEffect(() => {
    const filtradas = bookmarks.filter((bm) =>
      bm.obra.titulo.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBookmarks(filtradas);
  }, [search, bookmarks]);

  if (!colecao) return <Text style={{ padding: 20 }}>Carregando...</Text>;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coleção</Text>
      </View>

      {/* Foto da Coleção */}
      {colecao.foto && (
        <Image source={{ uri: `data:image/jpeg;base64,${colecao.foto}` }} style={styles.image} />
      )}

      {/* Infos */}
      <Text style={styles.title}>{colecao.titulo}</Text>
      <Text style={styles.descricao}>{colecao.descricao}</Text>

      {/* Botões */}
      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botaoEditar} onPress={() => setEditModalVisible(true)}>
          <Ionicons name="create-outline" size={20} color="white" />
          <Text style={styles.botaoTexto}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoExcluir} onPress={handleExcluirColecao}>
          <Ionicons name="trash-outline" size={20} color="white" />
          <Text style={styles.botaoTexto}>Excluir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoAdicionar} onPress={() => setAddBookmarkModalVisible(true)}>
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.botaoTexto}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Bookmarks */}
      {colecao.bookmarks.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, color: "#777" }}>
          Nenhuma bookmark nessa coleção ainda.
        </Text>
      ) : (
        <FlatList
          data={colecao.bookmarks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.obra.imagem}` }}
                style={styles.itemImage}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitulo}>{item.obra.titulo}</Text>
                <Text style={styles.itemProgresso}>Progresso: {item.progresso}</Text>
              </View>
              <TouchableOpacity onPress={() => handleRemoverBookmark(item.id)} style={styles.deleteIcon}>
                <Ionicons name="trash-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Modal de Edição */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEditModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setEditModalVisible(false)}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Coleção</Text>
            <TextInput
              placeholder="Título"
              style={styles.input}
              value={titulo}
              onChangeText={setTitulo}
            />
            <TextInput
              placeholder="Descrição"
              style={[styles.input, { height: 80 }]}
              multiline
              value={descricao}
              onChangeText={setDescricao}
            />
            <TouchableOpacity style={styles.botaoSalvar} onPress={handleEditar}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Salvar</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>

      {/* Modal de Adicionar Bookmark */}
      <Modal
        visible={addBookmarkModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setAddBookmarkModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setAddBookmarkModalVisible(false)}>
          <KeyboardAvoidingView behavior="padding" style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Bookmark</Text>
            <TextInput
              placeholder="Buscar bookmark..."
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />
            <FlatList
              data={filteredBookmarks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleAdicionarBookmark(item.id)}
                >
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${item.obra.imagem}` }}
                    style={styles.itemImage}
                  />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitulo}>{item.obra.titulo}</Text>
                    <Text style={styles.itemProgresso}>Progresso: {item.progresso}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 12 },
  image: { width: "100%", height: 180, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  descricao: { textAlign: "center", fontSize: 16, color: "#666", marginBottom: 12 },
  botoes: { flexDirection: "row", justifyContent: "center", gap: 10, marginBottom: 20 },
  botaoEditar: { flexDirection: "row", backgroundColor: "#FBC02D", padding: 10, borderRadius: 8 },
  botaoExcluir: { flexDirection: "row", backgroundColor: "#D32F2F", padding: 10, borderRadius: 8 },
  botaoAdicionar: { flexDirection: "row", backgroundColor: "#7B1FA2", padding: 10, borderRadius: 8 },
  botaoTexto: { color: "white", marginLeft: 6, fontWeight: "bold" },
  item: { flexDirection: "row", backgroundColor: "#f8f8f8", padding: 10, marginBottom: 10, borderRadius: 10 },
  itemImage: { width: 50, height: 50, borderRadius: 10 },
  itemInfo: { flex: 1, marginLeft: 10, justifyContent: "center" },
  itemTitulo: { fontWeight: "bold", fontSize: 16 },
  itemProgresso: { color: "gray" },
  deleteIcon: { backgroundColor: "#D32F2F", padding: 6, borderRadius: 50, justifyContent: "center", alignItems: "center" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: "#fff", padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: "90%" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 12 },
  botaoSalvar: { backgroundColor: "#4CAF50", padding: 12, borderRadius: 8, alignItems: "center" },
});
