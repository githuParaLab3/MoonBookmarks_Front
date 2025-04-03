import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "@/src/components/Header";

const collections = [
  { id: "1", name: "Mangás", icon: "book-outline" },
  { id: "2", name: "HQs", icon: "library-outline" },
  { id: "3", name: "Favoritos", icon: "heart-outline" },
];

export  function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header/>

      <Text style={styles.sectionTitle}>Suas Coleções</Text>

      <FlatList
        data={collections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.collectionItem} onPress={() => router.push(`/`)}>
            <Ionicons name={item.icon as any} size={24} color="#8A42F5" />
            <Text style={styles.collectionText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => router.push("/")}>
        <Ionicons name="add-outline" size={30} color="#fff" />
      </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#8A42F5",
    marginBottom: 10,
    marginTop:60
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
