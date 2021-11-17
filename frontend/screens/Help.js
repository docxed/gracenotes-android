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
  ScrollView,
  Stack,
  NativeBaseProvider,
} from "native-base";

export const Help_list = (props) => {
  function renderDate() {
    let datetime = new Date(props.item.aid_datetime);
    return (
      <Text textAlign="right" color="coolGray.600" fontSize={11}>
        เริ่มวันที่{" "}
        {datetime.getFullYear() +
          "-" +
          (datetime.getMonth() + 1) +
          "-" +
          datetime.getDate()}{" "}
        เวลา {datetime.getHours() + ":" + datetime.getMinutes()}
      </Text>
    );
  }

  function renderUser() {
    let id = props.item.member_id;
    let user = props.userList.filter((array) => array.member_id == id);
    if (user.length != 0) {
      return (
        <Text
          fontSize={14}
          _light={{
            color: "violet.500",
          }}
          _dark={{
            color: "violet.400",
          }}
          fontWeight="500"
          ml="-0.5"
          mt="-1"
        >
          โดย {user[0].member_fname} {user[0].member_lname}
        </Text>
      );
    } else {
      return <Text></Text>;
    }
  }
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        props.navigation.navigate("Help_Second", { keys: props.item.aid_id });
      }}
    >
      <Box
        width={350}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        backgroundColor="dark.600"
      >
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              ขอความช่วยเหลือ : {props.item.aid_head}
            </Heading>
            {renderUser()}
          </Stack>
          <Text color="coolGray.600" fontSize={12}>
            สถานที่ {props.item.aid_location}
          </Text>
          {renderDate()}
        </Stack>
      </Box>
    </TouchableOpacity>
  );
};

function Help_Screen({ navigation }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [aidList, setAidList] = useState([]);
  const [userList, setUserList] = useState([]);

  async function showAid() {
    // Show Aid
    await Axios.get(`http://${SERVER_IP}:${PORT}/aid`)
      .then((response) => {
        let data = response.data;
        data = data.filter((array) => array.aid_state == 'เปิด')
        data.reverse(); // Order by Desc
        setAidList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getUser() {
    // Get User
    await Axios.get(`http://${SERVER_IP}:${PORT}/user`)
      .then((response) => {
        let data = response.data;
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
    getUser();
    showAid();
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
        ความช่วยเหลือทั้งหมด
      </Heading>
      <ScrollView
        _contentContainerStyle={{
          px: "10px",
          mb: "4",
          minW: "72",
        }}
      >
        <Center flex={2} px="3">
          {aidList.map((item, index) => {
            return (
              <Help_list
                key={index}
                navigation={navigation}
                item={item}
                userList={userList}
              />
            );
          })}
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

export default Help_Screen;
