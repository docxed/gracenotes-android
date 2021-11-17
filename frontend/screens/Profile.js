import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Avatar,
  Input,
  ScrollView,
  IconButton,
  Icon,
  Button,
  Divider,
  Spinner,
  Text,
} from "native-base";
import { Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

function Profile_Screen({ navigation }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [me, setMe] = useState({}); // My Member Data query From info(LocalStorage)
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [no, setNo] = useState("");
  const [born, setBorn] = useState(new Date());
  const [bornValidate, setBornValidate] = useState(false);
  const [address, setAddress] = useState("");
  const [rawpass, setRawpass] = useState("");
  const [old, setoldPass] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");
  const [image, setImage] = useState("");

  var [mode, setMode] = useState("date");
  var [show, setShow] = useState(false);

  async function showMe() {
    // My Member
    await Axios.get(`http://${SERVER_IP}:${PORT}/user/${info.s_id}`)
      .then((response) => {
        let data = response.data;
        setMe(data);
        setFname(data.member_fname);
        setLname(data.member_lname);
        setUser(data.member_user);
        setRoom(data.member_class);
        setNo(data.member_no);
        setAddress(data.member_address);
        setoldPass(data.member_pass);
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
    innerFunction();
  }, [innerFunction]);

  var onChange = (event, selectedDate) => {
    var currentDate = selectedDate || born;
    setShow(Platform.OS === "ios");
    setBorn(currentDate);
    setBornValidate(true);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  return (
    <NativeBaseProvider>
      <Box flex={1} py="8" w="90%" mx="auto">
        <ScrollView>
          <Heading alignSelf="center" fontSize="xl" p="4" pb="3">
            โปรไฟล์
          </Heading>
          <VStack>
            {me.member_img != undefined ? (
              <Avatar
                alignSelf="center"
                size="110"
                source={{
                  uri: me.member_img,
                }}
              />
            ) : (
              <Spinner size="lg" />
            )}
          </VStack>
          <VStack space={2} mt="3" padding={5}>
            <FormControl>
              <FormControl.Label>รหัสนักเรียน</FormControl.Label>
              <Input placeholder={user} variant="filled" editable={false} />
            </FormControl>
            <FormControl>
              <FormControl.Label>ชื่อ</FormControl.Label>
              <Input
                placeholder="ชื่อ"
                value={fname}
                onChangeText={(text) => setFname(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>นามสกุล</FormControl.Label>
              <Input
                placeholder="นามสกุล"
                value={lname}
                onChangeText={(text) => setLname(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: "coolGray.800",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                ชั้นเรียน
              </FormControl.Label>
              <Input
                placeholder="6/1"
                w={{
                  base: "35%",
                }}
                value={room}
                onChangeText={(text) => setRoom(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: "coolGray.800",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                เลขที่
              </FormControl.Label>
              <Input
                placeholder="20"
                w={{
                  base: "35%",
                }}
                value={no}
                onChangeText={(text) => setNo(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: "coolGray.800",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                วัน/เดือน/ปีเกิด
                <FormControl>
                  {show && (
                    <DateTimePicker
                      style={{ margin: 50 }}
                      value={born}
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
                placeholder="20/07/2543"
                w={{
                  base: "55%",
                  md: "25%",
                }}
                editable={false}
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
                value={
                  bornValidate
                    ? born.getFullYear() +
                      "-" +
                      (born.getMonth() + 1) +
                      "-" +
                      born.getDate()
                    : me.member_dob == undefined
                    ? ""
                    : me.member_dob.substr(0, 10)
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>ที่อยู่</FormControl.Label>
              <Input
                marginBottom={2}
                placeholder="บนโลกเนี่ยแหละ"
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>รหัสผ่านใหม่</FormControl.Label>
              <Input
                type="password"
                marginBottom={2}
                placeholder="รหัสผ่านใหม่"
                value={pass}
                onChangeText={(text) => setPass(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>ยืนยันรหัสผ่านใหม่</FormControl.Label>
              <Input
                type="password"
                marginBottom={2}
                placeholder="ยืนยันรหัสผ่านใหม่"
                value={repass}
                onChangeText={(text) => setRepass(text)}
              />
            </FormControl>
          </VStack>
          <Divider my="5" />
          <Button
            w={{ base: "40%" }}
            size="lg"
            alignSelf="center"
            colorScheme="info"
            onPress={() => {
              if (pass != repass) {
                Alert.alert("รหัสผ่าน และ ยืนยันรหัสผ่าน ไม่ตรงกัน!");
                setPass("");
                setRepass("");
                return;
              }
              const formData = {
                user: user,
                fname: fname,
                lname: lname,
                classes: room,
                no: no,
                dob: born,
                address: address,
                pass: pass,
                level: me.member_level,
              };
              Axios.put(
                `http://${SERVER_IP}:${PORT}/user/${me.member_id}`,
                formData
              )
                .then(async (response) => {
                  const data = response.data;
                  Alert.alert(data+' ลงชื่อออก');
                  await AsyncStorage.clear();
                  navigation.navigate("Login");
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            อัปเดต
          </Button>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
}

export default Profile_Screen;
