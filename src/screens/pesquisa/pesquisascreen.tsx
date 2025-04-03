import { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, FlatList, ActivityIndicator } from "react-native";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import ModalScreen from "@/src/components/ModalScreen"; 
import FloatingActionButton from "@/src/components/FloatingActionButton";
import { Ionicons } from "@expo/vector-icons";
import { Button, Card, Text, Paragraph, TouchableRipple } from "react-native-paper";

declare global {
  interface String {
    capitalize(): string;
  }
}

const tipos = ["", "ANIME", "MANGA", "MANHUA", "MANHWA", "SERIE", "FILME", "NOVEL", "LIVRO"];

interface Obra {
  id: number;
  titulo: string;
  descricao: string;
  autor: string;
  tipo: string;
  generos: string[];
}

export function PesquisaScreen() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("");
  const [generoFilter, setGeneroFilter] = useState("");
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const fetchObras = async () => {
    try {
      const response = await axios.get("https://moonbookmarks-back.onrender.com/obras");
      setObras(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter as obras:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObras();
  }, []);

  String.prototype.capitalize = function (): string {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  };

  return (
    <ThemedView style={styles.container}>
      <FloatingActionButton onPress={() => setModalVisible(true)} />

      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.icon} />
          <TextInput style={styles.searchInput} placeholder="Pesquisar..." value={searchTerm} onChangeText={setSearchTerm} placeholderTextColor="#777" />
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TextInput style={styles.generoInput} placeholder="Filtrar por gênero" value={generoFilter} onChangeText={setGeneroFilter} placeholderTextColor="#777" />
        <Picker selectedValue={selectedTipo} style={styles.picker} onValueChange={(itemValue: string) => setSelectedTipo(itemValue)}>
          {tipos.map((tipo) => (
            <Picker.Item key={tipo} label={tipo.capitalize() || "Todos"} value={tipo} />
          ))}
        </Picker>
      </View>

      <ThemedText style={styles.title}>Obras</ThemedText>

      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <FlatList
          style={styles.flatlist}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={obras}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.obraItem}>
              <Card.Content>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Paragraph>{item.descricao}</Paragraph>
                <Text style={styles.autor}>Autor: {item.autor}</Text>
                <Text style={styles.tipo}>Tipo: {item.tipo}</Text>
                <Text style={styles.generos}>Gêneros: {item.generos.join(", ")}</Text>
              </Card.Content>
              <Card.Actions>
                <TouchableRipple onPress={() => console.log("Deletar")} style={styles.deleteButton}>
                  <Text style={styles.deleteText}>Deletar</Text>
                </TouchableRipple>
              </Card.Actions>
            </Card>
          )}
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
  searchContainer: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#333",
  },
  filterContainer: {
    flexDirection: "row", // Deixa os elementos na mesma linha
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 20,
  },
  generoInput: {
    flex: 1, // Faz o input ocupar o máximo possível do espaço disponível
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#fff",
    marginRight: 10, // Dá um espaço entre o input e o picker
  },
  picker: {
    width: 150,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  flatlist: {
    width: "90%",
  },
  obraItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
    borderColor: "#8e24aa",
    borderWidth: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  autor: {
    fontSize: 12,
    color: "#777",
  },
  tipo: {
    fontSize: 12,
    color: "#999",
  },
  generos: {
    fontSize: 12,
    color: "#333",
    marginTop: 5,
  },
  deleteButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#9748FF",
    alignItems: "center",
    marginTop: 10,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
