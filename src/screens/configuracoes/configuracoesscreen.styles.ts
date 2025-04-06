import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 16,
    },
    backButton: {
      padding:8,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 60,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: "bold",
      flex: 1,
      textAlign: "center",
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      marginLeft: 16,
    },
    optionText: {
      fontSize: 16,
      marginLeft: 12,
    },
    logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      bottom: 40,
      alignSelf: "center",
    },
    logoutText: {
      fontSize: 18,
      marginLeft: 8,
      fontWeight: "bold",
    },
  });

  export default styles;