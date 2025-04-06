import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import Header from "@/src/components/Header";
import ColecoesScreen from "@/src/components/colecoesscreen";
import styles from "./homescreen.styles";


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
