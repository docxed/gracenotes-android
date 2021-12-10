import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Box,
  Divider,
  Heading,
  HStack,
  VStack,
  Icon,
  Text,
  Button,
  Center,
  NativeBaseProvider,
  Spinner,
} from "native-base";
import { useFonts, Kanit_500Medium, Kanit_400Regular } from '@expo-google-fonts/kanit';

function Admin_menu_Screen({ navigation }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  let [fontsLoaded] = useFonts({
    Kanit_500Medium, Kanit_400Regular
  });

  async function _retrieveData() {
    try {
      const value = await AsyncStorage.getItem("info"); // Get member's info from LocalStorage
      if (value == null) {
        // LocalStorage doesn't has Data
        // Unauthorized
        navigation.navigate("Login");
        return;
      }
      setInfo(JSON.parse(value));
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      //  When the screen is focused (coming back to it). What do you do?
      _retrieveData(); // Call Check Authorized

      return () => {
        // When the screen is unfocused (leaving). What do you do?
      };
    }, [])
  );
  const innerFunction = useCallback(() => {

  }, [info]);

  useEffect(() => {
    // useState is Asynchronous!!!, Thus you need to Hook for getValue on created info(LocalStorage)
    innerFunction();
  }, [innerFunction]);

  if(!fontsLoaded){
    return(<NativeBaseProvider ><Text></Text></NativeBaseProvider>)
    
  }
  else{
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <HStack space={2}>
          <Icon
            color="rose.500"
            as={MaterialIcons}
            name="admin-panel-settings"
          />
          <Text style={{ fontFamily: 'Kanit_400Regular'}} fontSize={30}>
          <Heading fontSize={30} color="error.500">
            Admin Panel
          </Heading></Text>
        </HStack>
        <Divider my="10" />
        <Box alignItems="center" w="90%" mx="auto">
          <VStack space={10}>
            <Button
            _text={{ fontFamily: 'Kanit_400Regular'}}
              size="lg"
              colorScheme="info"
              onPress={() => {
                navigation.navigate("Admin_check_notes");
              }}
            >
              ตวรจบันทึกความดี
            </Button>
            <Button
            _text={{ fontFamily: 'Kanit_400Regular'}}
              size="lg"
              colorScheme="success"
              onPress={() => {
                navigation.navigate("Admin_manage_post");
              }}
            >
              จัดการโพสต์
            </Button>
            <Button
            _text={{ fontFamily: 'Kanit_400Regular'}}
              size="lg"
              colorScheme="rose"
              onPress={() => {
                navigation.navigate("Admin_manage_user");
              }}
            >
              จัดการบัญชีนักเรียน
            </Button>
            <Button
            _text={{ fontFamily: 'Kanit_400Regular'}}
              size="lg"
              colorScheme="warning"
              onPress={() => {
                navigation.navigate("Admin_manage_help");
              }}
            >
              จัดการโพสต์ความช่วยเหลือ
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );}
}

export default Admin_menu_Screen;
