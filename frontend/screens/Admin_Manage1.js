import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  Ionicons,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Box,
  Divider,
  Heading,
  Stack,
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
import {
  useFonts,
  Kanit_500Medium,
  Kanit_400Regular,
} from "@expo-google-fonts/kanit";

const Admin_list_post = (props) => {
  return (
    <Box alignItems="center" w="80%" mx="auto">
      <HStack space={9}>
        <VStack alignItems="center" space={7}>
          <Text fontSize={17} style={{ fontFamily: "Kanit_400Regular" }}>
            โพสต์ที่
          </Text>
          {props.socialList.map((item, index) => {
            return (
              <Box key={index}>
                <Text fontSize={18} style={{ fontFamily: "Kanit_400Regular" }}>
                  {item.social_id}
                </Text>
              </Box>
            );
          })}
        </VStack>
        <VStack alignItems="center" space={7}>
          <Text fontSize={17} style={{ fontFamily: "Kanit_400Regular" }}>
            เวลา
          </Text>
          {props.socialList.map((item, index) => {
            return (
              <Box key={index}>
                <Text fontSize={18} style={{ fontFamily: "Kanit_400Regular" }}>
                  {item.social_timestamp.substr(0, 10)}
                </Text>
              </Box>
            );
          })}
        </VStack>
        <VStack alignItems="center" space={6}>
          <Text fontSize={17} style={{ fontFamily: "Kanit_400Regular" }}>
            Edit
          </Text>
          {props.socialList.map((item, index) => {
            return (
              <Box key={index}>
                <IconButton
                  borderRadius="full"
                  variant="outline"
                  _icon={{
                    as: Feather,
                    name: "edit",
                    size: "3",
                  }}
                  onPress={() => {
                    props.navigation.navigate("Admin_edit_p", {
                      keys: item.social_id,
                    });
                  }}
                />
              </Box>
            );
          })}
        </VStack>
        <VStack alignItems="center" space={6}>
          <Text fontSize={17} style={{ fontFamily: "Kanit_400Regular" }}>
            View
          </Text>
          {props.socialList.map((item, index) => {
            return (
              <Box key={index}>
                <IconButton
                  onPress={() => {
                    props.navigation.navigate("Admin_view_p", {
                      keys: item.social_id,
                    });
                  }}
                  colorScheme="success"
                  borderRadius="full"
                  variant="outline"
                  _icon={{
                    as: Ionicons,
                    name: "eye",
                    size: "3",
                  }}
                />
              </Box>
            );
          })}
        </VStack>
      </HStack>
    </Box>
  );
};

function Admin_post_Screen({ navigation }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [socialList, setSocialList] = useState([]);
  let [fontsLoaded] = useFonts({
    Kanit_500Medium,
    Kanit_400Regular,
  });

  async function showSocial() {
    await Axios.get(`http://${SERVER_IP}:${PORT}/social`)
      .then((response) => {
        let data = response.data;
        data.reverse();
        setSocialList(data);
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
    showSocial();
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
            <Heading fontSize={30} color="success.500">
              จัดการโพสต์
            </Heading>
          </Text>
          <Text style={{ fontFamily: "Kanit_400Regular" }} fontSize={18} my={3} color="secondary.500">
            จำนวนโพสต์ทั้งหมด {socialList.length}
          </Text>
          <Divider my="3" />
          <ScrollView>
            {socialList.length != 0 ? (
              <Admin_list_post
                navigation={navigation}
                socialList={socialList}
              />
            ) : (
              <Box></Box>
            )}
          </ScrollView>
        </Center>
      </NativeBaseProvider>
    );
  }
}

export default Admin_post_Screen;
