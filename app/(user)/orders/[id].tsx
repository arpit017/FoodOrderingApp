import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator } from "react-native";
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
import React from "react";
import { Order } from "@/types";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import { defaultPizzaImg } from "@/components/ProductItemList";
import OrderListItem from "@/components/OrderListItem";
import { useOrderDetail } from "@/api/orders";
import { useOrderStatusSubscription } from "@/api/orders/subscription";

const OrderDetailScreen = () => {
  const { id:idString } = useLocalSearchParams();
    const id=parseFloat(typeof(idString)==="string"?idString:idString[0])
  
   const{data:temp,isLoading,error}=useOrderDetail(id)
   useOrderStatusSubscription(id)
   if(error){
    return <Text>Not Found</Text>
   }
   if(!temp){
    return <Text>Not order Found</Text>
   }
   if(isLoading){
    return <ActivityIndicator/>
   }
   
  return (
    <View>
      {/* <View key={temp.id} style={styles.container}>
        <Stack.Screen options={{ title: `Order # ${temp.id}` }} />
        <View>
          <Text style={styles.text}>Order # {temp.id}</Text>
          <Text style={styles.created_at}>
            {dayjs(temp.created_at).fromNow()}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>{temp.status}</Text>
        </View>
      </View> */}
       <Stack.Screen options={{ title: `Order # ${temp.id}` }} />
      <OrderListItem order={temp}/>

      {temp.order_items &&
        temp.order_items.map((ele) => {
          return (
            <View key={ele.id} style={styles.container}>
              <View style={{ flexDirection: "row", maxWidth: "50%" }}>
                <View>
                  <Image
                    source={{ uri: ele.products?.image || defaultPizzaImg }}
                    style={styles.image}
                  />
                </View>
                <View>
                  <Text style={styles.detailsText}>{ele.products?.name}</Text>
                  <View style={{ flexDirection: "row",gap:6,alignItems:"center" }}>
                    <Text style={styles.price}>${ele.products?.price} </Text>
                    <Text style={styles.detailsText}>Size: {ele.size} </Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.detailsText}>{ele.quantity}</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "99%",
    padding: 10,
    // borderWidth: 2,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 7,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
  detailsText: {
    fontWeight: "bold",
    fontSize: 17,
  },
  created_at: {
    color: "gray",
    fontSize: 17,
  },
  image: {
    width: "55%",
    aspectRatio: 1,
  },
  price: {
    fontWeight: "900",
    fontSize: 18,
    color: "blue",
  },
});
export default OrderDetailScreen;
