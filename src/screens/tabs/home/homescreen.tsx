import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import Header from "@/src/components/Header";
import ColecoesScreen from "@/src/components/colecoesscreen";


export  function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header/>

      <Text style={styles.sectionTitle}>Suas Coleções</Text>

      <ColecoesScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8A42F5",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
  },
  sectionTitle: {
    textAlign:"center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#8A42F5",
    marginBottom: 10,
    marginTop:30
  },
  collectionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  collectionText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#8A42F5",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});
