import { useLocalSearchParams,Stack } from 'expo-router'
import React from 'react'
import { View,Text } from 'react-native'

const ProductDetailsPage = () => {
    const {id}=useLocalSearchParams()
  return (
    <View>
      <Stack.Screen options={{title:"Details : " + id}}/>
      <Text>Hello {id}</Text>
    </View>
  )
}

export default ProductDetailsPage
