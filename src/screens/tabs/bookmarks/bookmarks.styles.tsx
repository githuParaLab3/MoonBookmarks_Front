import { StyleSheet } from "react-native";

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 35,
  },
  searchContainer: {
    marginTop:15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
    color: '#64748b',
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#334155',
    fontSize: 16,
  },
  advancedSearchIcon: {
    marginLeft: 8,
  },
  typeList: {
    marginBottom: 16,
    maxHeight: 40,
  },
  typeItem: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
  },
  selectedTypeItem: {
    backgroundColor: '#7c3aed',
  },
  typeText: {
    color: '#334155',
    fontWeight: '500',
  },
  selectedTypeText: {
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalSubTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 12,
  },
  bookmarkItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  imagem: {
    width: 60,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  textoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  progresso: {
    fontSize: 14,
    color: '#64748b',
  },
  margemFlatlist: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default styles;