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

function Admin_menu_Screen({ navigation }) {
  const [info, setInfo] = useState({}); // LocalStorage Data

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
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <HStack space={2}>
          <Icon
            color="rose.500"
            as={MaterialIcons}
            name="admin-panel-settings"
          />
          <Heading fontSize={30} color="error.500">
            Admin Panel
          </Heading>
        </HStack>
        <Divider my="10" />
        <Box alignItems="center" w="90%" mx="auto">
          <VStack space={10}>
            <Button
              size="lg"
              colorScheme="info"
              onPress={() => {
                navigation.navigate("Admin_check_notes");
              }}
            >
              ตวรจบันทึกความดี
            </Button>
            <Button
              size="lg"
              colorScheme="success"
              onPress={() => {
                navigation.navigate("Admin_manage_post");
              }}
            >
              จัดการโพสต์
            </Button>
            <Button
              size="lg"
              colorScheme="rose"
              onPress={() => {
                navigation.navigate("Admin_manage_user");
              }}
            >
              จัดการบัญชีนักเรียน
            </Button>
            <Button
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
  );
}

export default Admin_menu_Screen;
