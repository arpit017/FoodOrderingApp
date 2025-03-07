import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { defaultPizzaImg } from "@/components/ProductItemList";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/api/products";
import * as FileSystem from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
import RemoteImage from "@/components/RemoteImage";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === "string" ? idString : idString?.[0]
  );
  const isUpdating = !!idString;

  const router = useRouter();

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: producttopopulate } = useProduct(id);
  const { mutate: deleteProduct } = useDeleteProduct();

  useEffect(() => {
    // console.log("hii")
    if (producttopopulate) {
      // console.log("hii2")
      console.log(producttopopulate)
      setName(producttopopulate.name);
      setPrice(producttopopulate.price.toString());
      setImage(producttopopulate.image);
    }
  }, [producttopopulate]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      console.log("data"+data.fullPath)
      return data.path;
    }
  };

  const onUpdate = async() => {
    if (!validateInput()) {
      return;
    }
    const imgPath = await uploadImage();
    // console.warn("Updating Product", name, price);
    updateProduct(
      { id, name, price: parseFloat(price), image:imgPath },
      {
        onSuccess: () => {
          reset();
          router.back();
        },
      }
    );
    console.log("updatingProduct", name, price);
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onCreate = async () => {
    if (!validateInput()) {
      return;
    }
    const imgPath = await uploadImage();
    console.warn("Creating Product", name, price);

    insertProduct(
      { name, price: parseFloat(price), image:imgPath },
      {
        onSuccess: () => {
          reset();
          router.back();
        },
      }
    );
  };

  const validateInput = () => {
    setError("");
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

  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        router.replace("/(admin)");
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product ?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />
      {
        image?.startsWith("file://") ?
        <Image
        style={styles.image}
        source={{uri:image || defaultPizzaImg}}
        resizeMode='contain'
      /> 
      :
      <RemoteImage
      path={producttopopulate?.image}
      fallback={defaultPizzaImg}
      style={styles.image}
      resizeMode="contain"
      />
    }
      <Text onPress={pickImage} style={styles.imageText}>
        Select Image
      </Text>
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
      <Text style={{ color: "red" }}>{error}</Text>
      <Button text={isUpdating ? "Update" : "Create"} onPress={onSubmit} />
      <Text onPress={confirmDelete} style={styles.imageText}>
        Delete
      </Text>
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
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 100,
  },
  imageText: {
    color: Colors.light.tint,
    alignSelf: "center",
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default CreateProductScreen;
