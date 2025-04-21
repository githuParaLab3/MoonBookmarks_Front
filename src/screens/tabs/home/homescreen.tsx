import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import FloatingActionButton from "@/src/components/FloatingActionButton";
import * as ImagePicker from "expo-image-picker";
import { useColecoes, useCreateColecao } from "@/src/hooks/useColecoes"; 
import styles from "./homescreen.styles";
import Header from "@/src/components/Header";
import ModalCustomizado from "@/src/components/ModalCustomizado";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [novaColecao, setNovaColecao] = useState({
    titulo: "",
    descricao: "",
    foto: "",
  });
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  const { mutate: createColecao, status: createStatus } = useCreateColecao(); 
  const { data: colecoes, isLoading, error, refetch } = useColecoes(); 

  
  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      setUserId(storedUserId);
    };
    fetchUserId();
  }, []); 

  const handleCreateCollection = () => {
    if (!novaColecao.titulo) {
      alert("O título da coleção é obrigatório");
      return;
    }
    if (!userId) {
      alert("Usuário não está logado.");
      return;
    }
    createColecao(
      {
        ...novaColecao,
        usuario: { id: userId }, 
      },
      {
        onSuccess: () => {
        
          refetch();
        },
        onError: () => {
          alert("Erro ao criar coleção. Tente novamente.");
        },
      }
    );
    setModalVisible(false);
    setNovaColecao({ titulo: "", descricao: "", foto: "" });
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      base64: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const base64 = result.assets[0].base64;
      setNovaColecao({
        ...novaColecao,
        foto: base64 || "",
      });
    }
  };


  const filteredCollections = colecoes?.filter((collection) =>
    collection.titulo?.toLowerCase().includes(searchText.toLowerCase())
  );

 
  if (isLoading) {
    return <ActivityIndicator size="large" color="#6200ee" />;
  }

  if (error) {
    return <Text>Erro ao carregar coleções: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar coleção..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
        data={filteredCollections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.collectionItem}>
              
              <TouchableOpacity
                onPress={() => router.push(`/detalhescolecao/${item.id}`)}
              >
                <View style={styles.collectionCard}>
                  {item.foto ? (
                    <Image
                      source={{
                        uri: `data:image/jpeg;base64,${item.foto}`,
                      }}
                      style={styles.collectionImage}
                    />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <Ionicons name="image-outline" size={30} color="gray" />
                    </View>
                  )}
                  <View style={styles.collectionInfo}>
                    <Text style={styles.collectionTitle}>{item.titulo}</Text>
                    <Text style={styles.collectionItems}>
                      {item.bookmarkIds?.length || 0}{" "}
                      {item.bookmarkIds?.length === 1
                        ? "bookmark"
                        : "bookmarks"}{" "}
                      na lista
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma coleção encontrada</Text>
        }
      />

      <FloatingActionButton
        onPress={() => setModalVisible(true)}
        style={{ bottom: 100, right: 24 }}
      />

      <ModalCustomizado
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Nova Coleção"
      >
        <TextInput
          placeholder="Título"
          style={styles.modalInput}
          value={novaColecao.titulo}
          onChangeText={(text) =>
            setNovaColecao({ ...novaColecao, titulo: text })
          }
        />
        <TextInput
          placeholder="Descrição"
          style={styles.modalInput}
          value={novaColecao.descricao}
          onChangeText={(text) =>
            setNovaColecao({ ...novaColecao, descricao: text })
          }
        />

        <TouchableOpacity
          style={styles.imagePickerButton}
          onPress={handlePickImage}
        >
          <Ionicons name="image" size={20} color="white" />
          <Text style={styles.imagePickerText}>Escolher Imagem</Text>
        </TouchableOpacity>

        {novaColecao.foto && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${novaColecao.foto}` }}
            style={styles.imagePreview}
          />
        )}

        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#ccc" }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={[styles.modalButtonText, { color: "#333" }]}>
              Cancelar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "#9748FF" }]}
            onPress={handleCreateCollection}
            disabled={createStatus === "pending"}
          >
            <Text style={styles.modalButtonText}>
              {createStatus === "pending" ? "Criando..." : "Criar"}
            </Text>
          </TouchableOpacity>
        </View>
      </ModalCustomizado>
    </View>
  );
}
