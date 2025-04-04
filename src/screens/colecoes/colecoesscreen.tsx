import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";

export function ColecoesScreen() {
  const [collections, setCollections] = useState<any[]>([]);  // Lista de coleções
  const [filteredCollections, setFilteredCollections] = useState<any[]>([]);  // Coleções filtradas
  const [searchText, setSearchText] = useState("");  // Texto de pesquisa
  const [loading, setLoading] = useState(true);  // Estado de carregamento
  const router = useRouter();

  // Função para buscar coleções da API
  const fetchCollections = async () => {
    try {
      const response = await axios.get("https://moonbookmarks-back.onrender.com/colecoes"); // Ajuste para a URL real da sua API
      setCollections(response.data);
      setFilteredCollections(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar coleções:", error);
      setLoading(false);
    }
  };

  // Chama a função de busca de coleções quando o componente for montado
  useEffect(() => {
    fetchCollections();
  }, []);

  // Atualiza as coleções filtradas com base no texto de pesquisa
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
          showsHorizontalScrollIndicator={false}
          data={filteredCollections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.collectionItem}>
              <Text style={styles.categoryTitle}>{item.titulo || "Sem título"}</Text>
              <TouchableOpacity onPress={() => router.navigate("/(detalhescolecao)")}>
                <View style={styles.collectionCard}>
                  <View style={styles.imagePlaceholder}>
                    <Ionicons name="image-outline" size={30} color="gray" />
                  </View>
                  <View style={styles.collectionInfo}>
                    <Text style={styles.collectionTitle}>{item.titulo || "Coleção sem nome"}</Text>
                    <Text style={styles.collectionItems}>{item.bookmarks?.length || 0} obras na lista</Text>
                    <Text style={styles.collectionType}>Tipo: {item.tipo || "Desconhecido"}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma coleção encontrada</Text>}
        />
      )}
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
    borderColor: "#9C27B0",
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
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  collectionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9C27B0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  collectionInfo: {
    marginLeft: 12,
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  collectionItems: {
    fontSize: 14,
    color: "gray",
  },
  collectionType: {
    fontSize: 14,
    color: "gray",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
});
