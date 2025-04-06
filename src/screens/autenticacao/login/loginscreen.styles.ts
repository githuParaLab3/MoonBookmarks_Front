import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    topSection: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "112%",
      height: "25%",
      backgroundColor: "#8A42F5",
      borderBottomRightRadius: 50,
    },
    header: {
      alignItems: "center",
      marginBottom: 30,
    },
    welcomeText: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#9748FF",
    },
    subtitle: {
      fontSize: 14,
      color: "#A085C3",
    },
    inputContainer: {
      width: "100%",
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#9748FF",
      marginBottom: 5,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F5F5F5",
      borderRadius: 8,
      paddingHorizontal: 10,
      height: 50,
    },
    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: "#333",
    },
    loginButton: {
      backgroundColor: "#9748FF",
      width: "100%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 20,
    },
    loginText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    registerRedirect: {
      marginTop: 20,
    },
    registerText: {
      fontSize: 14,
      color: "#A085C3",
    },
    registerLink: {
      color: "#9748FF",
      fontWeight: "bold",
    },
  });

export default styles;