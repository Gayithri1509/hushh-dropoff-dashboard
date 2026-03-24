import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="email" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="home" />
    </Stack>
  );
}