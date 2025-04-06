import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#fff",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginLeft: 12,
    },
    image: {
      width: "100%",
      height: 180,
      borderRadius: 12,
      marginBottom: 16,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
    },
    descricao: {
      textAlign: "center",
      fontSize: 16,
      color: "#666",
      marginBottom: 12,
    },
    botoes: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 10,
      marginBottom: 20,
    },
    botaoEditar: {
      flexDirection: "row",
      backgroundColor: "#FBC02D",
      padding: 10,
      borderRadius: 8,
    },
    botaoExcluir: {
      flexDirection: "row",
      backgroundColor: "#D32F2F",
      padding: 10,
      borderRadius: 8,
    },
    botaoAdicionar: {
      flexDirection: "row",
      backgroundColor: "#7B1FA2",
      padding: 10,
      borderRadius: 8,
    },
    botaoTexto: {
      color: "white",
      marginLeft: 6,
      fontWeight: "bold",
    },
    item: {
      flexDirection: "row",
      backgroundColor: "#f8f8f8",
      padding: 10,
      marginBottom: 10,
      borderRadius: 10,
    },
    itemImage: {
      width: 50,
      height: 50,
      borderRadius: 10,
    },
    itemInfo: {
      flex: 1,
      marginLeft: 10,
      justifyContent: "center",
    },
    itemTitulo: {
      fontWeight: "bold",
      fontSize: 16,
    },
    itemProgresso: {
      color: "gray",
    },
    deleteIcon: {
      backgroundColor: "#D32F2F",
      padding: 6,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: "#fff",
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: "90%",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 10,
      marginBottom: 12,
    },
    botaoSalvar: {
      backgroundColor: "#4CAF50",
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
  });
  

  export default styles;