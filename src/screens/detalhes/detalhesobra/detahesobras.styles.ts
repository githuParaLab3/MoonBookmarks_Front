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
      marginBottom: 20,
    },
    backButton: {
      padding: 8,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: "bold",
      flex: 1,
      textAlign: "center",
    },
    obraImage: {
      width: "100%",
      height: 250,
      borderRadius: 8,
      marginBottom: 16,
    },
    titulo: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 8,
    },
    descricao: {
      fontSize: 16,
      color: "#666",
      marginBottom: 16,
    },
    tipo: {
      fontSize: 16,
      color: "#666",
      marginBottom: 8,
    },
    generos: {
      fontSize: 16,
      color: "#666",
      marginBottom: 8,
    },
    autor: {
      fontSize: 16,
      color: "#666",
      marginBottom: 16,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 20,
    },
    bookmarkButton: {
      backgroundColor: "#4CAF50",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
    },
    editButton: {
      backgroundColor: "#2196F3",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
    },
    deleteButton: {
      backgroundColor: "#F44336",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      marginLeft: 8,
    },
    label: {
      fontSize: 16,
      marginVertical: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
    },
    imagePreviewContainer: {
      alignItems: "center",
      marginTop: 10,
    },
    imagePreview: {
      width: 150,
      height: 150,
      borderRadius: 8,
      marginTop: 10,
    },
  });

  
export default styles;