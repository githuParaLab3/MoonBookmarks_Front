import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5", // tom neutro claro
  },
  searchContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
    color: "#7c3aed", // roxo vibrante do Material
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1e293b",
  },
  flatlist: {
    width: "100%",
  },
  collectionItem: {
    marginBottom: 28,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
    paddingLeft: 4,
  },
  collectionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  imagePlaceholder: {
    width: 72,
    height: 72,
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  collectionImage: {
    width: 72,
    height: 72,
    borderRadius: 16,
    resizeMode: "cover",
  },
  collectionInfo: {
    marginLeft: 16,
    flex: 1,
  },
  collectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  collectionItems: {
    fontSize: 14,
    color: "#64748b",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#94a3b8",
    marginTop: 40,
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  bottomSheet: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 20,
    textAlign: "center",
  },
  modalInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "#f1f5f9",
    marginBottom: 16,
    color: "#334155",
    fontSize: 16,
  },
  imagePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7c3aed",
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
  },
  imagePickerText: {
    color: "#ffffff",
    marginLeft: 10,
    fontWeight: "500",
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 14,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#7c3aed",
  },
});

export default styles;
