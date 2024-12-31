import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import OrderListItem from '@/components/OrderListItem'
import { useAdminOrderlist } from '@/api/orders'
import { useOrderSubscription } from '@/api/orders/subscription'

const index = () => {

  const {data:orders,isLoading,error}=useAdminOrderlist({archived:false})

  useOrderSubscription()

  if(error){
    return <View><Text>No orders Found</Text></View>
  }
  if(isLoading){
    return <ActivityIndicator/>
  }
 
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