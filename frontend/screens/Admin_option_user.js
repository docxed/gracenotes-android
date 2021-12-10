import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, StackActions } from "@react-navigation/native";
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
import { useFonts, Kanit_500Medium, Kanit_400Regular } from '@expo-google-fonts/kanit';

function Admin_option_user({ navigation, route }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [thisUser, setThisUser] = useState({});
  const [user, setUser] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [room, setRoom] = useState("");
  const [no, setNo] = useState("");
  const [born, setBorn] = useState("");
  const [address, setAddress] = useState("");
  const [level, setLevel] = useState("");

  const popAction = StackActions.pop(1);

  let [fontsLoaded] = useFonts({
    Kanit_500Medium, Kanit_400Regular
  });

  

  async function showThisUser() {
    await Axios.get(`http://${SERVER_IP}:${PORT}/user/${route.params.keys}`)
      .then((response) => {
        let data = response.data;
        setUser(data.member_user);
        setFname(data.member_fname);
        setLname(data.member_lname);
        setRoom(data.member_class);
        setNo(data.member_no);
        setBorn(data.member_dob);
        setAddress(data.member_address);
        setLevel(data.member_level);
        setThisUser(data);
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
    showThisUser();
  }, [info]);

  useEffect(() => {
    // useState is Asynchronous!!!, Thus you need to Hook for getValue on created info(LocalStorage)
    innerFunction();
  }, [innerFunction]);

  function renderBtn() {
    if (level == "student") {
      return (
        <Button
        _text={{ fontFamily: 'Kanit_400Regular'}}
          w={{ base: "90%" }}
          size="lg"
          alignSelf="center"
          colorScheme="info"
          onPress={() => {
            let formData = {
              level: "teacher",
            };
            Axios.put(
              `http://${SERVER_IP}:${PORT}/userlevel/${route.params.keys}`,
              formData
            )
              .then((response) => {
                let data = response.data;
                showThisUser();
                Alert.alert(data);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          ตั้งบทบาทครู
        </Button>
      );
    } else {
      return (
        <Button
        _text={{ fontFamily: 'Kanit_400Regular'}}
          w={{ base: "90%" }}
          size="lg"
          alignSelf="center"
          colorScheme="info"
          onPress={() => {
            let formData = {
              level: "student",
            };
            Axios.put(
              `http://${SERVER_IP}:${PORT}/userlevel/${route.params.keys}`,
              formData
            )
              .then((response) => {
                let data = response.data;
                showThisUser();
                Alert.alert(data);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          ตั้งบทบาทนักเรียน
        </Button>
      );
    }
  }

  if(!fontsLoaded){
    return(<NativeBaseProvider ><Text></Text></NativeBaseProvider>)
    
  }
  else{

  return (
    <NativeBaseProvider>
      <Box flex={1} py="8" w="90%" mx="auto">
        {thisUser.member_id != undefined ? (
          <ScrollView>
            <Text style={{ fontFamily: 'Kanit_400Regular'}} alignSelf="center" fontSize="xl" p="4" pb="3" >
            <Heading>
              หมายเลขบัญชี {thisUser.member_id}
            </Heading></Text>
            <VStack space={2} mt="3" padding={5}>
              <Avatar
                alignSelf="center"
                size="110"
                source={{
                  uri: thisUser.member_img,
                }}
              />
              <FormControl>
                <FormControl.Label _text={{ fontFamily: 'Kanit_400Regular'}}>รหัสนักเรียน {user}</FormControl.Label>
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ fontFamily: 'Kanit_400Regular'}}>ชื่อ</FormControl.Label>
                <Input style={{ fontFamily: 'Kanit_400Regular'}} editable={false} value={fname} placeholder="ชื่อ" />
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ fontFamily: 'Kanit_400Regular'}}>นามสกุล</FormControl.Label>
                <Input style={{ fontFamily: 'Kanit_400Regular'}} editable={false} value={lname} placeholder="นามสกุล" />
              </FormControl>
              <FormControl>
                <FormControl.Label
                  _text={{
                    fontFamily: 'Kanit_400Regular',
                    color: "coolGray.800",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  ชั้นเรียน
                </FormControl.Label>
                <Input
                style={{ fontFamily: 'Kanit_400Regular'}}
                editable={false}
                  value={room}
                  placeholder="6/1"
                  w={{
                    base: "35%",
                  }}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label
                  _text={{
                    fontFamily: 'Kanit_400Regular',
                    color: "coolGray.800",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  เลขที่
                </FormControl.Label>
                <Input
                style={{ fontFamily: 'Kanit_400Regular'}}
                editable={false}
                  value={no}
                  placeholder="20"
                  w={{
                    base: "35%",
                  }}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label
                  _text={{
                    fontFamily: 'Kanit_400Regular',
                    color: "coolGray.800",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  วัน/เดือน/ปีเกิด
                </FormControl.Label>
                <Input
                style={{ fontFamily: 'Kanit_400Regular'}}
                editable={false}
                  value={born.substr(0, 10)}
                  placeholder="20/07/2543"
                  w={{
                    base: "55%",
                    md: "25%",
                  }}
                  InputRightElement={
                    <IconButton
                      icon={<Icon as={AntDesign} name="calendar" />}
                      borderRadius="full"
                      _icon={{
                        color: "gray.400",
                        size: "sm",
                      }}
                    />
                  }
                />
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ fontFamily: 'Kanit_400Regular'}}>ที่อยู่</FormControl.Label>
                <Input
                style={{ fontFamily: 'Kanit_400Regular'}}
                editable={false}
                  value={address}
                  marginBottom={2}
                  placeholder="บนโลกเนี่ยแหละ"
                />
              </FormControl>
            </VStack>
            {renderBtn()}
            {thisUser.member_id != info.s_id ? (
              <Button
              _text={{ fontFamily: 'Kanit_400Regular'}}
                w={{ base: "90%" }}
                size="lg"
                alignSelf="center"
                colorScheme="error"
                m={3}
                onPress={() => {
                  Axios.delete(
                    `http://${SERVER_IP}:${PORT}/user/${route.params.keys}`
                  )
                    .then((response) => {
                      let data = response.data;
                      Alert.alert(data);
                      navigation.dispatch(popAction);
                      // navigation.navigate(""); HERE TO ADD NAVIGATE
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                ลบ
              </Button>
            ) : (
              <Box></Box>
            )}
          </ScrollView>
        ) : (
          <Box></Box>
        )}
      </Box>
    </NativeBaseProvider>
  );}
}

export default Admin_option_user;
