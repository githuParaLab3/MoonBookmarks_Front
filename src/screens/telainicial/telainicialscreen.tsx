import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import styles from "./telainicialscreen.styles";

export function TelaInicialScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topSection} />
      <Image source={require("../../../assets/images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Moon Bookmarks</Text>
      <Text style={styles.subtitle}>O seu aplicativo de bookmarks</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.navigate("/(autenticacao)/(login)")}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => router.navigate("/(autenticacao)/(cadastro)")}>
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TelaInicialScreen;
