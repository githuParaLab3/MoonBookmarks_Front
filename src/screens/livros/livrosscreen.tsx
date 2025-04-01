import { Button } from "@/src/components/Button";
import { ThemedView } from "@/src/components/ThemedView";
import { StyleSheet } from 'react-native';
import { useState } from "react";
import { ThemedText } from "@/src/components/ThemedText";
import BotaoColecao from "@/src/components/BotaoColecao";

export function LivrosScreen() {

  return (
    <ThemedView style={styles.container}>

      <BotaoColecao titulo1="Coleção 1" titulo2="Coleção 2" />   

      <ThemedText>Livros</ThemedText>

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
});