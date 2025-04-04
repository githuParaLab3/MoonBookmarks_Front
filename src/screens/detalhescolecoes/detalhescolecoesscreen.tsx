import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const mangas = Array(6).fill({
  id: Math.random().toString(),
  title: "Infinite Leveling Murim",
  chapter: "Capítulo 84",
  image: "https://example.com/manga-image.jpg",
});

export function DetalhesColecoesScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coleção</Text>
      </View>

      
      <Text style={styles.title}>Melhores Mangás</Text>

      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de mangás */}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flatlist}
        data={mangas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.mangaItem}>
            <Image source={{ uri: item.image }} style={styles.mangaImage} />
            <View style={styles.mangaText}>
              <Text style={styles.mangaTitle}>{item.title}</Text>
              <Text style={styles.mangaChapter}>{item.chapter}</Text>
            </View>
            <TouchableOpacity style={styles.deleteIcon}>
              <Ionicons name="trash-outline" size={18} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 20,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#D32F2F",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#FBC02D",
  },
  buttonText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 14,
  },
  flatlist: {
    marginTop: 10,
  },
  mangaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#9C27B0",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mangaImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
  },
  mangaText: {
    flex: 1,
    marginLeft: 12,
  },
  mangaTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  mangaChapter: {
    fontSize: 14,
    color: "gray",
  },
  deleteIcon: {
    backgroundColor: "#D32F2F",
    padding: 8,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
