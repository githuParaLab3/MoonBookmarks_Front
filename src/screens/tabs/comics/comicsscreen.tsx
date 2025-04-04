import { Button } from "@/src/components/Button";
import { ThemedView } from "@/src/components/ThemedView";
import { StyleSheet } from 'react-native';
import { useState } from "react";
import { ThemedText } from "@/src/components/ThemedText";
import BotaoColecao from "@/src/components/BotaoColecao";
import Header from "@/src/components/Header";
import DetalhesColecoesScreen from "../detalhes/detalhescolecao";
export function ComicsScreen() {

  return (
    <ThemedView style={styles.container}> 

      <Header/>

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