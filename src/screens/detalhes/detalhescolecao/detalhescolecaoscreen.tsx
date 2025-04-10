import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useColecaoById, useUpdateColecao, useDeleteColecao } from "@/src/hooks/useColecoes"; // Importando os hooks personalizados
import * as ImagePicker from "expo-image-picker";
import styles from "./detalhescoleca.styles";
import ModalCustomizado from "@/src/components/ModalCustomizado";
import { Colecao, Bookmark } from "@/src/types"; // Importando as interfaces globais

export function DetalhesColecaoScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: colecao, isLoading: isColecaoLoading, refetch: refetchColecao } = useColecaoById(id);
  const { mutate: updateColecao } = useUpdateColecao();
  const { mutate: deleteColecao } = useDeleteColecao();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addBookmarkModalVisible, setAddBookmarkModalVisible] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [novaImagem, setNovaImagem] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    if (colecao) {
      setTitulo(colecao.titulo);
      setDescricao(colecao.descricao || ""); // Garantir que a descrição seja uma string vazia, caso não exista
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
      setNovaImagem(resultado.assets[0].base64 || null);
    }
  };

  const handleEditar = () => {
    if (colecao) {
      const colecaoAtualizada = {
        titulo,
        descricao,
        foto: novaImagem || colecao.foto,
      };
      updateColecao({ id: colecao.id, colecaoAtualizada });
      setEditModalVisible(false);
      refetchColecao();
    }
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

  useEffect(() => {
    if (colecao && colecao.bookmarks) {
      const filtradas = colecao.bookmarks.filter((bm) =>
        bm.obra.titulo.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredBookmarks(filtradas);
    }
  }, [search, colecao]);

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
      </View>

      {colecao?.bookmarks && colecao.bookmarks.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, color: "#777" }}>
          Nenhuma bookmark nessa coleção ainda.
        </Text>
      ) : (
        <FlatList
          data={colecao?.bookmarks || []}
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
                <Text style={styles.itemProgresso}>
                  Progresso: {item.progresso}
                </Text>
              </View>
            </View>
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
    </View>
  );
}
