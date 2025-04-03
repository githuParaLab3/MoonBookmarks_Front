import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const collections = [
  { id: "1", category: "Animes", title: "Os melhores", items: 7, type: "Mangás" },
  { id: "2", category: "Séries", title: "Os melhores", items: 7, type: "Mangás" },
  { id: "3", category: "Filmes", title: "Os melhores", items: 7, type: "Mangás" },
];

export function ColecoesScreen() {
  const router = useRouter();

  return (
    <FlatList
      style={styles.flatlist}
      data={collections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text style={styles.categoryTitle}>{item.category}</Text>
          <TouchableOpacity onPress={() => router.push("/")} style={styles.collectionCard}>
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={30} color="gray" />
            </View>
            <View style={styles.collectionInfo}>
              <Text style={styles.collectionTitle}>{item.title}</Text>
              <Text style={styles.collectionItems}>{item.items} obras na lista</Text>
              <Text style={styles.collectionType}>{item.type}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  flatlist: {
    width: "80%",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  collectionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9C27B0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  collectionInfo: {
    marginLeft: 12,
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  collectionItems: {
    fontSize: 14,
    color: "gray",
  },
  collectionType: {
    fontSize: 14,
    color: "gray",
  },
});
