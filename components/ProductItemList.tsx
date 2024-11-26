import { StyleSheet,Text,View,Image, Pressable } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';


import Colors from '@/constants/Colors';
import { Product } from '@/types';
import { Link } from 'expo-router';

type ProductItemListProps={
    product:Product
}
const defaultImg = "https://www.shutterstock.com/image-vector/error-500-page-empty-symbol-260nw-1711106146.jpg"

 export const ProductItemList=({product}:ProductItemListProps) =>{
  return (
    <Link href={`/menu/${product.id}`} asChild>
    <Pressable style={styles.container}>
    <Image
        style={styles.image}
        source={{uri: product.image || defaultImg}}
        resizeMode='contain'
      />
      

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    padding:10,
    borderRadius:10,
    flex:1,
    maxWidth:"50%"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical:10
  },
  price:{
    fontSize:15,
    color:Colors.light.tint,
    fontWeight:'bold'
  },
  image:{
    width:'100%',
    aspectRatio:1
  }
});
