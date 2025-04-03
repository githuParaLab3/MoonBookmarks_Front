import { Stack } from 'expo-router';


export default function RootLayout() {
  return (

      
      <Stack>
        <Stack.Screen name="(autenticacao)" options={{ headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
        <Stack.Screen name="index" options={{ headerShown: false}}/>
        <Stack.Screen name="(configuracoes)" options={{ headerShown: false}}/>
        <Stack.Screen name="(detalhescolecoes)" options={{ headerShown: false}}/>
      </Stack>
   
  );
}
