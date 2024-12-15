import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const sendFunction = () => {
    router.push("/(auth)/signUp");
  };

  const signInFun = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "SignIn" }} />

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
        text={loading ? "Signing you In" : "Sign In"}
        disabled={loading}
        onPress={signInFun}
      />
      <Text onPress={sendFunction} style={styles.textButton}>
        Create an Account
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

export default SignIn;
