import React, { useState, useEffect } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Badge,
  Heading,
  Divider,
  Icon,
  Text,
  Center,
  Stack,
  ScrollView,
  NativeBaseProvider,
  Button,
  Image,
} from "native-base";

function Grace_Detail_Screen({ navigation, route }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [me, setMe] = useState({}); // My Member Data query From info(LocalStorage)
  const [thisGrace, setThisGrace] = useState({}); // This Grace
  const [user, setUser] = useState({}); // User of This Grace

  async function showThisGrace() {
    // This Grace
    await Axios.get(`http://${SERVER_IP}:${PORT}/grace/${route.params.keys}`)
      .then((response) => {
        let data = response.data;
        setThisGrace(data);
        findUser(data.member_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
  async function findUser(sid) {
    // User of This Grace
    await Axios.get(`http://${SERVER_IP}:${PORT}/user/${sid}`)
      .then((response) => {
        let data = response.data;
        setUser(data);
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

  useEffect(() => {
    // useState is Asynchronous!!!, Thus you need to Hook for getValue on created info(LocalStorage)
    showMe();
    showThisGrace();
  }, [info]);

  function renderStatusCheck() {
    if (thisGrace.grace_check == "ผ่าน") {
      return (
        <Badge colorScheme="success" alignSelf="flex-end" variant={"outline"}>
          รับรองแล้ว
        </Badge>
      );
    } else if (thisGrace.grace_check == "ไม่ผ่าน") {
      return (
        <Badge colorScheme="warning" alignSelf="flex-end" variant={"outline"}>
          ไม่รับรอง
        </Badge>
      );
    } else{
        return (
            <Badge colorScheme="light" alignSelf="flex-end" variant={"outline"}>
              รอการรับรอง
            </Badge>
          ); 
    }
  }

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Center flex={1} px="2">
          <Box marginTop={50} p="5" py="15" w="100%" mx="auto">
            <Stack p="4" space={5} borderRadius="6" borderWidth="0.25">
              <Stack space={2}>
                <Heading padding={3} Size={18} ml="-3" color="indigo.600">
                  บันทึกความดี
                </Heading>
                <Box style={{ alignItems: "center" }} my={5}>
                  <Image
                    source={{
                      uri: "https://cms.swensens1112.com/image/product/47/5947.jpg",
                    }}
                    alt="Alternate Text"
                    size="2xl"
                  />
                </Box>
                {renderStatusCheck()}
                <Text textAlign="right" fontSize={11} color="coolGray.600">
                  เมื่อวันที่{" "}
                  {thisGrace.grace_date != undefined
                    ? thisGrace.grace_date.substr(0, 10)
                    : ""}{" "}
                  เป็นเวลา {thisGrace.grace_time} ชั่วโมง
                </Text>
                <Text textAlign="right" fontSize={11} color="coolGray.600">
                  ที่ {thisGrace.grace_agency}
                </Text>
              </Stack>
              <Text fontSize={15} ml="-2">
                {thisGrace.grace_detail}
              </Text>
              <Text
                textAlign="right"
                fontSize={16}
                color="violet.500"
                ml="-2"
                mt="-1"
              >
                โดย {user.member_fname} {user.member_lname}
              </Text>
            </Stack>
          </Box>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default Grace_Detail_Screen;
