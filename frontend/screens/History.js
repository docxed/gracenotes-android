import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  Box,
  Heading,
  Text,
  Center,
  Flex,
  Divider,
  Spacer,
  ScrollView,
  Stack,
  NativeBaseProvider,
} from "native-base";

export const History_Post = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        props.navigation.navigate("History_Detail", {
          keys: props.item.aid_id,
        });
      }}
    >
      <Box
        width={350}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.500"
        borderWidth="1"
        backgroundColor="purple.200"
      >
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading color="indigo.500" size="md" ml="-1">
              ขอความช่วยเหลือ: {props.item.aid_head}
            </Heading>
          </Stack>
          <Text color="coolGray.700" fontSize={14}>
            {props.item.aid_body}
          </Text>
          <Text color="coolGray.700" fontSize={11}>
            ที่: {props.item.aid_location}
          </Text>
          {props.item.aid_state == "เปิด" ? (
            <Text textAlign="left" color="success.500" fontSize={11}>
              สถานะ: {props.item.aid_state}
            </Text>
          ) : (
            <Text textAlign="left" color="warning.500" fontSize={11}>
              สถานะ: {props.item.aid_state}อยู่
            </Text>
          )}

          <Text textAlign="right" color="coolGray.600" fontSize={11}>
            เริ่มวันที่{" "}
            {props.date.getFullYear() +
              "-" +
              (props.date.getMonth() + 1) +
              "-" +
              props.date.getDate()}{" "}
            เวลา {props.date.getHours()}:{props.date.getMinutes()}
          </Text>
        </Stack>
      </Box>
    </TouchableOpacity>
  );
};

export const History_list = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        props.navigation.navigate("History_Detail", {keys: props.item.aid_id});
      }}
    >
      <Box
        width={350}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.500"
        borderWidth="1"
        backgroundColor="gray.300"
      >
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading color="indigo.500" size="md" ml="-1">
              ช่วยเหลือ: {props.item.aid_head}
            </Heading>
          </Stack>
          <Text color="coolGray.700" fontSize={12}>
            ที่: {props.item.aid_location}
          </Text>
          <Text textAlign="left" color="success.500" fontSize={11}>
            เข้าร่วมแล้ว
          </Text>
          <Text textAlign="right" color="coolGray.600" fontSize={11}>
            เข้าร่วมเมื่อวันที่{" "}
            {props.date.getFullYear() +
              "-" +
              (props.date.getMonth() + 1) +
              "-" +
              props.date.getDate()}{" "}
            เวลา {props.date.getHours()}:{props.date.getMinutes()}
          </Text>
        </Stack>
      </Box>
    </TouchableOpacity>
  );
};

function History_Screen({ navigation }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [myAidList, setMyAidList] = useState([]);
  const [mySubList, setMySubList] = useState([]);
  const [filter, setFilter] = useState("");

  async function showPage(page) {
    setFilter(page);
  }

  async function showMySub() {
    await Axios.get(`http://${SERVER_IP}:${PORT}/sub/history`)
      .then((response) => {
        let data = response.data;
        data = data.filter((array) => array.member_id == info.s_id);
        
        data.reverse();
        setMySubList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function showMyAid() {
    await Axios.get(`http://${SERVER_IP}:${PORT}/aid`)
      .then((response) => {
        let data = response.data;
        data = data.filter((array) => array.member_id == info.s_id);
        data.reverse();
        setMyAidList(data);
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
    showMyAid();
    showMySub();
    showPage("one");
  }, [info]);

  useEffect(() => {
    // useState is Asynchronous!!!, Thus you need to Hook for getValue on created info(LocalStorage)
    innerFunction();
  }, [innerFunction]);
  return (
    <NativeBaseProvider>
      <Heading
        marginTop={45}
        textAlign="center"
        size="lg"
        fontWeight="600"
        color="indigo.500"
      >
        ประวัติความช่วยเหลือ
      </Heading>
      <Spacer my="2" />
      <Center padding="3">
        <Flex
          direction="row"
          width="250"
          borderRadius="3xl"
          backgroundColor="gray.50"
        >
          <Spacer />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              showPage("one");
            }}
          >
            <Text color="warning.500">โพสต์ของฉัน</Text>
            <Text color="warning.500">{myAidList.length}</Text>
          </TouchableOpacity>
          <Divider orientation="vertical" mx="auto" />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              showPage("two");
            }}
          >
            <Text color="error.500">ประวัติช่วยเหลือ</Text>
            <Text color="error.500">{mySubList.length}</Text>
          </TouchableOpacity>
          <Spacer />
        </Flex>
      </Center>
      <ScrollView
        _contentContainerStyle={{
          px: "10px",
          mb: "4",
          minW: "72",
        }}
      >
        <Divider my="auto" />
        <Center flex={2} px="3">
          {filter == "one" && myAidList.length != 0 ? (
            myAidList.map((item, index) => {
              return (
                <History_Post
                  key={index}
                  navigation={navigation}
                  item={item}
                  date={new Date(item.aid_datetime)}
                />
              );
            })
          ) : (
            <Box></Box>
          )}
          {filter == "two" && mySubList.length != 0 ? (
            mySubList.map((item, index) => {
              return (
                <History_list
                  key={index}
                  navigation={navigation}
                  item={item}
                  date={new Date(item.sub_timestamp)}
                />
              );
            })
          ) : (
            <Box></Box>
          )}
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: "center",
  },
});

export default History_Screen;
