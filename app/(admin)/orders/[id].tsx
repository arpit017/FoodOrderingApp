import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator } from "react-native";
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
import React from "react";
import { Order, OrderStatusList } from "@/types";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import { defaultPizzaImg } from "@/components/ProductItemList";
import OrderListItem from "@/components/OrderListItem";
import Colors from "@/constants/Colors";
import { useOrderDetail, useUpdateOrder } from "@/api/orders";
import RemoteImage from "@/components/RemoteImage";
import { notifyUserAboutOrderUpdate } from "@/lib/notification";

const OrderDetailScreen = () => {
  const { id:idString } = useLocalSearchParams();
  const id=parseFloat(typeof(idString)==="string"?idString:idString[0])

 const{data:order,isLoading,error}=useOrderDetail(id)
 const{mutate:updateOrder}=useUpdateOrder()
 
 if(error){
  return <Text>Not Found</Text>
 }
 if(!order){
  return <Text>Not order Found</Text>
 }
 if(isLoading){
  return <ActivityIndicator/>
 }

 const updateOrderFun=async(status:string)=>{
  // console.warn("Update status")
  await updateOrder({id:id,updatedFields:{status}})
  console.warn("Notify",order?.user_id  )
  if(order){
    await notifyUserAboutOrderUpdate({...order,status})
  }

}
 
// console.log(id)
  return (
    <View>
      <Stack.Screen options={{ title: `Order # ${id}` }} />
      <OrderListItem order={order} />
      {order.order_items &&
        order.order_items.map((ele) => {
          return (
            <View key={ele.id} style={styles.container}>
              <View style={{ flexDirection: "row", maxWidth: "50%" }}>
                <View>
                <RemoteImage
      path={ele.products?.image}
      fallback={defaultPizzaImg}
      style={styles.image}
      resizeMode="contain"
      />
                </View>
                <View>
                  <Text style={styles.detailsText}>{ele.products?.name}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 6,
                      alignItems: "center",
                    }}
                  >
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

      <View style={styles.orderStatus}>
        <Text style={{ fontWeight: "bold" }}>Status</Text>
        <View style={{ flexDirection: "row", gap: 5 }}>
          {OrderStatusList.map((status) => (
            <Pressable
              key={status}
              onPress={()=>{updateOrderFun(status)}}
              style={{
                borderColor: Colors.light.tint,
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                marginVertical: 10,
                backgroundColor:
                  order.status === status ? Colors.light.tint : "transparent",
              }}
            >
              <Text
                style={{
                  color: order.status === status ? "white" : Colors.light.tint,
                }}
              >
                {status}
              </Text>
            </Pressable>
          ))}
        </View>
        </View>
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
  orderStatus:{
padding:10
  }
});
export default OrderDetailScreen;
