import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const collections = [
  { id: "1", category: "Animes", title: "Os melhores", items: 7, type: "Mangás" },
  { id: "2", category: "Séries", title: "Os melhores", items: 7, type: "Mangás" },
  { id: "3", category: "Filmes", title: "Os melhores", items: 7, type: "Mangás" },
];

export function ColecoesScreen() {
  const navigation = useNavigation();

  return (
    

      <FlatList
        style={styles.flatlist}
        data={collections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.categoryTitle}>{item.category}</Text>
            <View style={styles.collectionCard}>
              <View style={styles.imagePlaceholder}>
                <Ionicons name="image-outline" size={30} color="gray" />
              </View>
              <View style={styles.collectionInfo}>
                <Text style={styles.collectionTitle}>{item.title}</Text>
                <Text style={styles.collectionItems}>{item.items} obras na lista</Text>
                <Text style={styles.collectionType}>{item.type}</Text>
              </View>
            </View>
          </View>
        )}
      />

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#9C27B0",
    padding: 10,
    borderRadius: 20,
    marginBottom: 16,
  },
  flatlist:{
    width:"80%"
  },
  headerText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  settingsButton: {
    backgroundColor: "#7B1FA2",
    padding: 6,
    borderRadius: 50,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  filterText: {
    fontSize: 16,
    color: "black",
    marginRight: 16,
  },
  selectedFilter: {
    backgroundColor: "#9C27B0",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  selectedFilterText: {
    color: "white",
    fontSize: 16,
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
  fab: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#9C27B0",
    padding: 16,
    borderRadius: 50,
    elevation: 4,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#9C27B0",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
