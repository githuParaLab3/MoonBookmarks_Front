import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function ConfiguracoesScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Configurações</Text>

      <TouchableOpacity style={styles.option}>
        <Ionicons name="settings-outline" size={24} color="#9748FF" />
        <Text style={styles.optionText}>Geral</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Ionicons name="cloud-upload-outline" size={24} color="#9748FF" />
        <Text style={styles.optionText}>Backup e Exportação</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Ionicons name="help-circle-outline" size={24} color="#9748FF" />
        <Text style={styles.optionText}>Ajuda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#9748FF" />
        <Text style={styles.optionText}>Sobre nós</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color="black" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
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
    position: "absolute",
    top: 16,
    left: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 40,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginLeft: 16,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  logoutText: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: "bold",
  },
});
