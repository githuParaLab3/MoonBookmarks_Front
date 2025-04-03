import { Button } from "react-native";
import { ThemedView } from "@/src/components/ThemedView";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { ThemedText } from "@/src/components/ThemedText";
import HeaderScreen from "@/src/components/HeaderScreen";
import ColecoesScreen from "../colecoes";
import ConfiguracoesScreen from "../configuracoes";
import ModalDelecao from "@/src/components/ModalDelecao"; // 🔹 Importando o modal

export function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ThemedView style={styles.container}>

      <HeaderScreen/>
      
      <ThemedText>Home</ThemedText>


      <Button title="Abrir Modal" onPress={() => setModalVisible(true)} />

     
      <ModalDelecao
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          console.log("Item excluído!");
          setModalVisible(false);
        }}
      />
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
    alignItems: "center",
  },
});
