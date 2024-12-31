import { View, Text, Platform, FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '../providers/CartProvider'
import CartListItem from '@/components/CartListItem'
import Button from '@/components/Button'


const cartScreen = () => {

const {items,total,checkout} = useCart()

  return (
    <View style={{padding:10}}>
      <FlatList 
      data={items}
      renderItem={({item})=><CartListItem cartItem={item}/>}
      contentContainerStyle={{gap:10}}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Text style={{paddingVertical:5,fontSize:16}}>Total:{total.toFixed(2)}</Text>
      <Button onPress = {checkout}text={"Checkout"} />
    </View>
  )
}

export default cartScreen