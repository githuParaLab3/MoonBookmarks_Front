import { Stack } from 'expo-router';


export default function StackLayout() {
  return (  
      <Stack>
        <Stack.Screen name="(login)" options={{ headerShown: false}}/>
        <Stack.Screen name="(cadastro)" options={{ headerShown: false}}/>
      </Stack>
   
  );
}
