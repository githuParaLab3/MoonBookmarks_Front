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
      mediaTypes: ["images"],
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

      <FloatingActionButton onPress={() => setModalVisible(true)} style={{ bottom: 80, right: 5 }}/>

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
    padding: 24,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#9748FF",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 10,
    color: "#9748FF",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
  },
  flatlist: {
    width: "100%",
  },
  collectionItem: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#222222",
  },
  collectionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",

    // Removendo completamente a sombra
    shadowColor: "transparent",
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  imagePlaceholder: {
    width: 72,
    height: 72,
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  collectionImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    resizeMode: "cover",
  },
  collectionInfo: {
    marginLeft: 16,
    flex: 1,
  },
  collectionTitle: {
    display: "none",
  },
  collectionItems: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 40,
    fontStyle: "italic",
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  bottomSheet: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    // Removendo sombra do bottom sheet
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
    marginBottom: 20,
    textAlign: "center",
  },
  modalInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#CCC",
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#F8F8F8",
    marginBottom: 14,
    color: "#333",
  },
  imagePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9748FF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  imagePickerText: {
    color: "#FFFFFF",
    marginLeft: 10,
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    marginHorizontal: 6,
    alignItems: "center",
    backgroundColor: "#9748FF",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
