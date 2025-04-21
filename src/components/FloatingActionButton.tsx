
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  onPress: () => void;
  style?: ViewStyle; 
};

export default function FloatingActionButton({ onPress, style }: Props) {
  return (
    <Pressable style={[styles.fab, style]} onPress={onPress}>
      <MaterialIcons name="add" size={30} color="#fff" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 40,
    right: 30,
    backgroundColor: "#7A2FF9",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
