import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface BotaoColecaoProps {
  titulo1: string;
  titulo2: string;
  onPress1: () => void;
  onPress2: () => void;
  selectedTab: string;
}

export default function BotaoColecao({ titulo1, titulo2, onPress1, onPress2, selectedTab }: BotaoColecaoProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.botao, selectedTab === titulo1 && styles.activeButton]}
        onPress={onPress1}
      >
        <Text style={[styles.texto, selectedTab === titulo1 && styles.activeText]}>{titulo1}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, selectedTab === titulo2 && styles.activeButton]}
        onPress={onPress2}
      >
        <Text style={[styles.texto, selectedTab === titulo2 && styles.activeText]}>{titulo2}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  botao: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#9748FF",
    marginTop:60,
  },
  activeButton: {
    backgroundColor: "#9748FF",
  },
  texto: {
    fontSize: 16,
    color: "#9748FF",
  },
  activeText: {
    color: "white",
  },
});
