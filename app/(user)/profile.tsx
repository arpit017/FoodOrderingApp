import { Text, View } from "react-native";
import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

export default function profileScreen() {

  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/signIn')
  };

  return (
    <View>
      <Text>Profile</Text>
      <Button text="SignOut" onPress={handleSignOut} />
    </View>
  );
}
