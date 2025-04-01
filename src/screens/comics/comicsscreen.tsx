
import { ThemedView } from "@/src/components/ThemedView";
import { StyleSheet, TextInput, FlatList, View, Text, ActivityIndicator, Button } from 'react-native';
import { useState, useEffect } from "react";
import { ThemedText } from "@/src/components/ThemedText";
import axios from 'axios';

// Definindo a interface para a obra
interface Obra {
  id: number;
  titulo: string;
  descricao: string;
  autor: string;
  tipo: string;
  generos: string[];
}

export function ComicsScreen() {
  const [obras, setObras] = useState<Obra[]>([]); // Definindo o tipo de obras como uma lista de Obra
  const [loading, setLoading] = useState(true); // Para mostrar um carregando enquanto busca as obras

  // Função para fazer a requisição GET e obter as obras
  const fetchObras = async () => {
    try {
      const response = await axios.get('https://moonbookmarks-back.onrender.com/obras');
      setObras(response.data); // Armazena as obras recebidas no estado
      setLoading(false); // Desativa o carregando
    } catch (error) {
      console.error('Erro ao obter as obras:', error);
      setLoading(false); // Desativa o carregando
    }
  };

  // Função para deletar uma obra
  const deleteObra = async (id: number) => {
    try {
      await axios.delete(`https://moonbookmarks-back.onrender.com/obras/${id}`); // Envia a requisição DELETE
      setObras(obras.filter(obra => obra.id !== id)); // Remove a obra da lista local
    } catch (error) {
      console.error('Erro ao deletar a obra:', error);
    }
  };

  // Carrega as obras assim que o componente for montado
  useEffect(() => {
    fetchObras();
  }, []); // O array vazio [] significa que isso será executado apenas uma vez quando o componente for montado

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Obras</ThemedText>

      {/* Exibe o carregando enquanto a requisição está em andamento */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        // Exibe a lista de obras quando a requisição for concluída
        <FlatList
          data={obras}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.obraItem}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
              <Text style={styles.autor}>Autor: {item.autor}</Text>
              <Text style={styles.tipo}>Tipo: {item.tipo}</Text>
              <Text style={styles.generos}>Gêneros: {item.generos.join(', ')}</Text>
              
              {/* Botão de Deletar */}
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
    paddingTop:20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
