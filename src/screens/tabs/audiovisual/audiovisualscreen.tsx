import { Button } from "@/src/components/Button";
import { ThemedView } from "@/src/components/ThemedView";
import { StyleSheet } from 'react-native';
import { useState } from "react";
import { ThemedText } from "@/src/components/ThemedText";
import BotaoColecao from "@/src/components/BotaoColecao";
import Header from "@/src/components/Header";
import BookmarksScreen from "../../bookmarks";
import ColecoesScreen from "../../colecoes";

export function AudiovisualSreen() {
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
  

