import { Button } from "@/src/components/Button";
import { ThemedView } from "@/src/components/ThemedView";
import { StyleSheet } from 'react-native';
import { useState } from "react";
import BotaoColecao from "@/src/components/BotaoColecao";
import Header from "@/src/components/Header";
import BookmarksScreen from "../../bookmarks";
import ColecoesScreen from "../../colecoes";

export function ComicsScreen() {
const [selectedTab, setSelectedTab] = useState("Bookmarks");

  return (
    <BookmarksScreen /> 
    
  );
}

