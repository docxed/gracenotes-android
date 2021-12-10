import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, StackActions } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useValidation } from 'react-native-form-validator';
import {
  Box,
  Text,
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
import { useFonts, Kanit_500Medium, Kanit_400Regular } from '@expo-google-fonts/kanit';

function Help_Post_Screen({ navigation }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [head, setHead] = useState("");
  const [body, setBody] = useState("");
  const [location, setLocation] = useState("");
  const [datetime, setDatetime] = useState(new Date());

  var [mode, setMode] = useState("date");
  var [show, setShow] = useState(false);

  const popAction = StackActions.pop(1);

  let [fontsLoaded] = useFonts({
    Kanit_500Medium, Kanit_400Regular
  });

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { head, body, location, datetime },
    });

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

  if(!fontsLoaded){
    return(<NativeBaseProvider ><Text></Text></NativeBaseProvider>)
    
  }
  else{

  return (
    <NativeBaseProvider>
      <Heading
      style={{ fontFamily: 'Kanit_400Regular'}}
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
                <FormControl.Label _text={{ fontFamily: 'Kanit_400Regular'}}>เรื่องที่ต้องการให้ช่วย</FormControl.Label>
                <Input
                style={{ fontFamily: 'Kanit_400Regular'}}
                  placeholder="ชื่อเรื่อง"
                  value={head}
                  onChangeText={(text) => setHead(text)}
                />
                {isFieldInError('head') ? (<Text  style={{ color: 'red', fontFamily: 'Kanit_400Regular' }}>โปรดใส่หัวข้อ</Text>) : (<Text></Text>)}
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ fontFamily: 'Kanit_400Regular'}}>รายละเอียด</FormControl.Label>
                <TextArea
                style={{ fontFamily: 'Kanit_400Regular'}}
                  placeholder="เพิ่มรายละเอียด"
                  value={body}
                  onChangeText={(text) => setBody(text)}
                />
                {isFieldInError('body') ? (<Text  style={{ color: 'red',fontFamily: 'Kanit_400Regular'  }}>โปรดใส่รายละเอียด</Text>) : (<Text></Text>)}
                
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ fontFamily: 'Kanit_400Regular'}}>สถานที่</FormControl.Label>
                <Input
                style={{ fontFamily: 'Kanit_400Regular'}}
                  placeholder="สถานที่"
                  value={location}
                  onChangeText={(text) => setLocation(text)}
                />
                {isFieldInError('location') ? (<Text  style={{ color: 'red', fontFamily: 'Kanit_400Regular' }}>โปรดระบุสถานที่</Text>) : (<Text></Text>)}
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ fontFamily: 'Kanit_400Regular'}}>เวลา</FormControl.Label>
                <Input
                style={{ fontFamily: 'Kanit_400Regular'}}
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
                <FormControl.Label _text={{ fontFamily: 'Kanit_400Regular'}}>
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
                style={{ fontFamily: 'Kanit_400Regular'}}
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
                {isFieldInError('datetime') ? (<Text style={{ color: 'red', fontFamily: 'Kanit_400Regular' }}>โปรดระบุระยะเวลาและวันที่</Text>) : (<Text></Text>)}
              </FormControl>
            </VStack>
            <Divider my="5" />
            <VStack padding={15}>
              <Button
              _text={{ fontFamily: 'Kanit_400Regular'}}
                size="lg"
                alignSelf="center"
                colorScheme="secondary"
                onPress={() => {

                  if(validate({
                    head: {maxlength: 100, required: true },
                    body: {maxlength: 100, required: true},
                    location: {maxlength: 100, required: true},
                    datetime: {required: true},
    
                  })){

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
                      navigation.navigate("MyHistory");
                      setBody("")
                      setDatetime(new Date())
                      setHead("")
                      setLocation("")
                      // navigation.navigate(""); HERE TO ADD NAVIGATE
                    })
                    .catch((error) => {
                      console.log(error);
                    });

                  }else{
                    return false
                  }



                  
                }}
              >
                โพสต์
              </Button>
            </VStack>
          </ScrollView>
        </Box>
      </Center>
    </NativeBaseProvider>
  );}
}

export default Help_Post_Screen;
