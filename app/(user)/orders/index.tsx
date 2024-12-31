import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import orders from '@/assets/data/orders'
import OrderListItem from '@/components/OrderListItem'
import { useMyOrderlist } from '@/api/orders'

const index = () => {

  const {data:orders,isLoading,error}=useMyOrderlist()
  
    if(error){
      return <View><Text>No orders Found</Text></View>
    }
    if(isLoading){
      return <ActivityIndicator/>
    }
// console.log(orders)
  return (
    <View  >
     <FlatList 
   data={orders}
   renderItem={({item})=><OrderListItem order={item}/>}
   numColumns={1}
   contentContainerStyle={{padding:10}}
  //  columnWrapperStyle={{gap:10}}
   />
    </View>
  )
}

export default index