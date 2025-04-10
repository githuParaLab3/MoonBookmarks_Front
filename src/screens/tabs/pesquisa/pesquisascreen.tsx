// src/screens/PesquisaScreen.tsx
import { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  Image,
} from "react-native";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import { Picker } from "@react-native-picker/picker";
import FloatingActionButton from "@/src/components/FloatingActionButton";
import { Ionicons } from "@expo/vector-icons";
import { Button, Card, Text, Paragraph } from "react-native-paper";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import styles from "./pesquisascreen.styles";
import { Tipo } from "@/src/types/enums";
import { Obra } from "@/src/types/obra";
import { useObras, useCreateObra } from "@/src/hooks/useObras";

export function PesquisaScreen() {
  // Hook para obter obras usando React Query
  const { data: obras, isLoading } = useObras();
  // Hook para criar uma obra
  const createObraMutation = useCreateObra();

  // Estados locais para filtros e modal
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("");
  const [generoFilter, setGeneroFilter] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Estados para criação de nova obra
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [novoAutor, setNovoAutor] = useState("");
  const [novoTipo, setNovoTipo] = useState("");
  const [novoGeneros, setNovoGeneros] = useState("");
  const [imagemBase64, setImagemBase64] = useState<string | null>(null);

  const router = useRouter();
  const tipos = Object.values(Tipo);

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar a galeria foi negada.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      base64: true,
      quality: 0.7,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      setImagemBase64(resultado.assets[0].base64 || null);
    }
  };

  const formatarTipo = (tipo: string | null | undefined) => {
    if (!tipo) return "Tipo desconhecido";
    return tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();
  };

  // Função para adicionar uma nova obra usando a mutação do React Query
  const adicionarObra = () => {
    if (
      !novoTitulo ||
      !novaDescricao ||
      !novoAutor ||
      !novoTipo ||
      !novoGeneros ||
      !imagemBase64
    ) {
      alert("Preencha todos os campos e selecione uma imagem!");
      return;
    }

    const novaObra = {
      titulo: novoTitulo,
      descricao: novaDescricao,
      autor: novoAutor,
      tipo: novoTipo.toUpperCase() as Tipo,
      generos: novoGeneros.split(",").map((g) => g.trim()),
      imagem: imagemBase64,
    };

    createObraMutation.mutate(novaObra, {
      onSuccess: () => {
        // Fecha o modal e limpa os campos
        setModalVisible(false);
        setNovoTitulo("");
        setNovaDescricao("");
        setNovoAutor("");
        setNovoTipo("");
        setNovoGeneros("");
        setImagemBase64(null);
      },
      onError: (error) => {
        console.error("Erro ao adicionar obra:", error);
      },
    });
  };

  // Filtrando as obras com base nos estados dos filtros e da busca
  const filteredObras = obras?.filter((obra) => {
    const titulo = obra.titulo ?? "";
    const autor = obra.autor ?? "";
    const descricao = obra.descricao ?? "";
    const tipo = obra.tipo ?? "";
    const generos = obra.generos ?? [];

    return (
      (titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        descricao.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTipo === "" ||
        tipo.toLowerCase() === selectedTipo.toLowerCase()) &&
      (generoFilter === "" ||
        generos.some((genero) =>
          (genero ?? "").toLowerCase().includes(generoFilter.toLowerCase())
        ))
    );
  }) || [];

  return (
    <ThemedView style={styles.container}>
      <FloatingActionButton
        onPress={() => setModalVisible(true)}
        style={{ bottom: 100, right: 24 }}
      />

      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#9748FF"
            style={styles.icon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#777"
          />
          <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
            <Ionicons name="options-outline" size={24} color="#9748FF" />
          </TouchableOpacity>
        </View>
      </View>

      <ThemedText style={styles.title}>Obras</ThemedText>

      {isLoading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <FlatList
          style={styles.flatlist}
          showsVerticalScrollIndicator={false}
          data={filteredObras}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/detalhesobra/${item.id}`)}
              style={styles.obraItem}
            >
              <Card style={{ elevation: 2, borderRadius: 10 }}>
                <Card.Content style={styles.cardContent}>
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${item.imagem}` }}
                    style={styles.obraImage}
                  />
                  <View style={styles.obraInfo}>
                    <Text style={styles.titulo}>{item.titulo}</Text>
                    <Paragraph numberOfLines={2} style={styles.descricao}>
                      {item.descricao}
                    </Paragraph>
                    <Text style={styles.autor}>Autor: {item.autor}</Text>
                    <Text style={styles.tipo}>
                      Tipo: {formatarTipo(item.tipo)}
                    </Text>
                    <Text style={styles.generos}>
                      Gêneros: {item.generos.join(", ")}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </Pressable>
          )}
        />
      )}

      {/* Modal de Filtros */}
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)}>
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
              <Picker
                selectedValue={selectedTipo}
                style={styles.picker}
                onValueChange={setSelectedTipo}
              >
                <Picker.Item label="Selecione o tipo de obra" value="" />
                {tipos.map((tipo) => (
                  <Picker.Item
                    key={tipo}
                    label={formatarTipo(tipo)}
                    value={tipo.toLowerCase()}
                  />
                ))}
              </Picker>
              <Button
                mode="contained"
                onPress={() => setFilterModalVisible(false)}
                style={{ backgroundColor: "#9748FF" }}
              >
                Aplicar Filtros
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal de Criação (Bottom Sheet) */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.bottomModalContainer}>
            <View style={styles.modalContainer} />
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.bottomModal}>
                <Text style={styles.modalTitle}>Adicionar Nova Obra</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Título"
                  value={novoTitulo}
                  onChangeText={setNovoTitulo}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Descrição"
                  value={novaDescricao}
                  onChangeText={setNovaDescricao}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Autor"
                  value={novoAutor}
                  onChangeText={setNovoAutor}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Gêneros (separados por vírgula)"
                  value={novoGeneros}
                  onChangeText={setNovoGeneros}
                />
                <Picker
                  selectedValue={novoTipo}
                  style={styles.picker}
                  onValueChange={setNovoTipo}
                >
                  <Picker.Item label="Selecione o tipo de obra" value="" />
                  {tipos.map((tipo) => (
                    <Picker.Item
                      key={tipo}
                      label={formatarTipo(tipo)}
                      value={tipo.toUpperCase()}
                    />
                  ))}
                </Picker>
                <Button
                  mode="outlined"
                  onPress={escolherImagem}
                  style={{ marginBottom: 10, borderColor: "#9748FF" }}
                >
                  Selecionar Imagem
                </Button>
                {imagemBase64 && (
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${imagemBase64}` }}
                    style={{
                      width: 100,
                      height: 100,
                      alignSelf: "center",
                      marginBottom: 10,
                      borderRadius: 8,
                    }}
                  />
                )}
                <Button
                  mode="contained"
                  onPress={adicionarObra}
                  style={{ backgroundColor: "#9748FF" }}
                >
                  Adicionar
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ThemedView>
  );
}
