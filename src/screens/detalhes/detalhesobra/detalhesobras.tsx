import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import ModalScreen from "@/src/components/ModalScreen"; // ajuste o caminho se necessário

// Interface para os dados da obra
interface ObraDetalhes {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  autor: string;
  tipo: string;
  generos: string[];
}

const formatTipo = (tipo: string) => {
  switch (tipo) {
    case "LIVRO":
      return "Livro";
    case "MANGA":
      return "Mangá";
    case "ANIME":
      return "Anime";
    default:
      return tipo;
  }
};

export function DetalhesObraScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params as { id: string };

  const [obra, setObra] = useState<ObraDetalhes | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState<ObraDetalhes | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://moonbookmarks-back.onrender.com/obras/${id}`)
        .then((response) => {
          setObra(response.data);
        })
        .catch(() => {
          Alert.alert("Erro", "Não foi possível carregar os dados da obra.");
        });
    }
  }, [id]);

  const handleCriarBookmark = async () => {
    try {
      await axios.post("https://moonbookmarks-back.onrender.com/bookmarks", {
        usuarioId: "8fb0fe59-698b-45e3-8fb3-043e984b4e0d",
        obraId: id,
      });
      Alert.alert("Sucesso", "Bookmark criada com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a bookmark.");
    }
  };

  const handleExcluirObra = async () => {
    Alert.alert("Excluir Obra", "Tem certeza que deseja excluir esta obra?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        onPress: async () => {
          try {
            await axios.delete(`https://moonbookmarks-back.onrender.com/obras/${id}`);
            Alert.alert("Obra excluída com sucesso!");
            router.back();
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir a obra.");
          }
        },
      },
    ]);
  };

  const handleEditarObra = () => {
    if (obra) {
      setEditData({ ...obra });
      setModalVisible(true);
    }
  };

  const handleSalvarEdicao = async () => {
    if (!editData) return;

    try {
      await axios.put(`https://moonbookmarks-back.onrender.com/obras/${editData.id}`, editData);
      setObra(editData);
      setModalVisible(false);
      Alert.alert("Sucesso", "Obra atualizada com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Erro ao atualizar a obra.");
    }
  };

  if (!obra) {
    return <Text>Carregando...</Text>;
  }

  const tipoFormatado = formatTipo(obra.tipo);
  const generos = obra.generos.length > 0 ? obra.generos.join(", ") : "Sem gêneros";

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
      <Text style={styles.tipo}>Tipo: {tipoFormatado}</Text>
      <Text style={styles.generos}>Gêneros: {generos}</Text>
      <Text style={styles.autor}>Autor: {obra.autor}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.bookmarkButton} onPress={handleCriarBookmark}>
          <Ionicons name="bookmark-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Bookmark</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton} onPress={handleEditarObra}>
          <Ionicons name="pencil-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleExcluirObra}>
          <Ionicons name="trash-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL DE EDIÇÃO */}
      <ModalScreen isVisible={isModalVisible} onClose={() => setModalVisible(false)} title="Editar Obra">
        <ScrollView>
          {editData && (
            <>
              <Text>Título</Text>
              <TextInput
                value={editData.titulo}
                onChangeText={(text) => setEditData({ ...editData, titulo: text })}
                style={styles.input}
              />

              <Text>Descrição</Text>
              <TextInput
                value={editData.descricao}
                onChangeText={(text) => setEditData({ ...editData, descricao: text })}
                style={styles.input}
                multiline
              />

              <Text>Imagem (URL)</Text>
              <TextInput
                value={editData.imagem}
                onChangeText={(text) => setEditData({ ...editData, imagem: text })}
                style={styles.input}
              />

              <Text>Autor</Text>
              <TextInput
                value={editData.autor}
                onChangeText={(text) => setEditData({ ...editData, autor: text })}
                style={styles.input}
              />

              <Text>Tipo (LIVRO, MANGA, ANIME)</Text>
              <TextInput
                value={editData.tipo}
                onChangeText={(text) => setEditData({ ...editData, tipo: text.toUpperCase() })}
                style={styles.input}
              />

              <Text>Gêneros (separados por vírgula)</Text>
              <TextInput
                value={editData.generos.join(", ")}
                onChangeText={(text) =>
                  setEditData({ ...editData, generos: text.split(",").map((g) => g.trim()) })
                }
                style={styles.input}
              />

              <TouchableOpacity style={[styles.editButton, { marginTop: 20 }]} onPress={handleSalvarEdicao}>
                <Text style={styles.buttonText}>Salvar Alterações</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </ModalScreen>
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
    marginBottom: 20,
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
  tipo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  generos: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  autor: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  bookmarkButton: {
    backgroundColor: "#6200EA",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
});
