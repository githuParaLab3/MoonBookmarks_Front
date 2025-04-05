import React, { useState, useEffect } from "react";
import { FlatList, TextInput, StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";

export function BookmarksScreen() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<any[]>([]);
  const [searchText, setSearchText] = useState(""); 
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get("https://moonbookmarks-back.onrender.com/bookmarks");
      setBookmarks(response.data);
      setFilteredBookmarks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar bookmarks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredBookmarks(bookmarks);
    } else {
      const filtered = bookmarks.filter((bookmark) => {
        const titulo = bookmark.obra?.titulo || "";  // Acessando o título da obra
        return titulo.toLowerCase().includes(searchText.toLowerCase());
      });
      setFilteredBookmarks(filtered);
    }
  }, [searchText, bookmarks]);

  const renderBookmark = ({ item }: { item: any }) => {
    // Aqui estamos acessando o título da obra associada ao bookmark
    const title = item.obra?.titulo || "Título não disponível";  // Acessando o título da obra corretamente
    const imageUrl = item.obra?.imagem && item.obra.imagem.trim() ? item.obra.imagem : "https://m.media-amazon.com/images/I/81qPzeEO5IL.jpg";

    return (
      <Pressable 
        style={styles.bookmarkItem}
        onPress={() => router.push(`/detalhesbookmark/${item.id}`)} 
      >
        <Image source={{ uri: imageUrl }} style={styles.imagem} />
        <View style={styles.textoContainer}>
          <Text style={styles.titulo}>{title}</Text>
          <Text style={styles.progresso}>
            Progresso: {item.progresso ? `${item.progresso}%` : "Não iniciado"}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar bookmark..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText} 
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <FlatList
          style={styles.margemFlatlist}
          data={filteredBookmarks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookmark}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum bookmark encontrado</Text>}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#8e24aa",
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
  margemFlatlist: {
    width: "100%",
    marginTop: 10,
  },
  bookmarkItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#8e24aa",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagem: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  textoContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  progresso: {
    fontSize: 14,
    color: "#6200ee",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
});
