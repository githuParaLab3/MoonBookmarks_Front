import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ModalDelecaoProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ModalDelecao({ visible, onClose, onConfirm }: ModalDelecaoProps) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Ionicons name="trash-outline" size={50} color="black" style={styles.icon} />

          <Text style={styles.message}>Deseja realmente excluir esse conteúdo?</Text>
          <Text style={styles.warning}>Exclusões são permanentes, os dados excluídos não serão recuperados.</Text>

          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmText}>Confirmar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semi-transparente
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: "80%",
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    icon: {
      marginBottom: 10,
    },
    message: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 8,
    },
    warning: {
      fontSize: 14,
      color: "#757575", // Cinza para o aviso
      textAlign: "center",
      marginBottom: 20,
    },
    confirmButton: {
      backgroundColor: "#9C27B0", // Roxo do botão "Confirmar"
      width: "100%",
      padding: 12,
      borderRadius: 5,
      alignItems: "center",
      marginBottom: 10,
    },
    confirmText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    cancelButton: {
      backgroundColor: "#E0E0E0", // Cinza do botão "Cancelar"
      width: "100%",
      padding: 12,
      borderRadius: 5,
      alignItems: "center",
    },
    cancelText: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
  