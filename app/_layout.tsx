import { Stack } from 'expo-router';
import UserProvider from '@/src/state/user';

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
      </Stack>
    </UserProvider>
  );
}
