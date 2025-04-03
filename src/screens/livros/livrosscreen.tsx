import { ThemedView } from "@/src/components/ThemedView";
import { StyleSheet, FlatList, View, Text, ActivityIndicator, Image } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderScreen from "@/src/components/HeaderScreen";
import BotaoColecao from "@/src/components/BotaoColecao";
import ColecoesScreen from "../colecoes";

export function LivrosScreen() {
  const [selectedTab, setSelectedTab] = useState("Bookmarks");
  const [obras, setObras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchObras = async () => {
    try {
      const response = await axios.get("https://moonbookmarks-back.onrender.com/obras");
      setObras(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar obras:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObras();
  }, []);

  const renderObra = ({ item }: { item: any }) => {
    const imageUrl = item.imagem || "https://via.placeholder.com/150";
    return (
      <View style={styles.obraItem}>
        <Image source={{ uri: imageUrl }} style={styles.imagem} onError={() => console.log("Erro ao carregar a imagem")} />
        <View style={styles.textoContainer}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.progresso}>
            Progresso: {item.progresso ? `${item.progresso}%` : "Não iniciado"}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <HeaderScreen />
      <BotaoColecao
        titulo1="Bookmarks"
        titulo2="Coleções"
        onPress1={() => setSelectedTab("Bookmarks")}
        onPress2={() => setSelectedTab("Coleções")}
        selectedTab={selectedTab}
      />

      {selectedTab === "Bookmarks" ? (
        loading ? (
          <ActivityIndicator size="large" color="#6200ee" />
        ) : (
          <FlatList
            style={styles.margemFlatlist}
            data={obras}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderObra}
            showsVerticalScrollIndicator={false}
          />
        )
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
  margemFlatlist: {
    width:"80%",
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
});
