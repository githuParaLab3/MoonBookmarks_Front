import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./configuracoesscreen.styles";


export function ConfiguracoesScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Configurações</Text>
        </View>

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