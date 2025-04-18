import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import {
  useColecaoById,
  useUpdateColecao,
  useDeleteColecao,
  useAddBookmarkToColecao,
  useRemoveBookmarkFromColecao,
  useBookmarksByColecao,
} from "@/src/hooks/useColecoes";
import { useBookmarks } from "@/src/hooks/useBookmarks";
import { Colecao, Bookmark } from "@/src/types";

import styles from "./detalhescoleca.styles";
import ModalCustomizado from "@/src/components/ModalCustomizado";

export function DetalhesColecaoScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: colecao,
    isLoading: isColecaoLoading,
    refetch: refetchColecao,
  } = useColecaoById(id);

  const {
    data: bookmarksDaColecao,
    isLoading: isBookmarksLoading,
    refetch: refetchBookmarksColecao,
  } = useBookmarksByColecao(id);

  const { data: allBookmarks } = useBookmarks();
  const { mutate: updateColecao } = useUpdateColecao();
  const { mutate: deleteColecao } = useDeleteColecao();
  const { mutate: addBookmarkToColecao } = useAddBookmarkToColecao();
  const { mutate: removeBookmarkFromColecao } = useRemoveBookmarkFromColecao();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addBookmarkModalVisible, setAddBookmarkModalVisible] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [novaImagem, setNovaImagem] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (colecao) {
      setTitulo(colecao.titulo);
      setDescricao(colecao.descricao ?? "");
    }
  }, [colecao]);

  const escolherImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      base64: true,
      quality: 0.7,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      setNovaImagem(resultado.assets[0].base64 ?? null);
    }
  };

  const handleEditar = () => {
    if (!colecao) return;

    const colecaoAtualizada = {
      id: colecao.id,
      titulo: titulo.trim(),
      descricao: descricao.trim() || undefined,
      foto: novaImagem ?? colecao.foto,
    };

    updateColecao(colecaoAtualizada, {
      onSuccess: () => {
        refetchColecao();
        setEditModalVisible(false);
      },
      onError: (error) => {
        console.error("Erro ao atualizar coleção:", error);
        Alert.alert("Erro", "Falha ao atualizar a coleção.");
      },
    });
  };

  const handleExcluirColecao = () => {
    Alert.alert("Excluir", "Tem certeza que deseja excluir a coleção?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        onPress: () => {
          if (colecao) {
            deleteColecao(colecao.id);
            navigation.goBack();
          }
        },
      },
    ]);
  };

  const handleAdicionarBookmark = (bookmarkId: string) => {
    if (!colecao || !allBookmarks) return;

    addBookmarkToColecao(
      { colecaoId: colecao.id, bookmarkId },
      {
        onSuccess: () => {
          refetchBookmarksColecao();
          refetchColecao();
        },
      }
    );
  };

  const handleRemoverBookmark = (bookmarkId: string) => {
    if (!colecao) return;

    removeBookmarkFromColecao(
      { colecaoId: colecao.id, bookmarkId },
      {
        onSuccess: () => {
          refetchBookmarksColecao();
          refetchColecao();
        },
      }
    );
  };

  const bookmarksForaDaColecao =
    allBookmarks?.filter(
      (bm) => !bookmarksDaColecao?.some((b) => b.id === bm.id)
    ) || [];

  const bookmarksFiltrados = bookmarksForaDaColecao.filter((bm) =>
    bm.obra.titulo.toLowerCase().includes(search.toLowerCase())
  );

  if (isColecaoLoading) return <Text style={{ padding: 20 }}>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coleção</Text>
      </View>

      {colecao?.foto && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${colecao.foto}` }}
          style={styles.image}
        />
      )}

      <Text style={styles.title}>{colecao?.titulo}</Text>
      <Text style={styles.descricao}>{colecao?.descricao}</Text>

      <View style={styles.botoes}>
        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={() => setEditModalVisible(true)}
        >
          <Ionicons name="create-outline" size={20} color="white" />
          <Text style={styles.botaoTexto}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={handleExcluirColecao}
        >
          <Ionicons name="trash-outline" size={20} color="white" />
          <Text style={styles.botaoTexto}>Excluir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => setAddBookmarkModalVisible(true)}
        >
          <Ionicons name="add-circle-outline" size={20} color="white" />
          <Text style={styles.botaoTexto}>Bookmark</Text>
        </TouchableOpacity>
      </View>

      {isBookmarksLoading ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>Carregando bookmarks...</Text>
      ) : bookmarksDaColecao?.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, color: "#777" }}>
          Nenhuma bookmark nessa coleção ainda.
        </Text>
      ) : (
        <FlatList
          data={bookmarksDaColecao}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => {
                Alert.alert(
                  "Remover Bookmark",
                  "Deseja remover esta bookmark da coleção?",
                  [
                    { text: "Cancelar", style: "cancel" },
                    {
                      text: "Remover",
                      onPress: () => handleRemoverBookmark(item.id),
                    },
                  ]
                );
              }}
              style={styles.item}
            >
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.obra.imagem}` }}
                style={styles.itemImage}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitulo}>{item.obra.titulo}</Text>
                <Text style={styles.itemProgresso}>
                  Progresso: {item.progresso}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Modal de Edição */}
      <ModalCustomizado
        isVisible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        title="Editar Coleção"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalContent}
        >
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
              source={{
                uri: `data:image/jpeg;base64,${novaImagem || colecao?.foto}`,
              }}
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
      </ModalCustomizado>

      {/* Modal de Adicionar Bookmark */}
      <ModalCustomizado
        isVisible={addBookmarkModalVisible}
        onClose={() => setAddBookmarkModalVisible(false)}
        title="Adicionar Bookmark"
      >
        <TextInput
          placeholder="Buscar por título..."
          value={search}
          onChangeText={setSearch}
          style={[styles.input, { marginBottom: 12 }]}
        />
        <FlatList
          data={bookmarksFiltrados}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.obra.imagem}` }}
                style={styles.itemImage}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitulo}>{item.obra.titulo}</Text>
                <Text style={styles.itemProgresso}>
                  Progresso: {item.progresso}
                </Text>
                <Button
                  title="Adicionar"
                  onPress={() => handleAdicionarBookmark(item.id)}
                />
              </View>
            </View>
          )}
        />
      </ModalCustomizado>
    </View>
  );
}
