import { ThemedView } from "@/src/components/ThemedView";
import { StyleSheet, TextInput, FlatList, View, Text, ActivityIndicator, Button } from 'react-native';
import { useState, useEffect } from "react";
import { ThemedText } from "@/src/components/ThemedText";
import axios from 'axios';

interface Obra {
  id: number;
  titulo: string;
  descricao: string;
  autor: string;
  tipo: string;
  generos: string[];
}

export function ComicsScreen() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchObras = async () => {
    try {
      const response = await axios.get('https://moonbookmarks-back.onrender.com/obras');
      setObras(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao obter as obras:', error);
      setLoading(false);
    }
  };

  const deleteObra = async (id: number) => {
    try {
      await axios.delete(`https://moonbookmarks-back.onrender.com/obras/${id}`);
      setObras(obras.filter(obra => obra.id !== id));
    } catch (error) {
      console.error('Erro ao deletar a obra:', error);
    }
  };

  useEffect(() => {
    fetchObras();
  }, []);

  const filteredObras = obras.filter(obra =>
    obra.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obra.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obra.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar por título, autor ou descrição"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <ThemedText>Obras</ThemedText>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredObras}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.obraItem}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
              <Text style={styles.autor}>Autor: {item.autor}</Text>
              <Text style={styles.tipo}>Tipo: {item.tipo}</Text>
              <Text style={styles.generos}>Gêneros: {item.generos.join(', ')}</Text>
              <Button title="Deletar" onPress={() => deleteObra(item.id)} />
            </View>
          )}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  searchInput: {
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    marginTop:65
  },
  obraItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    width: '90%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descricao: {
    fontSize: 14,
    marginVertical: 5,
  },
  autor: {
    fontSize: 12,
    color: '#555',
  },
  tipo: {
    fontSize: 12,
    color: '#888',
  },
  generos: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
});
