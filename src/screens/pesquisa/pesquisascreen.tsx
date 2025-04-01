
import { ThemedView } from "@/src/components/ThemedView";
import { StyleSheet, TextInput, View, Button } from 'react-native';
import { useState } from "react";
import { ThemedText } from "@/src/components/ThemedText";
import axios from 'axios';

export function PesquisaScreen() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [autor, setAutor] = useState("");
  const [tipo, setTipo] = useState("");
  const [imagem, setImagem] = useState("");
  const [generos, setGeneros] = useState("");
  const [message, setMessage] = useState("");

  const criarObra = () => {
    const novaObra = {
      titulo,
      descricao,
      autor,
      tipo,
      imagem,
      generos: generos.split(",").map(genre => genre.trim()), // Convertendo string para array de gêneros
    };
    

    axios.post('https://moonbookmarks-back.onrender.com/obras', novaObra, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      setMessage("Obra criada com sucesso!");
    })
    .catch(error => {
      console.log(error.response || error.message);
      setMessage("Erro ao criar a obra: " + error.message);
    });
    
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Criar Obra</ThemedText>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
        />
        <TextInput
          style={styles.input}
          placeholder="Autor"
          value={autor}
          onChangeText={setAutor}
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo (ex: MANGA)"
          value={tipo}
          onChangeText={setTipo}
        />
        <TextInput
          style={styles.input}
          placeholder="Imagem (URL)"
          value={imagem}
          onChangeText={setImagem}
        />
        <TextInput
          style={styles.input}
          placeholder="Gêneros (separados por vírgula)"
          value={generos}
          onChangeText={setGeneros}
        />
        <Button onPress={criarObra} title="Criar Obra" />
      </View>

      {message && <ThemedText>{message}</ThemedText>}
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
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  footerContainer: {
    height: 60,
    alignItems: 'center',
  },
});
