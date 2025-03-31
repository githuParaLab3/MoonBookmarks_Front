import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

// Componente do Header
export default function HeaderScreen() {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Olá, João</Text>
      </View>
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
    paddingLeft:15,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  collectionsButton: {
    marginTop: 10,
    backgroundColor: '#9748FF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  collectionsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
