import {View} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import products from '../../assets/data/products';

import { ProductItemList } from '@/components/ProductItemList';

export default function TabOneScreen() {
  return (
    <View>
   <ProductItemList product={products[0]}/>
   <ProductItemList product={products[1]}/>
    </View>
  );
}
 


