import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, Platform } from "react-native";

export default function OrderStack() {
  return (
    <Stack
    >
      <Stack.Screen name="index" options={{ title:"Orders" }} />
    </Stack>
  );
}
