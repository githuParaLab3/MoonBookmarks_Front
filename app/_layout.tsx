import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (

    <QueryClientProvider client={queryClient}>
       <Stack>
        <Stack.Screen name="(autenticacao)" options={{ headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
        <Stack.Screen name="index" options={{ headerShown: false}}/>
        <Stack.Screen name="configuracoes" options={{ headerShown: false}}/>
        <Stack.Screen name="detalhescolecao" options={{ headerShown: false}}/>
        <Stack.Screen name="detalhesobra" options={{ headerShown: false}}/>
        <Stack.Screen name="detalhesbookmark" options={{ headerShown: false}}/>
         <Stack.Screen name="telainicial" options={{ headerShown: false}}/>
        
      </Stack>
    </QueryClientProvider>

      

  );
}
