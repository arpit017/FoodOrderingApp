import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendFunction = () => {
    router.push("/(auth)/signUp");
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "SignIn" }} />

      <Text style={styles.label}>Email</Text>
      <TextInput placeholder="Jahangir@gmail.com" style={styles.input} value={email} onChangeText={setEmail}/>
      <Text style={styles.label}>Password</Text>
      <TextInput placeholder="jaha*******" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button text="Sign In" />
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
