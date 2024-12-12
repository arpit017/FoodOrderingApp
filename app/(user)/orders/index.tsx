import { View, Text, FlatList } from 'react-native'
import React from 'react'
import orders from '@/assets/data/orders'
import OrderListItem from '@/components/OrderListItem'

const index = () => {
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