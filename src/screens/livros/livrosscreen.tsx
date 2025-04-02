import { Button } from "@/src/components/Button";
import { ThemedView } from "@/src/components/ThemedView";
import { StyleSheet, FlatList, View, Text, ActivityIndicator, Image } from 'react-native';
import { useState, useEffect } from "react";
import { ThemedText } from "@/src/components/ThemedText";
import BotaoColecao from "@/src/components/BotaoColecao";
import axios from "axios";

export function LivrosScreen() {
  const [obras, setObras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar as obras do backend
  const fetchObras = async () => {
    try {
      const response = await axios.get('https://moonbookmarks-back.onrender.com/obras'); // Ajuste para o seu endpoint real
      setObras(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar obras:", error);
      setLoading(false);
    }
  };

  // Carregar as obras quando a tela for carregada
  useEffect(() => {
    fetchObras();
  }, []);

  // Função para renderizar os itens na FlatList
  const renderObra = ({ item }: { item: any }) => {
    const imageUrl = item.imagem || 'https://via.placeholder.com/150'; // Se não tiver imagem, usa o placeholder
    return (
      <View style={styles.obraItem}>
        <Image
          source={{ uri: imageUrl }} // Usando a URL da imagem ou o placeholder
          style={styles.imagem}
          onError={() => console.log("Erro ao carregar a imagem")} // Lida com erro de carregamento
        />
        <View style={styles.textoContainer}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.progresso}>Progresso: {item.progresso ? `${item.progresso}%` : "Não iniciado"}</Text>
        </View>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <BotaoColecao titulo1="Bookmarks" titulo2="Coleções" />

      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <FlatList
          style={styles.margemFlatlist}
          data={obras}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderObra}
          showsVerticalScrollIndicator={false}
        />
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
    marginBottom: 10,
    marginTop:120,
  },
  obraItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    width: "90%",
    borderRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#6200ee", // Borda roxa
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
    color: "#333", // Cor do título
  },
  progresso: {
    fontSize: 14,
    color: "#6200ee", // Cor roxa para o progresso
  },
});
