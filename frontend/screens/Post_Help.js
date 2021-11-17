import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  Box,
  Heading,
  Image,
  TextArea,
  Center,
  CheckIcon,
  Divider,
  IconButton,
  Icon,
  Select,
  ScrollView,
  NativeBaseProvider,
  VStack,
  FormControl,
  Input,
  Button,
} from "native-base";
import { Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

function Help_Post_Screen({ navigation }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [head, setHead] = useState("");
  const [body, setBody] = useState("");
  const [location, setLocation] = useState("");
  const [datetime, setDatetime] = useState(new Date());

  var [mode, setMode] = useState("date");
  var [show, setShow] = useState(false);

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

  var onChange = (event, selectedDate) => {
    var currentDate = selectedDate || datetime;
    setShow(Platform.OS === "ios");
    setDatetime(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <NativeBaseProvider>
      <Heading
        mt={45}
        textAlign="center"
        size="lg"
        fontWeight="600"
        color="indigo.500"
      >
        โพสต์ขอความช่วยเหลือ
      </Heading>
      <Center flex={1} px="3">
        <Box flex={1} py="8" w="90%" mx="auto">
          <ScrollView>
            <VStack
              space={2}
              mt="3"
              padding={5}
              borderWidth="1"
              borderRadius="5"
              backgroundColor="gray.100"
            >
              <FormControl>
                <FormControl.Label>เรื่องที่ต้องการให้ช่วย</FormControl.Label>
                <Input
                  placeholder="ชื่อเรื่อง"
                  value={head}
                  onChangeText={(text) => setHead(text)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>รายละเอียด</FormControl.Label>
                <TextArea
                  placeholder="เพิ่มรายละเอียด"
                  value={body}
                  onChangeText={(text) => setBody(text)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>สถานที่</FormControl.Label>
                <Input
                  placeholder="สถานที่"
                  value={location}
                  onChangeText={(text) => setLocation(text)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>เวลา</FormControl.Label>
                <Input
                  editable={false}
                  value={datetime.getHours() + ":" + datetime.getMinutes()}
                  InputRightElement={
                    <IconButton
                      icon={<Icon as={Ionicons} name="time-outline" />}
                      borderRadius="full"
                      _icon={{
                        color: "gray.400",
                        size: "sm",
                      }}
                      onPress={showTimepicker}
                    />
                  }
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  วันที่
                  <FormControl>
                    {show && (
                      <DateTimePicker
                        style={{ margin: 50 }}
                        value={datetime}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        placeholder="DD/MM/YYYY"
                        onChange={onChange}
                      />
                    )}
                  </FormControl>
                </FormControl.Label>
                <Input
                  editable={false}
                  value={
                    datetime.getFullYear() +
                    "-" +
                    (datetime.getMonth() + 1) +
                    "-" +
                    datetime.getDate()
                  }
                  InputRightElement={
                    <IconButton
                      icon={<Icon as={AntDesign} name="calendar" />}
                      borderRadius="full"
                      _icon={{
                        color: "gray.400",
                        size: "sm",
                      }}
                      onPress={showDatepicker}
                    />
                  }
                />
              </FormControl>
            </VStack>
            <Divider my="5" />
            <VStack padding={15}>
              <Button
                size="lg"
                alignSelf="center"
                colorScheme="secondary"
                onPress={() => {
                  const formData = {
                    head: head,
                    body: body,
                    location: location,
                    datetime: datetime,
                    sid: info.s_id,
                  };
                  Axios.post(`http://${SERVER_IP}:${PORT}/aid`, formData)
                    .then((response) => {
                      const data = response.data;
                      Alert.alert(data);
                      // navigation.navigate("PostHelp");
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                โพสต์
              </Button>
            </VStack>
          </ScrollView>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

export default Help_Post_Screen;
