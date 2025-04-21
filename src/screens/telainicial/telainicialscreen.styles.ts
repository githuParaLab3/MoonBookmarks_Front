import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  topSection: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "20%",
    backgroundColor: "#9748FF",
    borderBottomRightRadius: 80,
  },
  logo: {
    width: 120,
    height: 120,
    tintColor: "#9748FF",
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "80%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#9748FF",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 15,
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonSecondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#9748FF",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTextSecondary: {
    color: "#9748FF",
  },
});

export default styles;