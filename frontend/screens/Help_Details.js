import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, StackActions } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts, Kanit_500Medium, Kanit_400Regular } from '@expo-google-fonts/kanit';
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
  Spinner,
  Pressable,
} from "native-base";
import { Alert } from "react-native";

export const RenderUser = (props) => {
  let uList = props.userList.filter((array) => array.member_id == props.memId);
  if (uList.length != 0) {
    return (
      <Text mx="auto" fontSize={14} color="info.700" style={{ fontFamily: 'Kanit_400Regular'}}>
        {uList[0].member_fname} {uList[0].member_lname}
      </Text>
    );
  } else {
    return <Text></Text>;
  }
};

export const RenderOwner = (props) => {
  let user = props.userList.filter(
    (array) => array.member_id == props.thisAid.member_id
  );
  if (user.length != 0) {
    return (
      <Text fontSize={18} color="violet.500" ml="-2" mt="-1" style={{ fontFamily: 'Kanit_400Regular'}}>
        โดย {user[0].member_fname} {user[0].member_lname}
      </Text>
    );
  } else {
    return <Text></Text>;
  }
};

function Help_Detail_Screen({ navigation, route }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [thisAid, setThisAid] = useState({});
  const [datetime, setDatetime] = useState(new Date());
  const [subList, setSubList] = useState([]);
  const [subListForAmount, setSubListForAmount] = useState([]);
  const [subListValidate, setSubListValidate] = useState(false);
  const [userList, setUserList] = useState([]);

  const popAction = StackActions.pop(1);

  let [fontsLoaded] = useFonts({
    Kanit_500Medium, Kanit_400Regular
  });


  async function showThisAid() {
    // This Aid
    await Axios.get(`http://${SERVER_IP}:${PORT}/aid/${route.params.keys}`)
      .then((response) => {
        let data = response.data;
        setThisAid(data);
        setDatetime(new Date(data.aid_datetime)); // Fix date
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function showThisSub() {
    // This Sub
    await Axios.get(`http://${SERVER_IP}:${PORT}/sub`)
      .then((response) => {
        let data = response.data;
        let data1 = data.filter(
          (array) =>
            array.aid_id == route.params.keys && array.member_id == info.s_id
        );
        setSubList(data1);
        let data2 = data.filter((array) => array.aid_id == route.params.keys);
        setSubListForAmount(data2);
        setSubListValidate(true);
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
    showThisAid();
    showThisSub();
    getUser();
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
      <ScrollView>
        <Center flex={1} px="2">
          <Box marginTop={50} p="5" py="15" w="100%" mx="auto">
            <Text style={{ fontFamily: 'Kanit_400Regular'}} padding={3} Size={18} ml="-3" color="indigo.600">
            <Heading  color="indigo.600">
              ขอความช่วยเหลือ
            </Heading>
            </Text>
            <Stack p="4" space={5} borderRadius="6" borderWidth="0.25">
              <Stack space={2}>
              <Text style={{ fontFamily: 'Kanit_400Regular'}} fontSize="23" paddingTop="2"   ml="-2">
                <Heading color="tertiary.600" >
                  {thisAid.aid_head}
                </Heading>
                </Text>
                <RenderOwner userList={userList} thisAid={thisAid} />
              </Stack>
              <Text fontSize={15} ml="-2" style={{ fontFamily: 'Kanit_400Regular'}}>
                {thisAid.aid_body}
              </Text>
              <Text
              style={{ fontFamily: 'Kanit_400Regular'}}
                textAlign="right"
                padding={1}
                fontSize={11}
                color="coolGray.600"
              >
                เริ่มวันที่{" "}
                {datetime.getFullYear() +
                  "-" +
                  (datetime.getMonth() + 1) +
                  "-" +
                  datetime.getDate()}{" "}
                เวลา {datetime.getHours() + ":" + datetime.getMinutes()}
              </Text>
              <Stack justifyContent="center" space={5}>
                {thisAid.aid_state == undefined ? (
                  <Text></Text>
                ) : thisAid.aid_state == "ปิด" ? (
                  <Pressable
                    onPress={() => {
                      if (thisAid.member_id == info.s_id) {
                        let formData = {
                          state: "เปิด",
                        };
                        Axios.put(
                          `http://${SERVER_IP}:${PORT}/aidstate/${route.params.keys}`,
                          formData
                        )
                          .then((response) => {
                            showThisAid();
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      } else {
                        return;
                      }
                    }}
                  >
                    <Badge
                    _text={{ fontFamily: 'Kanit_400Regular'}}
                      colorScheme="warning"
                      alignSelf="center"
                      variant={"outline"}
                    >
                      <Text style={{ fontFamily: 'Kanit_400Regular'}} color="warning.500" >สถานะ : ปิด</Text>
                    </Badge>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => {
                      if (thisAid.member_id == info.s_id) {
                        let formData = {
                          state: "ปิด",
                        };
                        Axios.put(
                          `http://${SERVER_IP}:${PORT}/aidstate/${route.params.keys}`,
                          formData
                        )
                          .then((response) => {
                            showThisAid();
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      } else {
                        return;
                      }
                    }}
                  >
                   
                    <Badge 
                    colorScheme="success"
                      alignSelf="center"
                      variant={"outline"}>
                        <Text style={{ fontFamily: 'Kanit_400Regular'}} color="success.500">สถานะ : เปิด</Text>
                      
                      
                    </Badge>
                    
                  </Pressable>
                )}
                {thisAid.member_id == info.s_id ? (
                  <Text></Text>
                ) : subListValidate ? (
                  subList.length == 0 ? (
                    <Button
                      size="lg"
                      colorScheme="indigo"
                      onPress={() => {
                        const formData = {
                          sid: info.s_id,
                        };
                        Axios.post(
                          `http://${SERVER_IP}:${PORT}/sub/${route.params.keys}`,
                          formData
                        )
                          .then((response) => {
                            showThisSub();
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                    >
                      <Text style={{ fontFamily: 'Kanit_400Regular', color:"white"}} fontSize="18">เข้าร่วม</Text>
                      
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      colorScheme="danger"
                      onPress={() => {
                        Axios.delete(
                          `http://${SERVER_IP}:${PORT}/sub/${subList[0].sub_id}`
                        )
                          .then((response) => {
                            showThisSub();
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                    >
                      <Text style={{ fontFamily: 'Kanit_400Regular', color:"white"}} fontSize="18">ยกเลิกเข้าร่วม</Text>
                    </Button>
                  )
                ) : (
                  <Spinner size="lg" />
                )}
              </Stack>
            </Stack>
            {subListForAmount.length == 0 && thisAid.member_id == info.s_id ? (
              <Box style={{ alignItems: "center" }}>
                <Button
                  colorScheme="danger"
                  width="20%"
                  size="sm"
                  m={3}
                  onPress={() => {
                    Axios.delete(
                      `http://${SERVER_IP}:${PORT}/aid/${route.params.keys}`
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
              </Box>
            ) : (
              <Box></Box>
            )}

            <Divider my="2" />
            <Stack space={2}>
              <Text mx="auto" fontSize={20} color="tertiary.500" style={{ fontFamily: 'Kanit_400Regular'}}>
                จำนวนคนที่เข้ารวม {subListForAmount.length}
              </Text>
              <Divider my="1" />
              {subListForAmount.map((item, index) => {
                return (
                  <RenderUser
                    key={index}
                    memId={item.member_id}
                    userList={userList}
                  />
                );
              })}
            </Stack>
            <Divider my="35" />
          </Box>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );}
}

export default Help_Detail_Screen;
