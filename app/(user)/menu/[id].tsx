import { useLocalSearchParams, Stack } from "expo-router";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import products from "@/assets/data/products";
import { defaultPizzaImg } from "@/components/ProductItemList";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { router } from "expo-router";
import { isLoaded, isLoading } from "expo-font";
import { useProduct } from "@/api/products";
const ProductDetailsPage = () => {
  const { id:product_id } = useLocalSearchParams();

  const id=parseFloat(typeof(product_id)=="string"?product_id:product_id[0])

  const {data:product,error,isLoading}=useProduct(id)
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  
  const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

  const { addItem } = useCart();

  const addtoCart = () => {
    console.warn(" Hello ");
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push("/cart");
  };
  if(isLoading){
    return <ActivityIndicator/>
  }
  if(error){
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImg }}
        style={styles.image}
      />
      <Text style={styles.choose}>Choose your size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size);
            }}
            key={size}
            style={[
              styles.size,
              { backgroundColor: selectedSize == size ? "gainsboro" : "white" },
            ]}
          >
            <Text style={styles.sizeText}>{size}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addtoCart} text="Add to cart" />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  size: {
    width: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: "gainsboro",
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontWeight: "bold",
  },
  choose: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default ProductDetailsPage;
