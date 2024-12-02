import { useLocalSearchParams, Stack } from "expo-router";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import products from "@/assets/data/products";
import { defaultPizzaImg } from "@/components/ProductItemList";
import Button from "@/components/Button";
import { useCart } from "@/app/CartProvider";
import { PizzaSize } from "@/types";
import { router } from "expo-router";
const ProductDetailsPage = () => {

  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const product = products.find((p) => p.id.toString() === id);
  const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

  const { addItem } = useCart();

  const addtoCart = () => {
    console.warn(" Hello ");
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart')
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImg }}
        style={styles.image}
      />
      
      <Text style={styles.price}>${product.price}</Text>
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
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    padding:10
  },
 
});

export default ProductDetailsPage;
