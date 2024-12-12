import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { hide } from "expo-splash-screen";
import { Pressable, Platform } from "react-native";

export default function OrderStack() {
  return (
    <Stack
    >
      <Stack.Screen name="index" options={{ title:"Orders" }} />
      <Stack.Screen name="list" options={{ headerShown:false }} />
    </Stack>
  );
}
