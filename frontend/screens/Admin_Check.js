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
  ScrollView,
} from "native-base";

function Admin_check_Screen({ navigation }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [graceList, setGraceList] = useState([]);

  async function showGrace() {
    await Axios.get(`http://${SERVER_IP}:${PORT}/grace`)
      .then((response) => {
        let data = response.data;
        data.reverse();
        setGraceList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
    showGrace();
  }, [info]);

  useEffect(() => {
    // useState is Asynchronous!!!, Thus you need to Hook for getValue on created info(LocalStorage)
    innerFunction();
  }, [innerFunction]);
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <HStack space={2} mt="10">
          <Icon
            color="indigo.500"
            as={MaterialIcons}
            name="admin-panel-settings"
          />
          <Heading fontSize={30} color="indigo.500">
            Admin Panel
          </Heading>
        </HStack>
        <Heading fontSize={30} color="info.500">
          ตวรจบันทึกความดี
        </Heading>
        <Divider my="3" />
        <ScrollView>
          <Box alignItems="center" w="80%" mx="auto">
            <HStack space={5}>
              <VStack alignItems="center" space={5}>
                <Text bold fontSize={17}>
                  หมายเลขบันทึก
                </Text>
                <Divider my="1" />
                <Text fontSize={16}>9</Text>
                <Text fontSize={16}>8</Text>
                <Text fontSize={16}>7</Text>
              </VStack>
              <VStack alignItems="center" space={5}>
                <Text bold fontSize={17}>
                  ผู้บันทึก
                </Text>
                <Divider my="1" />
                <Text fontSize={16}>เอเรียม โมนาช</Text>
                <Text fontSize={16}>โรนัส เกเรียน</Text>
                <Text fontSize={16}>อานิน นาเดีย</Text>
              </VStack>
              <VStack alignItems="center" space={5}>
                <Text bold fontSize={17}>
                  สถานะตรวจ
                </Text>
                <Divider my="1" />
                <Button
                  w={{ base: "60%" }}
                  size="6"
                  colorScheme="warning"
                  onPress={() => {
                    props.navigation.navigate("Check_Detail");
                  }}
                >
                  รอการตรวจ
                </Button>
                <Button w={{ base: "60%" }} size="6" colorScheme="success">
                  ตรวจแล้ว
                </Button>
                <Button w={{ base: "60%" }} size="6" colorScheme="success">
                  ตรวจแล้ว
                </Button>
              </VStack>
            </HStack>
          </Box>
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
}

export default Admin_check_Screen;
