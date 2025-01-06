import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpFun = async () => {
    
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    console.log(error)
    // console.log(process.env.EXPO_PUBLIC_SUPABASE_ANON,process.env.EXPO_PUBLIC_SUPABASE_URL)
    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  };

  const sendtoSignIn = () => {
    router.push("/(auth)/signIn");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "SignUp" }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Jahangir@gmail.com"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="jaha*******"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        text={loading ? "Creating your Account" : "Create an Account"}
        disabled={loading}
        onPress={signUpFun}
      />
      <Text onPress={sendtoSignIn} style={styles.textButton}>
        Sign In
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  container: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontWeight: "bold",
    color: "gray",
  },
  textButton: {
    color: Colors.light.tint,
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default SignUp;
