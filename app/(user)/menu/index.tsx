import {View,FlatList} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import products from '../../../assets/data/products';

import { ProductItemList } from '@/components/ProductItemList';

export default function TabOneScreen() {
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
 


