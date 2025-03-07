import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, Platform } from "react-native";

export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Menu",headerRight: () => {
          // Use different approaches based on the platform
          const isWeb = Platform.OS === "web";
          return isWeb ? (
            // Web: Use Link directly
            <Link href="/(admin)/menu/create">
              <FontAwesome
                name="plus-square-o"
                size={25}
                color={Colors.light.tint}
                style={{ marginRight: 15 }}
              />
            </Link>
          ) : (
            // Mobile: Wrap Link in Pressable for better interaction
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-square-o"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          );
        }, }} />


    </Stack>
  );
}
