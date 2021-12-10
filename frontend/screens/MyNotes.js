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
  InfoIcon,
  Spinner,
} from "native-base";

import { useFonts, Kanit_500Medium, Kanit_400Regular } from '@expo-google-fonts/kanit';

export const Grace_list = (props) => {
  function renderCheck() {
    let statusCheck = props.item.grace_check;
    if (statusCheck == "ผ่าน") {
      return (
        <Text textAlign="left" color="success.500" fontSize={11} style={{ fontFamily: 'Kanit_400Regular'}}>
          รับรองแล้ว
        </Text>
      );
    } else if (statusCheck == "ไม่ผ่าน") {
      return (
        <Text textAlign="left" color="warning.500" fontSize={11} style={{ fontFamily: 'Kanit_400Regular'}}>
          ไม่รับรอง
        </Text>
      );
    } else {
      return (
        <Text textAlign="left" fontSize={11} style={{ fontFamily: 'Kanit_400Regular'}}>
          รอการรับรอง
        </Text>
      );
    }
  }
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        // Parse parameter id of grace to Grace_Details page
        props.navigation.navigate("Grace_Details", {
          keys: props.item.grace_id,
        });
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
            <Text style={{ fontFamily: 'Kanit_400Regular', paddingTop:2}} >
            <Heading color="indigo.500" size="md" ml="-1">
              {props.item.grace_detail}
            </Heading>
            </Text>
          </Stack>
          <Text color="coolGray.700" fontSize={12} style={{ fontFamily: 'Kanit_400Regular'}}>
            ที่ {props.item.grace_agency} ทำความดีเป็นเวลา{" "}
            {props.item.grace_time} ชั่วโมง
          </Text>
          {renderCheck()}
          <Text textAlign="right" color="coolGray.600" fontSize={11} style={{ fontFamily: 'Kanit_400Regular'}}>
            {/* substr For cutting string of date to simple display */}
            วันที่ {props.item.grace_date.substr(0, 10)}
          </Text>
        </Stack>
      </Box>
    </TouchableOpacity>
  );
};

function Grace_list_Screen({ navigation }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [me, setMe] = useState({}); // My Member Data query From info(LocalStorage)
  const [rawGraceList, setRawGraceList] = useState([]); // Raw List For Compare, Whenever you want
  const [graceList, setGraceList] = useState([]); // List to render
  const [allAmount, setAllAmount] = useState(0); // Amount of ความดี ทั้งหมด
  const [checkAmount, setCheckAmount] = useState(0); // Amount of ความดี ผ่าน
  const [unCheckAmount, setUnCheckAmount] = useState(0); // Amount of ความดี ไม่ผ่าน
  const [loading, setLoading] = useState(true);

  let [fontsLoaded] = useFonts({
    Kanit_500Medium, Kanit_400Regular
  });

  async function showGrace() {
    // My Grace List
    await Axios.get(`http://${SERVER_IP}:${PORT}/grace`)
      .then((response) => {
        let data = response.data;
        data = data.filter((array) => array.member_id == info.s_id); // Select My Grace
        data.reverse(); // Order by Desc
        setRawGraceList(data); // RAW LIST FOR COMPARE WHEN FILTER SOMETHING
        setGraceList(data); // Default Render When open this page

        // Get Length of Grace Check
        setAllAmount(data.length);
        setCheckAmount(
          data.filter((array) => array.grace_check == "ผ่าน").length
        );
        setUnCheckAmount(
          data.filter((array) => array.grace_check == "ไม่ผ่าน").length
        );
        setLoading(false); // Status of Data
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
    showGrace();
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
      <Heading
      style={{ fontFamily: 'Kanit_400Regular'}}
        marginTop={45}
        textAlign="center"
        size="lg"
        fontWeight="600"
        color="indigo.500"
      >
        บันทึกความดีของ {me.member_fname} {me.member_lname}
      </Heading>
      <Spacer my="2" />
      <Center padding="3">
        <Flex direction="row" borderRadius="3xl" backgroundColor="gray.50">
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              let data = rawGraceList;
              setGraceList(data);
            }}
          >
            <Text color="warning.500" style={{ fontFamily: 'Kanit_400Regular'}}>ทั้งหมด</Text>
            <Text color="warning.500" style={{ fontFamily: 'Kanit_400Regular'}}>{allAmount}</Text>
          </TouchableOpacity>
          <Divider orientation="vertical" mx="3" />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              let data = rawGraceList.filter(
                (array) => array.grace_check == "ผ่าน"
              );
              setGraceList(data);
            }}
          >
            <Text color="success.500" style={{ fontFamily: 'Kanit_400Regular'}}>รับรอง</Text>
            <Text color="success.500" style={{ fontFamily: 'Kanit_400Regular'}}>{checkAmount}</Text>
          </TouchableOpacity>
          <Divider orientation="vertical" mx="3" />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              let data = rawGraceList.filter(
                (array) => array.grace_check == "ไม่ผ่าน"
              );
              setGraceList(data);
            }}
          >
            <Text color="error.500" style={{ fontFamily: 'Kanit_400Regular'}}>ไม่รับรอง</Text>
            <Text color="error.500" style={{ fontFamily: 'Kanit_400Regular'}}>{unCheckAmount}</Text>
          </TouchableOpacity>
        </Flex>
      </Center>
      <ScrollView
        _contentContainerStyle={{
          px: "10px",
          mb: "4",
          minW: "72",
        }}
      >
        <Spacer my="2" />
        <Center flex={2} px="3">
          {loading == false ? (
            <Box>
              {graceList.map((item, index) => {
                return (
                  <Grace_list key={index} navigation={navigation} item={item} />
                );
              })}
            </Box>
          ) : (
            <Spinner size="lg" />
          )}
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );}
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: "center",
  },
});

export default Grace_list_Screen;
