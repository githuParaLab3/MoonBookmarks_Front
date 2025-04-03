import React, { useState } from "react";
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  Animated 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

interface ModalEscolherColecaoProps {
  visible: boolean;
  onClose: () => void;
}

const colecoes = ["Mangás", "Animes", "Séries", "Filmes"];

export function ModalEscolherColecao({ visible, onClose }: ModalEscolherColecaoProps) {
  const [colecaoSelecionada, setColecaoSelecionada] = useState<string | null>(colecoes[0]);
  const translateY = new Animated.Value(300);

  React.useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
            <View style={styles.dragIndicator} />
            <Text style={styles.modalTitle}>Escolha a coleção</Text>

            <View style={styles.pickerContainer}>
              <Ionicons name="ellipse" size={10} color="green" style={styles.icon} />
              <Picker
                selectedValue={colecaoSelecionada}
                onValueChange={(itemValue) => setColecaoSelecionada(itemValue)}
                style={styles.picker}
              >
                {colecoes.map((colecao) => (
                  <Picker.Item key={colecao} label={colecao} value={colecao} />
                ))}
              </Picker>
              <Ionicons name="chevron-down" size={20} color="gray" style={styles.iconRight} />
            </View>

            <TouchableOpacity style={styles.botaoInserir} onPress={onClose}>
              <Text style={styles.botaoTexto}>Inserir em Coleção</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "lightgray",
    borderRadius: 3,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 15,
  },
  picker: {
    flex: 1,
    height: 40,
  },
  icon: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  botaoInserir: {
    backgroundColor: "#9C27B0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  botaoTexto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

