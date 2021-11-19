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
  IconButton,
  Text,
  Button,
  Center,
  NativeBaseProvider,
  Spinner,
  ScrollView,
} from "native-base";

const Admin_list_User = (props) => {
  return (
    <Box alignItems="center" w="80%" mx="auto">
      <HStack space={8}>
        <VStack w={{ base: "40%" }} alignItems="center" space={7}>
          <Text bold textAlign="center" fontSize={17}>
            หมายเลขบัญชี
          </Text>
          {props.userList.map((item, index) => {
            return (
              <Box key={index}>
                <Text fontSize={18}>{item.member_id}</Text>
              </Box>
            );
          })}
        </VStack>
        <VStack alignItems="center" space={7}>
          <Text bold fontSize={18}>
            ชื่อ-นามสกุล
          </Text>
          {props.userList.map((item, index) => {
            return (
              <Box key={index}>
                <Text fontSize={18}>
                  {item.member_fname} {item.member_lname}
                </Text>
              </Box>
            );
          })}
        </VStack>
        <VStack alignItems="center" space={7}>
          <Text bold fontSize={17}>
            Option
          </Text>
          {props.userList.map((item, index) => {
            return (
              <IconButton
                key={index}
                colorScheme="gray"
                borderRadius="full"
                variant="outline"
                _icon={{
                  as: Ionicons,
                  name: "eye",
                  size: "3",
                }}
                onPress={() => {
                  props.navigation.navigate("Admin_Show_user", {keys: item.member_id});
                }}
              />
            );
          })}
        </VStack>
      </HStack>
    </Box>
  );
};

function Admin_user_Screen({ navigation }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [userList, setUserList] = useState([]);

  async function showUser() {
    await Axios.get(`http://${SERVER_IP}:${PORT}/user`)
      .then((response) => {
        let data = response.data;
        data.reverse();
        setUserList(data);
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
    showUser();
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
        <Heading fontSize={30} color="rose.500">
          จัดการบัญชีนักเรียน
        </Heading>
        <Divider my="3" />
        <ScrollView>
          {userList.length != 0 ? (
            <Admin_list_User navigation={navigation} userList={userList} />
          ) : (
            <Box></Box>
          )}
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
}

export default Admin_user_Screen;
