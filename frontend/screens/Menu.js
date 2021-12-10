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
  Avatar,
  HStack,
  VStack,
  Icon,
  Text,
  Button,
  Center,
  NativeBaseProvider,
  Spacer,
  Spinner,
} from "native-base";
import { useFonts, Kanit_500Medium, Kanit_400Regular } from '@expo-google-fonts/kanit';

function Menu_Screen({ navigation }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [me, setMe] = useState({}); // My Member Data query From info(LocalStorage)

  let [fontsLoaded] = useFonts({
    Kanit_500Medium, Kanit_400Regular
  });

  async function showMe() {
    // My Member
    await Axios.get(`http://${SERVER_IP}:${PORT}/user/${info.s_id}`)
      .then((response) => {
        let data = response.data;
        setMe(data);
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
    showMe();
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
        <Box alignItems="center" w="90%" mx="auto">
          <Text style={{ fontFamily: 'Kanit_400Regular'}} fontSize="xl" p="4" pb="3">
          <Heading color="indigo.500">
            โปรไฟล์
          </Heading>
          </Text>
          {me.member_img != undefined ? (
            <Avatar
              size="120"
              source={{
                uri: me.member_img,
              }}
            />
          ) : (
            <Spinner size="lg" />
          )}

          <Button
            my="15"
            onPress={() => {
              navigation.navigate("editProfile");
            }}
          >
            <Text style={{ fontFamily: 'Kanit_400Regular', color:"white"}}>
            แก้ไขโปรไฟล์ส่วนตัว
            </Text>
          </Button>
          <Divider my="2" />
          <VStack space={2}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("MyGrace");
              }}
            >
              <Box>
                <HStack space={3}>
                  <Icon
                    color="success.400"
                    as={MaterialCommunityIcons}
                    name="note-multiple"
                  />
                  <Text style={{ fontFamily: 'Kanit_400Regular'}}  color="success.400" fontSize={20}>
                    บันทึกความดีของฉัน
                  </Text>
                </HStack>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("MyHistory");
              }}
            >
              <Box>
                <HStack space={3}>
                  <Icon color="teal.400" as={MaterialIcons} name="history" />
                  <Text color="teal.400" fontSize={20} style={{ fontFamily: 'Kanit_400Regular'}}>
                    ประวัติความช่วยเหลือ
                  </Text>
                </HStack>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("PostHelp");
              }}
            >
              <Box>
                <HStack space={3}>
                  <Icon
                    color="warning.400"
                    as={MaterialIcons}
                    name="post-add"
                  />
                  <Text color="warning.400" fontSize={20} style={{ fontFamily: 'Kanit_400Regular'}}>
                    โพสต์ขอความช่วยเหลือ
                  </Text>
                </HStack>
              </Box>
            </TouchableOpacity>
            {info.s_level == "teacher" && info.s_id != undefined ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate("Admin");
                }}
              >
                <Box>
                  <HStack space={3}>
                    <Icon
                      color="rose.500"
                      as={MaterialIcons}
                      name="admin-panel-settings"
                    />
                    <Text color="rose.500" fontSize={20} style={{ fontFamily: 'Kanit_400Regular'}}>
                      Admin Panel
                    </Text>
                  </HStack>
                </Box>
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}
          </VStack>
          <Divider my="2" />
          <Button
            w={{ base: "40%" }}
            size="lg"
            alignSelf="center"
            colorScheme="danger"
            leftIcon={<Icon as={MaterialIcons} name="logout" size="sm" />}
            onPress={async () => {
              await AsyncStorage.clear();
              navigation.navigate("Login");
            }}
          >
            <Text style={{ fontFamily: 'Kanit_400Regular', color:"white"}}>ออกจากระบบ</Text>
            
          </Button>
        </Box>
      </Center>
    </NativeBaseProvider>
  );}
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
  },
});

export default Menu_Screen;
