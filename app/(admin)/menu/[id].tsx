import { useLocalSearchParams, Stack, Link } from "expo-router";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, Platform } from "react-native";
import products from "@/assets/data/products";
import { defaultPizzaImg } from "@/components/ProductItemList";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
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

<Stack.Screen  options={{ title: "Menu",headerRight: () => {
          // Use different approaches based on the platform
          const isWeb = Platform.OS === "web";
          return isWeb ? (
            // Web: Use Link directly
            <Link href={`/(admin)/menu/create?id=${id}`}>
              <FontAwesome
                name="pencil"
                size={25}
                color={Colors.light.tint}
                style={{ marginRight: 15 }}
              />
            </Link>
          ) : (
            // Mobile: Wrap Link in Pressable for better interaction
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          );
        }, }} />
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
