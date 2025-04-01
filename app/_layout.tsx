import { Stack } from 'expo-router';
import HeaderScreen from '@/src/components/HeaderScreen'; // Importa o header

export default function RootLayout() {
  return (

      
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
      </Stack>
   
  );
}
