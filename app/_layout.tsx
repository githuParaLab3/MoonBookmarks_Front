import { Stack } from 'expo-router';


export default function RootLayout() {
  return (

      
      <Stack>
        <Stack.Screen name="(autenticacao)" options={{ headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
        <Stack.Screen name="index" options={{ headerShown: false}}/>
        <Stack.Screen name="(configuracoes)" options={{ headerShown: false}}/>
        <Stack.Screen name="(detalhescolecao)" options={{ headerShown: false}}/>
        <Stack.Screen name="detalhesobra" options={{ headerShown: false}}/>
      </Stack>
   
  );
}
