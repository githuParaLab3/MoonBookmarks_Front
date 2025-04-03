import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from 'expo-router';

export function LoginScreen() {
    const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topSection} />
      <Image source={require("../../../../assets/images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Taiseki</Text>
      <Text style={styles.subtitle}>O seu aplicativo de bookmarks</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.navigate('/(tabs)/(home)')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  topSection: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "25%",
    backgroundColor: "#8A42F5",
    borderBottomRightRadius: 50,
  },
  logo: {
    width: 100,
    height: 100,
    tintColor: "#8A42F5",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#8A42F5",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    elevation: 5, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
