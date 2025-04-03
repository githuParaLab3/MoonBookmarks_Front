import { useState, useEffect } from "react";
import { 
  StyleSheet, View, TextInput, FlatList, ActivityIndicator, 
  TouchableOpacity, Modal, Keyboard, TouchableWithoutFeedback 
} from "react-native";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import FloatingActionButton from "@/src/components/FloatingActionButton";
import { Ionicons } from "@expo/vector-icons";
import { Button, Card, Text, Paragraph } from "react-native-paper";

const tipos = [ "ANIME", "MANGA", "MANHUA", "MANHWA", "SERIE", "FILME", "NOVEL", "LIVRO"];

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
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [novoAutor, setNovoAutor] = useState("");
  const [novoTipo, setNovoTipo] = useState("");
  const [novoGeneros, setNovoGeneros] = useState("");

  useEffect(() => {
    fetchObras();
  }, []);

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

  const adicionarObra = async () => {
    if (!novoTitulo || !novaDescricao || !novoAutor || !novoTipo || !novoGeneros) {
      alert("Preencha todos os campos!");
      return;
    }

    const novaObra = {
      titulo: novoTitulo,
      descricao: novaDescricao,
      autor: novoAutor,
      tipo: novoTipo.toUpperCase(),
      generos: novoGeneros.split(",").map((g) => g.trim()),
    };

    try {
      await axios.post("https://moonbookmarks-back.onrender.com/obras", novaObra);
      setModalVisible(false);
      fetchObras();
      setNovoTitulo("");
      setNovaDescricao("");
      setNovoAutor("");
      setNovoTipo("");
      setNovoGeneros("");
    } catch (error) {
      console.error("Erro ao adicionar obra:", error);
    }
  };

  const filteredObras = obras.filter(
    (obra) =>
      (obra.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obra.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obra.descricao.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTipo === "" || obra.tipo.toLowerCase() === selectedTipo.toLowerCase()) &&
      (generoFilter === "" || obra.generos.some((genero) => genero.toLowerCase().includes(generoFilter.toLowerCase())))
  );

  return (
    <ThemedView style={styles.container}>
      <FloatingActionButton onPress={() => setModalVisible(true)} />

      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={20} color="#9748FF" style={styles.icon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#777"
          />
          <TouchableOpacity onPress={() => setFilterModalVisible(true)} >
            <Ionicons name="options-outline" size={24} color="#9748FF" />
          </TouchableOpacity>
        </View>
      </View>

      <ThemedText style={styles.title}>Obras</ThemedText>

      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <FlatList
          style={styles.flatlist}
          showsVerticalScrollIndicator={false}
          data={filteredObras}
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
            </Card>
          )}
        />
      )}

      {/* Modal de Filtros */}
      <Modal visible={filterModalVisible} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)} >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Filtrar Obras</Text>

              <TextInput
                style={styles.modalInput}
                placeholder="Filtrar por gênero"
                value={generoFilter}
                onChangeText={setGeneroFilter}
                placeholderTextColor="#777"
              />

              <Picker selectedValue={selectedTipo} style={styles.picker} onValueChange={setSelectedTipo}>
                <Picker.Item label="Selecione o tipo de obra" value="" />
                {tipos.map((tipo) => (
                  <Picker.Item key={tipo} label={tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase()} value={tipo.toLowerCase()} />
                ))}
              </Picker>

              <Button mode="contained" onPress={() => setFilterModalVisible(false)} style={{backgroundColor:"#9748FF"}}>
                Aplicar Filtros
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal de Criação de Obra */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.bottomModalContainer}>
            <View style={styles.bottomModal}>
              <Text style={styles.modalTitle}>Adicionar Nova Obra</Text>

              <TextInput style={styles.modalInput} placeholder="Título" value={novoTitulo} onChangeText={setNovoTitulo} />
              <TextInput style={styles.modalInput} placeholder="Descrição" value={novaDescricao} onChangeText={setNovaDescricao} />
              <TextInput style={styles.modalInput} placeholder="Autor" value={novoAutor} onChangeText={setNovoAutor} />
              <TextInput style={styles.modalInput} placeholder="Gêneros (separados por vírgula)" value={novoGeneros} onChangeText={setNovoGeneros} />

              <Picker selectedValue={novoTipo} style={styles.picker} onValueChange={setNovoTipo}>
                <Picker.Item label="Selecione o tipo de obra" value="" />
                {tipos.map((tipo) => (
                  <Picker.Item key={tipo} label={tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase()} value={tipo.toUpperCase()} />
                ))}
              </Picker>

              <Button mode="contained" onPress={adicionarObra} style={{backgroundColor:"#9748FF"}}>
                Adicionar
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  bottomModalContainer: { 
    flex: 1, 
    justifyContent: "flex-end",
  },
  bottomModal: { 
    backgroundColor: "#FFFFFF", 
    padding: 20, 
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 12,
    paddingHorizontal: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
    color: "#9748FF",
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#333",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  flatlist: {
    width: "100%",
  },
  obraItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderColor: "#9748FF",
    borderWidth: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  autor: {
    fontSize: 12,
    color: "#666",
  },
  tipo: {
    fontSize: 12,
    color: "#777",
  },
  generos: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  modalInput: {
    height: 40,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#F8F8F8",
    color: "#333",
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    height: 50,
    backgroundColor: "#F8F8F8",
    color: "#333",
    borderRadius: 5,
    marginBottom: 10,
  },
});


