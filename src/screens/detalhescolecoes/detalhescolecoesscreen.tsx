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
          <Ionicons name="trash-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
              <Ionicons name="trash-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:"80%",
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  flatlist:{
    width:"100%",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 24,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#b71c1c",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fbc02d",
  },
  buttonText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "bold",
  },
  mangaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#8e24aa",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  mangaImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
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
    backgroundColor: "#b71c1c",
    padding: 8,
    borderRadius: 50,
  },
});
