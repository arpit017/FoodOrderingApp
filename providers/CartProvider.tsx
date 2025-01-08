import { CartItem, Product } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { Alert } from "react-native";
import { useInsertOrder } from "@/api/orders";

import { useRouter } from "expo-router";
import { useInsertOrderItem } from "@/api/order-item";
import { Tables, TablesInsert } from "@/src/database.types";


type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
const router =useRouter()
  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItem } = useInsertOrderItem();

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }
    const newCartItem: CartItem = {
      id: randomUUID(),
      product: product,
      product_id: product.id,
      size: size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const newUpdate = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);
    console.log(newUpdate);
    setItems(newUpdate);
  };

  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  const checkout = async() => {

    // await initialisedpaymentSheet(Math.floor(total*100))
    // Alert.alert("Are you sure you want to checkout ?");
    insertOrder({total},{
    
      onSuccess:saveOrderItem,
    })
  };
  
    const saveOrderItem=(data:Tables<'orders'>|null)=>{
      if (!data) {
        console.error("Order data is null. Cannot save order item.");
        return;
      }
      const orderItems=items.map((cartItem)=>({
        order_id: data.id,
        quantity: cartItem.quantity,
        size: cartItem.size,
        product_id: cartItem.product_id
      }))
      console.log(orderItems)
     insertOrderItem(orderItems,{
        onSuccess:()=>{
         
          console.log("ho gaya bhai")
          router.push(`/(user)/orders/${data.id}`)
        }
     })
    }
    
  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
