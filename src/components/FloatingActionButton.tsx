import { Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  onPress: () => void;
};

export default function FloatingActionButton({ onPress }: Props) {
  return (
    <Pressable style={styles.fab} onPress={onPress}>
      <MaterialIcons name="add" size={30} color="#fff" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 120, // Distância da borda inferior
    right: 40,  // Distância da borda direita
    backgroundColor: "#7A2FF9", // Cor roxa do botão
    width: 56,
    zIndex: 100,
    height: 56,
    borderRadius: 28, // Deixa o botão circular
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, // Sombra para Android
  },
});
