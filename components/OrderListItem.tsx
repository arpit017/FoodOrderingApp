import { View, Text, StyleSheet, Pressable } from "react-native";
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
import React from "react";
import { Order } from "@/types";
import { Link } from "expo-router";

type OrderListItemProps={
  order:Order
}

const OrderListItem = ({ order }: OrderListItemProps) => {
  // console.log(order);
  return (
    <Link href={`/orders/${order.id }`} asChild>
      {/* <Link href={`/menu/${product.id}`} asChild> */}
            <Pressable key={order.id} style={styles.container}>
              <View>
                <Text style={styles.heading}>Order # {order.id}</Text>
                <Text style={styles.created_at}>
                  {dayjs(order.created_at).fromNow()}
                </Text>
              </View>
              <View>
                <Text style={styles.heading}>{order.status}</Text>
              </View>
            </Pressable>
            </Link>
  )
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
  heading: {
    fontWeight: "bold",
    fontSize: 18,
  },
  created_at: {
    color: "gray",
    fontSize: 17,
  },
});
export default OrderListItem;
