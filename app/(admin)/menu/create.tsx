import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import { defaultPizzaImg } from "@/components/ProductItemList";
import Colors from "@/constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import { Stack } from "expo-router";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onCreate = () => {

if(!validateInput()){
    return
}

    console.warn("Creating Product", name, price);
    reset();
  };

  const validateInput = () => {
    setError("")
    if (!name) {
      setError("Name field is required");
      return false;
    }
    if (!price) {
      setError("Price field is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setError("Price is not a Number");
      return false;
    }

    return true;
  };

  const reset = () => {
    setName("");
    setPrice("");
  };
  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title:'Create Product'}}/>
        <Image source={{uri:image||defaultPizzaImg}} style={styles.image}/>
        <Text onPress={pickImage} style={styles.imageText}>Select Image</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Darren Sammy"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        placeholder="$9.99"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <Text style={{color:"red"}}>{error}</Text>
      <Button text="Create" onPress={onCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems:'center',
    padding: 10,
  },
  label: {
    fontSize: 16,
    color: "gray",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  image:{
    width:'50%',
    aspectRatio:1,
    alignSelf:'center'
  },
  imageText:{
    color:Colors.light.tint,
    alignSelf:'center',
    fontWeight:'bold',
    marginVertical:10
  }
});

export default CreateProductScreen;
