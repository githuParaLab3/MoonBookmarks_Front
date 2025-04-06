import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 16,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    backButton: {
      marginRight: 8,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
    bookmarkImage: {
      width: "100%",
      height: 200,
      borderRadius: 12,
      marginBottom: 12,
    },
    titulo: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 4,
    },
    capitulo: {
      fontSize: 14,
      color: "#666",
      marginBottom: 8,
    },
    status: {
      fontSize: 14,
      fontWeight: "bold",
    },
    progresso: {
      fontSize: 14,
      marginBottom: 8,
    },
    descricao: {
      fontSize: 14,
      fontStyle: "italic",
      marginBottom: 16,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    editButton: {
      backgroundColor: "#4CAF50",
      padding: 10,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    deleteButton: {
      backgroundColor: "#F44336",
      padding: 10,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    colecaoButton: {
      backgroundColor: "#2196F3",
      padding: 10,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    editButtonText: {
      color: "white",
      fontWeight: "bold",
    },
    deleteButtonText: {
      color: "white",
      fontWeight: "bold",
    },
    colecaoItem: {
      padding: 12,
      borderBottomWidth: 1,
      borderColor: "#eee",
    },
    colecaoAtiva: {
      backgroundColor: "#dfefff",
    },
    colecaoTexto: {
      fontSize: 16,
    },
  });
  
  

export default styles;