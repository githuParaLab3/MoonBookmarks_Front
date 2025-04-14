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
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#ccc",
      marginBottom: 10,
      backgroundColor: "#f9f9f9",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    
    colecaoAtiva: {
      backgroundColor: "#d1e7dd", // Verde claro tipo "selecionado"
      borderColor: "#0f5132",
    },
    
    colecaoTexto: {
      fontSize: 16,
      color: "#333",
      fontWeight: "500",
    },
    colecaoItemContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      marginBottom: 8,
      backgroundColor: "#f9f9f9",
    },
    
    colecaoImagem: {
      width: 60,
      height: 60,
      borderRadius: 8,
      marginRight: 10,
    },
    
    colecaoTextoContainer: {
      flex: 1,
    },
    
    colecaoTitulo: {
      fontWeight: "bold",
      fontSize: 16,
      marginBottom: 4,
    },
    
    colecaoDescricao: {
      fontSize: 14,
      color: "#666",
    },


  });
  
  

export default styles;