import {View,FlatList, ActivityIndicator} from 'react-native';
import { ProductItemList } from '@/components/ProductItemList';
import { useProductList } from '@/api/products';
import { Text } from 'react-native-elements';

export default function TabOneScreen() {

  const { data :products,error,isLoading } = useProductList()

  if(isLoading){
    return <ActivityIndicator/> 
  }

  if(error){
    return <Text>Failed to fetch products</Text>;
  }
  return (
    <View>
   <FlatList 
   data={products}
   renderItem={({item})=><ProductItemList product={item}/>}
   numColumns={2}
   contentContainerStyle={{gap:10,padding:10}}
   columnWrapperStyle={{gap:10}}
   />
    </View>
  );
}
 


