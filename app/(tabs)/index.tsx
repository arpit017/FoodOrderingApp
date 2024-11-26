import { StyleSheet,Text,View,Image } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import products from '../../assets/data/products';
import Colors from '@/constants/Colors';
const product = products[0];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
    <Image
        style={styles.image}
        source={{uri: product.image}}
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    padding:10,
    borderRadius:10
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
