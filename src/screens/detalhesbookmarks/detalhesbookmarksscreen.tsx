import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export  function DetalhesBookmarksScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
     
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      
      <Image
        source={{ uri: "https://via.placeholder.com/300x150" }} // Substituir pela URL real
        style={styles.image}
      />

     
      <Text style={styles.title}>Infinite Level Up Murim</Text>
      <View style={styles.infoBox}>
        <MaterialIcons name="menu-book" size={16} color="black" />
        <Text style={styles.infoText}>Capítulo 257</Text>
        <Text style={styles.infoText}>• Concluído</Text>
      </View>

     
      <Text style={styles.sectionTitle}>Descrição</Text>
      <View style={styles.divider} />
      <Text style={styles.description}>
        From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences.
      </Text>

      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="star" size={30} color="#a78bfa" />
          <Text style={[styles.buttonText, { color: "#a78bfa" }]}>Inserir em coleção</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="edit" size={30} color="#fbbf24" />
          <Text style={[styles.buttonText, { color: "#fbbf24" }]}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="delete" size={30} color="#b91c1c" />
          <Text style={[styles.buttonText, { color: "#b91c1c" }]}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#a78bfa",
    padding: 8,
    borderRadius: 8,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  divider: {
    height: 2,
    backgroundColor: "black",
    width: 40,
    marginBottom: 8,
  },
  description: {
    textAlign: "justify",
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
});
