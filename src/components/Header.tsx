import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

// Componente do Header
export default function Header() {
  const router = useRouter();

  const handleNavigateToSettings = () => {
    router.navigate('/configuracoes'); // Ajuste a rota conforme necessário
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.header} onPress={handleNavigateToSettings}>
        <Text style={styles.headerTitle}>Olá, João</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10, 
    paddingTop: 10,
    height: 80,
  },
  header: {
    backgroundColor: '#9748FF',
    width: '90%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  headerTitle: {
    paddingLeft: 15,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});
