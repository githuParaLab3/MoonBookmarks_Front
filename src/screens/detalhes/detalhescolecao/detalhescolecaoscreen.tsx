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
import * as ImagePicker from "expo-image-picker";
import styles from "./detalhescoleca.styles";

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
  const [novaImagem, setNovaImagem] = useState<string | null>(null);

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [search, setSearch] = useState("");
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);

  const loadColecao = async () => {
    try {
      const res = await axios.get(`https://moonbookmarks-back.onrender.com/colecoes/${id}`);
      setColecao(res.data);
      setTitulo(res.data.titulo);
      setDescricao(res.data.descricao);
    } catch {
      Alert.alert("Erro", "Erro ao carregar a coleção.");
    }
  };

  const loadBookmarks = async () => {
    try {
      const res = await axios.get("https://moonbookmarks-back.onrender.com/bookmarks/usuario/8fb0fe59-698b-45e3-8fb3-043e984b4e0d");
      setBookmarks(res.data);
      setFilteredBookmarks(res.data);
    } catch {
      Alert.alert("Erro", "Erro ao carregar bookmarks.");
    }
  };

  useEffect(() => {
    loadColecao();
    loadBookmarks();
  }, [id]);

  const escolherImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 0.7,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      setNovaImagem(resultado.assets[0].base64 || null);
    }
  };

  const handleEditar = async () => {
    try {
      await axios.put(`https://moonbookmarks-back.onrender.com/colecoes/${id}`, {
        titulo,
        descricao,
        foto: novaImagem || colecao?.foto,
      });
      setEditModalVisible(false);
      loadColecao();
    } catch {
      Alert.alert("Erro", "Erro ao editar.");
    }
  };

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coleção</Text>
      </View>

      {colecao.foto && (
        <Image source={{ uri: `data:image/jpeg;base64,${colecao.foto}` }} style={styles.image} />
      )}

      <Text style={styles.title}>{colecao.titulo}</Text>
      <Text style={styles.descricao}>{colecao.descricao}</Text>

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

            {(novaImagem || colecao?.foto) && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${novaImagem || colecao?.foto}` }}
                style={[styles.image, { height: 150, marginBottom: 10 }]}
              />
            )}

            <TouchableOpacity style={styles.botaoEditar} onPress={escolherImagem}>
              <Ionicons name="image-outline" size={20} color="white" />
              <Text style={styles.botaoTexto}>Trocar Imagem</Text>
            </TouchableOpacity>

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
