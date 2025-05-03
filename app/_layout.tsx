import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { AuthProvider } from "@/contexts/AuthContext";
import "./global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar hidden={true} />

      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movies/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
