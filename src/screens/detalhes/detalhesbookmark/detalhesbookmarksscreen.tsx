import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import ModalCustomizado from "@/src/components/ModalCustomizado";
import { Picker } from "@react-native-picker/picker";
import { useRemoveColecaoFromBookmark, useColecoesByBookmark } from "@/src/hooks/useBookmarks"
import styles from "./detalhesbookmark.styles";
import { ActivityIndicator } from "react-native-paper";
import { Colecao } from "@/src/types";

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
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [colecoes, setColecoes] = useState<Colecao[]>([]);
  const [colecoesDoBookmark, setColecoesDoBookmark] = useState<string[]>([]);

  const [novoStatus, setNovoStatus] = useState("");
  const [novoProgresso, setNovoProgresso] = useState("");
  const [novoComentario, setNovoComentario] = useState("");

  const { data: colecoesBookmark } = useColecoesByBookmark(id);
  const { mutate: removeColecaoFromBookmark } = useRemoveColecaoFromBookmark();

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
    if (!bookmark) return;
    setNovoStatus(bookmark.status);
    setNovoProgresso(bookmark.progresso.toString());
    setNovoComentario(bookmark.comentario);
    setEditModalVisible(true);
  };

  const salvarEdicao = async () => {
    try {
      await axios.put(`https://moonbookmarks-back.onrender.com/bookmarks/${id}`, {
        ...bookmark,
        status: novoStatus,
        progresso: Number(novoProgresso),
        comentario: novoComentario,
      });
      Alert.alert("Sucesso", "Bookmark atualizada!");
      setEditModalVisible(false);
      const res = await axios.get(`https://moonbookmarks-back.onrender.com/bookmarks/${id}`);
      setBookmark(res.data);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível salvar.");
    }
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

  const removerColecao = (colecaoId: string) => {
    Alert.alert("Remover Coleção", "Tem certeza que deseja desvincular essa coleção?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        onPress: () => {
          removeColecaoFromBookmark({ bookmarkId: id, colecaoId });
          setColecoesDoBookmark(colecoesDoBookmark.filter(cid => cid !== colecaoId));
        },
      },
    ]);
  };

  const abrirModal = () => {
    setModalVisible(true);
    carregarColecoes();
  };

  if (!bookmark) return <ActivityIndicator color="#9748FF" style={{position: "absolute", top: "50%", 
  left: "50%", transform: [{ translateX: -12 }, { translateY: -12 }],}}/>;

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Bookmark</Text>
      </View>

     
      <Image source={{ uri: `data:image/jpeg;base64,${bookmark.obra.imagem}` }} style={styles.bookmarkImage} />
      <Text style={styles.titulo}>{bookmark.obra.titulo}</Text>
      <Text style={styles.capitulo}>{bookmark.obra.descricao}</Text>
      <Text style={styles.status}>Status: {statusLabels[bookmark.status]}</Text>
      <Text style={styles.progresso}>Progresso: {bookmark.progresso}</Text>
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

        <TouchableOpacity style={styles.colecaoButton} onPress={abrirModal}>
          <MaterialIcons name="collections-bookmark" size={20} color="white" />
          <Text style={styles.editButtonText}>Coleções</Text>
        </TouchableOpacity>
      </View>

   
      <ModalCustomizado isVisible={modalVisible} onClose={() => setModalVisible(false)} title="Coleções">
        {colecoesBookmark && colecoesBookmark.length > 0 ? (
          <ScrollView>
            {colecoesBookmark.map((colecao) => {
              const estaNaColecao = colecoesDoBookmark.includes(colecao.id);
              return (
                <TouchableOpacity
                  key={colecao.id}
                  onPress={() => {
                    router.push(`/detalhescolecao/${colecao.id}`);
                    setModalVisible(false);
                  }}
                  onLongPress={() => {
                    if (estaNaColecao) removerColecao(colecao.id);
                  }}
                  style={[styles.colecaoItemContainer, estaNaColecao && styles.colecaoAtiva]}
                >
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${colecao.foto}` }}
                    style={styles.colecaoImagem}
                  />
                  <View style={styles.colecaoTextoContainer}>
                    <Text style={styles.colecaoTitulo}>
                      {estaNaColecao ? "✓ " : ""}{colecao.titulo}
                    </Text>
                    <Text style={styles.colecaoDescricao}>{colecao.descricao}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>Este bookmark ainda não está em nenhuma coleção.</Text>
        )}

      </ModalCustomizado>

      
      <ModalCustomizado isVisible={editModalVisible} onClose={() => setEditModalVisible(false)} title="Editar Bookmark">
        <ScrollView contentContainerStyle={{ gap: 12 }}>
          <Text>Status</Text>
          <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6 }}>
            <Picker selectedValue={novoStatus} onValueChange={setNovoStatus}>
              {Object.entries(statusLabels).map(([value, label]) => (
                <Picker.Item key={value} label={label} value={value} />
              ))}
            </Picker>
          </View>

          <Text>Progresso</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8 }}
            value={novoProgresso}
            onChangeText={setNovoProgresso}
            keyboardType="numeric"
          />

          <Text>Comentário</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8, height: 100 }}
            value={novoComentario}
            onChangeText={setNovoComentario}
            multiline
          />

          <TouchableOpacity style={[styles.editButton, { marginTop: 10 }]} onPress={salvarEdicao}>
            <Text style={{ color: "white", textAlign: "center" }}>Salvar</Text>
          </TouchableOpacity>
        </ScrollView>
      </ModalCustomizado>
    </View>
  );
}
