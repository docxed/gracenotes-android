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
import {
  useFonts,
  Kanit_500Medium,
  Kanit_400Regular,
} from "@expo-google-fonts/kanit";

function Admin_check_Screen({ navigation }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [graceList, setGraceList] = useState([]);
  let [fontsLoaded] = useFonts({
    Kanit_500Medium,
    Kanit_400Regular,
  });

  async function showGrace() {
    await Axios.get(`http://${SERVER_IP}:${PORT}/graceadmin`)
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

  if (!fontsLoaded) {
    return (
      <NativeBaseProvider>
        <Text></Text>
      </NativeBaseProvider>
    );
  } else {
    return (
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <HStack space={2} mt="10">
            <Icon
              color="indigo.500"
              as={MaterialIcons}
              name="admin-panel-settings"
            />
            <Text style={{ fontFamily: "Kanit_400Regular" }} fontSize={30}>
              <Heading fontSize={30} color="indigo.500">
                Admin Panel
              </Heading>
            </Text>
          </HStack>
          <Text style={{ fontFamily: "Kanit_400Regular" }} fontSize={30}>
            <Heading fontSize={30} color="info.500">
              ตวรจบันทึกความดี
            </Heading>
          </Text>
          <Text style={{ fontFamily: "Kanit_400Regular" }} fontSize={18} my={3} color="secondary.500">
            จำนวนความดีทั้งหมด {graceList.length}
          </Text>
          <Divider my="3" />
          <ScrollView>
            <Box alignItems="center" w="80%" mx="auto">
              <HStack space={5}>
                <VStack alignItems="center" space={5}>
                  <Text
                    fontSize={17}
                    style={{ fontFamily: "Kanit_400Regular" }}
                  >
                    หมายเลขบันทึก
                  </Text>
                  <Divider my="1" />
                  {graceList.map((item, index) => {
                    return (
                      <Box key={index}>
                        <Text
                          fontSize={16}
                          style={{ fontFamily: "Kanit_400Regular" }}
                        >
                          {item.grace_id}
                        </Text>
                      </Box>
                    );
                  })}
                </VStack>
                <VStack alignItems="center" space={5}>
                  <Text
                    fontSize={17}
                    style={{ fontFamily: "Kanit_400Regular" }}
                  >
                    ผู้บันทึก
                  </Text>
                  <Divider my="1" />
                  {graceList.map((item, index) => {
                    return (
                      <Box key={index}>
                        <Text
                          fontSize={16}
                          style={{ fontFamily: "Kanit_400Regular" }}
                        >
                          {item.member_fname} {item.member_lname}
                        </Text>
                      </Box>
                    );
                  })}
                </VStack>
                <VStack alignItems="center" space={5}>
                  <Text
                    fontSize={17}
                    style={{ fontFamily: "Kanit_400Regular" }}
                  >
                    สถานะตรวจ
                  </Text>
                  <Divider my="1" />
                  {graceList.map((item, index) => {
                    return item.grace_check == "รอการอนุมัติ" ? (
                      <Button
                        _text={{ fontFamily: "Kanit_400Regular" }}
                        key={index}
                        w={{ base: "60%" }}
                        size="6"
                        colorScheme="warning"
                        onPress={() => {
                          navigation.navigate("Check_Detail", {
                            keys: item.grace_id,
                          });
                        }}
                      >
                        รอการตรวจ
                      </Button>
                    ) : (
                      <Button
                        _text={{ fontFamily: "Kanit_400Regular" }}
                        key={index}
                        w={{ base: "60%" }}
                        size="6"
                        colorScheme="success"
                        onPress={() => {
                          navigation.navigate("Check_Detail", {
                            keys: item.grace_id,
                          });
                        }}
                      >
                        ตรวจแล้ว
                      </Button>
                    );
                  })}
                </VStack>
              </HStack>
            </Box>
          </ScrollView>
        </Center>
      </NativeBaseProvider>
    );
  }
}

export default Admin_check_Screen;
