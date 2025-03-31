import { Button } from "@/src/cp/Button";
import { ThemedView } from "@/src/cp/ThemedView";
import { StyleSheet } from 'react-native';
import { useState } from "react";
import { ThemedText } from "@/src/cp/ThemedText";

export function HomeScreen() {
  
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <ThemedView style={styles.container}>   

      <ThemedText>Hello</ThemedText>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  footerContainer: {
    height: 60,
    alignItems: 'center',
  },
});