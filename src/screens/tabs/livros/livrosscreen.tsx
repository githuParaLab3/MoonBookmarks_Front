import React, { useState } from "react";
import { ThemedView } from "@/src/components/ThemedView";
import Header from "@/src/components/Header";
import BotaoColecao from "@/src/components/BotaoColecao";
import BookmarksScreen from "../../bookmarks"; // Importando o novo componente
import ColecoesScreen from "../../colecoes";

export function LivrosScreen() {
  const [selectedTab, setSelectedTab] = useState("Bookmarks");

  return (
    <ThemedView style={{ flex: 1, padding: 20 }}>
      <Header />
      <BotaoColecao
        titulo1="Bookmarks"
        titulo2="Coleções"
        onPress1={() => setSelectedTab("Bookmarks")}
        onPress2={() => setSelectedTab("Coleções")}
        selectedTab={selectedTab}
      />

      {selectedTab === "Bookmarks" ? (
        <BookmarksScreen /> 
      ) : (
        <ColecoesScreen />
      )}
    </ThemedView>
  );
}
