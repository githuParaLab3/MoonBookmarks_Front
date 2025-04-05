import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import ModalScreen from "@/src/components/ModalScreen";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

// Enum de tipos
enum Tipo {
  MANGA = "MANGA",
  MANHWA = "MANHWA",
  MANHUA = "MANHUA",
  HQ = "HQ",
  LIVRO = "LIVRO",
  NOVEL = "NOVEL",
  ANIME = "ANIME",
  DESENHO = "DESENHO",
  SERIE = "SERIE",
  FILME = "FILME"
}

interface ObraDetalhes {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  autor: string;
  tipo: Tipo;
  generos: string[];
}

const formatarTipo = (tipo: Tipo | null | undefined) => {
  if (!tipo) return "Tipo desconhecido";
  return tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();
};

export function DetalhesObraScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params as { id: string };

  const [obra, setObra] = useState<ObraDetalhes | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState<ObraDetalhes | null>(null);
  const [isCriarBookmarkVisible, setCriarBookmarkVisible] = useState(false);
  const [progresso, setProgresso] = useState("");
  const [status, setStatus] = useState("");
  const [comentario, setComentario] = useState(""); // Adicionado para comentário
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);

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

  const handleSubmitBookmark = async () => {
    try {
      await axios.post("https://moonbookmarks-back.onrender.com/bookmarks", {
        obra: { id },
        usuario: { id: "8fb0fe59-698b-45e3-8fb3-043e984b4e0d" },
        progresso: Number(progresso),
        status,
        comentario, // Enviando o comentário
      });
      Alert.alert("Sucesso", "Bookmark criada com sucesso!");
      setCriarBookmarkVisible(false);
      setProgresso("");
      setStatus("");
      setComentario(""); // Limpar o campo de comentário após salvar
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

  const handleSelecionarImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.7,
    });

    if (!resultado.canceled && resultado.assets[0].base64 && editData) {
      setEditData({ ...editData, imagem: resultado.assets[0].base64 });
      setImagemPreview(`data:image/jpeg;base64,${resultado.assets[0].base64}`);
    }
  };

  if (!obra) return <Text>Carregando...</Text>;

  const tipoFormatado = formatarTipo(obra.tipo);
  const generos = obra.generos.length > 0 ? obra.generos.join(", ") : "Sem gêneros";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes da Obra</Text>
      </View>

      <Image source={{ uri: `data:image/jpeg;base64,${obra.imagem}` }} style={styles.obraImage} />
      <Text style={styles.titulo}>{obra.titulo}</Text>
      <Text style={styles.descricao}>{obra.descricao}</Text>
      <Text style={styles.tipo}>Tipo: {tipoFormatado}</Text>
      <Text style={styles.generos}>Gêneros: {generos}</Text>
      <Text style={styles.autor}>Autor: {obra.autor}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.bookmarkButton} onPress={() => setCriarBookmarkVisible(true)}>
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

      {/* Modal para criar bookmark */}
      <ModalScreen isVisible={isCriarBookmarkVisible} onClose={() => setCriarBookmarkVisible(false)} title="Nova Bookmark">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
          <Text style={styles.label}>Status</Text>
          <Picker
            selectedValue={status}
            onValueChange={(value) => setStatus(value)}
            style={styles.input}
          >
            <Picker.Item label="Selecione o status" value="" />
            <Picker.Item label="Planejado" value="PLANEJADO" />
            <Picker.Item label="Em progresso" value="EM_PROGRESSO" />
            <Picker.Item label="Pausado" value="PAUSADO" />
            <Picker.Item label="Concluído" value="CONCLUIDO" />
            <Picker.Item label="Abandonado" value="ABANDONADO" />
          </Picker>

          <Text style={styles.label}>Progresso</Text>
          <TextInput
            placeholder="Progresso (ex: 5)"
            value={progresso}
            onChangeText={setProgresso}
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>Comentário</Text>
          <TextInput
            placeholder="Deixe um comentário..."
            value={comentario}
            onChangeText={setComentario}
            style={[styles.input, { height: 80 }]} // Aumentando a altura para comentário
            multiline
          />

          <TouchableOpacity style={[styles.bookmarkButton, { alignSelf: "center" }]} onPress={handleSubmitBookmark}>
            <Text style={styles.buttonText}>Criar</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ModalScreen>

      {/* Modal para editar obra */}
      <ModalScreen isVisible={isModalVisible} onClose={() => setModalVisible(false)} title="Editar Obra">
        <ScrollView>
          <Text style={styles.label}>Título</Text>
          <TextInput value={editData?.titulo} onChangeText={(text) => setEditData((prev) => prev && { ...prev, titulo: text })} style={styles.input} />

          <Text style={styles.label}>Descrição</Text>
          <TextInput value={editData?.descricao} onChangeText={(text) => setEditData((prev) => prev && { ...prev, descricao: text })} style={styles.input} multiline />

          <Text style={styles.label}>Autor</Text>
          <TextInput value={editData?.autor} onChangeText={(text) => setEditData((prev) => prev && { ...prev, autor: text })} style={styles.input} />

          <Text style={styles.label}>Tipo</Text>
          <Picker
            selectedValue={editData?.tipo}
            onValueChange={(itemValue) => setEditData((prev) => prev && { ...prev, tipo: itemValue })}
            style={styles.input}
          >
            <Picker.Item label="Selecione o tipo" value="" />
            {Object.values(Tipo).map((tipo) => (
              <Picker.Item key={tipo} label={tipo.charAt(0) + tipo.slice(1).toLowerCase()} value={tipo} />
            ))}
          </Picker>

          <Text style={styles.label}>Gêneros (separados por vírgula)</Text>
          <TextInput
            value={editData?.generos?.join(", ") || ""}
            onChangeText={(text) =>
              setEditData((prev) => prev && { ...prev, generos: text.split(",").map((g) => g.trim()) })
            }
            style={styles.input}
          />

          <TouchableOpacity style={styles.bookmarkButton} onPress={handleSelecionarImagem}>
            <Ionicons name="image-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Selecionar imagem</Text>
          </TouchableOpacity>

          {/* Preview da Imagem */}
          {imagemPreview && (
            <View style={styles.imagePreviewContainer}>
              <Text style={styles.label}>Preview da Imagem</Text>
              <Image source={{ uri: imagemPreview }} style={styles.imagePreview} />
            </View>
          )}

          <TouchableOpacity style={[styles.editButton, { alignSelf: "center", marginTop: 20 }]} onPress={handleSalvarEdicao}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </ScrollView>
      </ModalScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 22, fontWeight: "bold", flex: 1, textAlign: "center" },
  obraImage: { width: "100%", height: 250, borderRadius: 8, marginBottom: 16 },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  descricao: { fontSize: 16, color: "#666", marginBottom: 16 },
  tipo: { fontSize: 16, color: "#666", marginBottom: 8 },
  generos: { fontSize: 16, color: "#666", marginBottom: 8 },
  autor: { fontSize: 16, color: "#666", marginBottom: 16 },
  actions: { flexDirection: "row", justifyContent: "space-around", marginVertical: 20 },
  bookmarkButton: { backgroundColor: "#4CAF50", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, flexDirection: "row", alignItems: "center" },
  editButton: { backgroundColor: "#2196F3", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, flexDirection: "row", alignItems: "center" },
  deleteButton: { backgroundColor: "#F44336", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, flexDirection: "row", alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, marginLeft: 8 },
  label: { fontSize: 16, marginVertical: 8 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, marginBottom: 10 },
  imagePreviewContainer: { alignItems: "center", marginTop: 10 },
  imagePreview: { width: 150, height: 150, borderRadius: 8, marginTop: 10 },
});
