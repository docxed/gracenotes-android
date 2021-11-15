import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  Heading,
  ScrollView,
  NativeBaseProvider,
  VStack,
} from "native-base";
import Card from "../components/Homelist";

const Home_Screen = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <Heading marginTop={45} textAlign="center" size="lg" fontWeight="600" color="indigo.500">ความดีล่าสุด</Heading>
      <ScrollView 
        _contentContainerStyle={{
            px: "10px",
            mb: "4",
            minW: "72",
        }}>
        <VStack flex={2} px="3">
            <Card navigation={navigation}/>
            <Card navigation={navigation}/>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default Home_Screen;