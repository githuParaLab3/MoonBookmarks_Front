import { Button } from "@/src/components/Button";
import { ThemedView } from "@/src/components/ThemedView";
import { StyleSheet, TextInput } from 'react-native';
import { useState } from "react";
import { ThemedText } from "@/src/components/ThemedText";

export function PesquisaScreen() {
  const [pesquisar, setPesquisar] = useState("")

  return (
    <ThemedView style={styles.container}>   
    <ThemedText>Pesquisa</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  footerContainer: {
    height: 60,
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});