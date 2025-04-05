import React, { useState, useEffect } from "react";
import { FlatList, TextInput, StyleSheet, Text, View, Image, Pressable, ActivityIndicator, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";

const tipos = [
  "MANGA", "MANHWA", "MANHUA", "HQ", "LIVRO", "NOVEL", "ANIME", "DESENHO", "SERIE", "FILME"
];

const status = [
  "PLANEJADO",
  "EM_PROGRESSO",
  "PAUSADO",
  "CONCLUIDO",
  "ABANDONADO"
];

export function BookmarksScreen() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<any[]>([]);
  const [searchText, setSearchText] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>("Todos");
  const [selectedStatus, setSelectedStatus] = useState<string | null>("Todos");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
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
    let filtered = bookmarks;

    if (searchText.trim() !== "") {
      filtered = filtered.filter((bookmark) => {
        const titulo = bookmark.obra?.titulo || "";  
        return titulo.toLowerCase().includes(searchText.toLowerCase());
      });
    }

    if (selectedType && selectedType !== "Todos") {
      filtered = filtered.filter((bookmark) => bookmark.obra?.tipo === selectedType);
    }

    if (selectedStatus && selectedStatus !== "Todos") {
      filtered = filtered.filter((bookmark) => bookmark.status === selectedStatus);
    }

    setFilteredBookmarks(filtered);
  }, [searchText, bookmarks, selectedType, selectedStatus]);

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const renderBookmark = ({ item }: { item: any }) => {
    const title = item.obra?.titulo || "Título não disponível";  
    const imageUrl = item.obra?.imagem && item.obra.imagem.trim() ? item.obra.imagem : null;

    const isBase64 = (url: string) => url && (url.startsWith('data:image') || url.startsWith('data:application'));

    const imageSource = isBase64(imageUrl)
      ? { uri: imageUrl }
      : { uri: "https://m.media-amazon.com/images/I/81qPzeEO5IL.jpg" };

    return (
      <Pressable 
        style={styles.bookmarkItem}
        onPress={() => router.push(`/detalhesbookmark/${item.id}`)} 
      >
        <Image source={imageSource} style={styles.imagem} />
        <View style={styles.textoContainer}>
          <Text style={styles.titulo}>{title}</Text>
          <Text style={styles.progresso}>
            Progresso: {item.progresso ? `${item.progresso}` : "Não iniciado"}
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
        <TouchableOpacity onPress={() => setShowAdvancedSearch(true)} style={styles.advancedSearchIcon}>
          <Ionicons name="options" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showAdvancedSearch}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAdvancedSearch(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowAdvancedSearch(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Filtros de Pesquisa</Text>

                <Text style={styles.modalSubTitle}>Status</Text>
                <FlatList
                  data={["Todos", ...status]}  
                  horizontal
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        setSelectedStatus(item);
                        setShowAdvancedSearch(false);
                      }}
                      style={[styles.typeItem, selectedStatus === item && styles.selectedTypeItem]}
                    >
                      <Text style={styles.typeText}>{capitalizeFirstLetter(item)}</Text>
                    </Pressable>
                  )}
                  keyExtractor={(item) => item}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <FlatList
        data={["Todos", ...tipos]} 
        horizontal
        style={styles.typeList}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSelectedType(item)}
            style={[styles.typeItem, selectedType === item && styles.selectedTypeItem]}
          >
            <Text style={styles.typeText}>{capitalizeFirstLetter(item)}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
      />

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
    marginTop:40,
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
  advancedSearchIcon: {
    marginLeft: 10,
  },
  typeList: {
    marginBottom: 20,
    height: 40,
    maxHeight: 40,
  },
  typeItem: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 20,
  },
  selectedTypeItem: {
    backgroundColor: "#8e24aa",
  },
  typeText: {
    color: "#333",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalSubTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bookmarkItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#8e24aa",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  imagem: {
    width: 60,
    height: 80,
    borderRadius: 5,
    marginRight: 12,
  },
  textoContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  progresso: {
    color: "#777",
    fontSize: 14,
  },
  margemFlatlist: {
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});
