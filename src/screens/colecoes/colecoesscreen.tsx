import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Modal,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import FloatingActionButton from "@/src/components/FloatingActionButton";
import * as ImagePicker from "expo-image-picker";

export function ColecoesScreen() {
  const [collections, setCollections] = useState<any[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [novaColecao, setNovaColecao] = useState({
    titulo: "",
    descricao: "",
    foto: "",
  });
  const router = useRouter();

  const fetchCollections = async () => {
    try {
      const response = await axios.get("https://moonbookmarks-back.onrender.com/colecoes");
      setCollections(response.data);
      setFilteredCollections(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar coleções:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredCollections(collections);
    } else {
      const filtered = collections.filter((collection) =>
        collection.titulo?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCollections(filtered);
    }
  }, [searchText, collections]);

  const handleCreateCollection = async () => {
    try {
      await axios.post("https://moonbookmarks-back.onrender.com/colecoes", {
        ...novaColecao,
        usuario: { id: "8fb0fe59-698b-45e3-8fb3-043e984b4e0d" },
      });
      setModalVisible(false);
      setNovaColecao({ titulo: "", descricao: "", foto: "" });
      fetchCollections();
    } catch (error) {
      console.error("Erro ao criar coleção:", error);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const base64 = result.assets[0].base64;
      setNovaColecao({ ...novaColecao, foto: `data:image/jpeg;base64,${base64}` });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar coleção..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <FlatList
          style={styles.flatlist}
          showsVerticalScrollIndicator={false}
          data={filteredCollections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.collectionItem}>
              <Text style={styles.categoryTitle}>{item.titulo || "Sem título"}</Text>
              <TouchableOpacity onPress={() => router.push(`/detalhescolecao/${item.id}`)}>
                <View style={styles.collectionCard}>
                  {item.foto ? (
                    <Image source={{ uri: item.foto }} style={styles.collectionImage} />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <Ionicons name="image-outline" size={30} color="gray" />
                    </View>
                  )}
                  <View style={styles.collectionInfo}>
                    <Text style={styles.collectionTitle}>{item.titulo}</Text>
                    <Text style={styles.collectionItems}>
                      {item.bookmarks?.length || 0} obras na lista
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma coleção encontrada</Text>}
        />
      )}

      <FloatingActionButton onPress={() => setModalVisible(true)} />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.bottomSheetContainer} onPress={() => setModalVisible(false)}>
          <KeyboardAvoidingView
            style={styles.bottomSheet}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            onStartShouldSetResponder={() => true}
          >
            <Text style={styles.modalTitle}>Nova Coleção</Text>
            <TextInput
              placeholder="Título"
              style={styles.modalInput}
              value={novaColecao.titulo}
              onChangeText={(text) => setNovaColecao({ ...novaColecao, titulo: text })}
            />
            <TextInput
              placeholder="Descrição"
              style={styles.modalInput}
              value={novaColecao.descricao}
              onChangeText={(text) => setNovaColecao({ ...novaColecao, descricao: text })}
            />
            <TouchableOpacity style={styles.imagePickerButton} onPress={handlePickImage}>
              <Ionicons name="image" size={20} color="white" />
              <Text style={styles.imagePickerText}>Escolher Imagem</Text>
            </TouchableOpacity>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: "#333" }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#9748FF" }]}
                onPress={handleCreateCollection}
              >
                <Text style={styles.modalButtonText}>Criar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#9748FF",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  flatlist: {
    width: "100%",
  },
  collectionItem: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  collectionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  collectionImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: "cover",
  },
  collectionInfo: {
    marginLeft: 12,
    flex: 1,
  },
  collectionTitle: {
    display: "none", // Removido do card para evitar repetição
  },
  collectionItems: {
    fontSize: 14,
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9748FF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePickerText: {
    color: "white",
    marginLeft: 8,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
