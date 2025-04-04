import { ThemedView } from "@/src/components/ThemedView";
import { StyleSheet, FlatList, View, Text, ActivityIndicator, Image, TouchableOpacity, TextInput } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/src/components/Header";
import BotaoColecao from "@/src/components/BotaoColecao";
import ColecoesScreen from "../../colecoes";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Importando ícones

export function LivrosScreen() {
  const [selectedTab, setSelectedTab] = useState("Bookmarks");
  const [obras, setObras] = useState<any[]>([]);
  const [filteredObras, setFilteredObras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const fetchObras = async () => {
    try {
      const response = await axios.get("https://moonbookmarks-back.onrender.com/obras");
      setObras(response.data);
      setFilteredObras(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar obras:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObras();
  }, []);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredObras(obras);
    } else {
      const filtered = obras.filter((obra) =>
        obra.titulo.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredObras(filtered);
    }
  }, [searchText, obras]);

  const renderObra = ({ item }: { item: any }) => {
    const imageUrl = item.imagem && item.imagem.trim() ? item.imagem : "https://m.media-amazon.com/images/I/81qPzeEO5IL.jpg";

    return (
      <TouchableOpacity onPress={() => router.navigate('/')} style={styles.obraItem}>
        <Image source={{ uri: imageUrl }} style={styles.imagem} />
        <View style={styles.textoContainer}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.progresso}>
            Progresso: {item.progresso ? `${item.progresso}%` : "Não iniciado"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Header />
      <BotaoColecao
        titulo1="Bookmarks"
        titulo2="Coleções"
        onPress1={() => setSelectedTab("Bookmarks")}
        onPress2={() => setSelectedTab("Coleções")}
        selectedTab={selectedTab}
      />

      {selectedTab === "Bookmarks" ? (
        <>
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
              data={filteredObras}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderObra}
              ListEmptyComponent={<Text style={styles.emptyText}>Nenhum bookmark encontrado</Text>}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      ) : (
        <ColecoesScreen />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  margemFlatlist: {
    width: "90%",
    marginBottom: 10,
    marginTop: 10,
  },
  obraItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#8e24aa",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
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
