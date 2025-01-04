import { StyleSheet,Text,View,Image, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { Product } from '@/types';
import { Link } from 'expo-router';
import { Tables } from '@/src/database.types';
import RemoteImage from './RemoteImage';

type ProductItemListProps={
    product:Tables<'products'>
}
export const defaultPizzaImg = "https://img.freepik.com/free-psd/top-view-delicious-pizza_23-2151868964.jpg"

 export const ProductItemList=({product}:ProductItemListProps) =>{
  return (
    <Link href={`/menu/${product.id}`} asChild>
    <Pressable style={styles.container}>
    {/* <Image
        style={styles.image}
        source={{uri: product.image || defaultPizzaImg}}
        resizeMode='contain'
      /> */}
      <RemoteImage
        path={product?.image}
        fallback={defaultPizzaImg}
        style={styles.image}
        resizeMode="contain"
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
