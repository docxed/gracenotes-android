import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useValidation } from 'react-native-form-validator';
import { useFonts, Kanit_500Medium, Kanit_400Regular } from '@expo-google-fonts/kanit';
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Icon,
  IconButton,
  Text,
  Center,
  HStack,
  Input,
  Stack,
  ScrollView,
  FormControl,
  NativeBaseProvider,
  Button,
  Spinner,
  VStack,
} from "native-base";

const Card = (props) => {




  return (
    <Box marginTop={50} p="5" py="15" w="100%" mx="auto">
      <Text textAlign="right" padding={1} fontSize={11} color="coolGray.600" style={{ fontFamily: 'Kanit_400Regular'}}>
        วันที่{" "}
        {props.date.getFullYear() +
          "-" +
          (props.date.getMonth() + 1) +
          "-" +
          props.date.getDate()}{" "}
        เวลา {props.date.getHours()}:{props.date.getMinutes()}
      </Text>
      <AspectRatio w="100%" ratio={16 / 9}>
        <Image
          source={{
            uri: props.thisSocical.social_img,
          }}
          alt="image"
        />
      </AspectRatio>
      <Stack p="4" space={5}>
        <Text fontSize={16} ml="-3" style={{ fontFamily: 'Kanit_400Regular'}}>
          {props.thisSocical.social_detail}
        </Text>
      </Stack>
    </Box>
  );
};

function Home_Screen_Comment({ navigation, route }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [thisSocical, setThisSocial] = useState({});
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  let [fontsLoaded] = useFonts({
    Kanit_500Medium, Kanit_400Regular
  });

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { comment },
    });

  async function showStatusList() {
    await Axios.get(`http://${SERVER_IP}:${PORT}/status/${route.params.keys}`)
      .then((response) => {
        let data = response.data;
        setStatusList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getUser() {
    await Axios.get(`http://${SERVER_IP}:${PORT}/user`)
      .then((response) => {
        let data = response.data;
        setUserList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function showCommentList() {
    await Axios.get(`http://${SERVER_IP}:${PORT}/comment/${route.params.keys}`)
      .then((response) => {
        let data = response.data;
        data.reverse();
        setCommentList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function showThisSocial() {
    await Axios.get(`http://${SERVER_IP}:${PORT}/social/${route.params.keys}`)
      .then((response) => {
        let data = response.data;
        setThisSocial(data);
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
    showThisSocial();
    getUser();
    showCommentList();
    showStatusList();
  }, [info]);

  useEffect(() => {
    // useState is Asynchronous!!!, Thus you need to Hook for getValue on created info(LocalStorage)
    innerFunction();
  }, [innerFunction]);

  function renderLike() {
    let amountLike = statusList.filter((array) => array.status_type == "like");
    return <Text color="gray.400" style={{ fontFamily: 'Kanit_400Regular'}}>{amountLike.length}</Text>;
  }
  function renderLove() {
    let amountLove = statusList.filter((array) => array.status_type == "love");
    return <Text color="gray.400" style={{ fontFamily: 'Kanit_400Regular'}}>{amountLove.length}</Text>;
  }
  function renderIcoLike() {
    let have = statusList.filter(
      (array) =>
        array.social_id == route.params.keys &&
        array.member_id == info.s_id &&
        array.status_type == "like"
    );
    if (have.length > 0) {
      // delete
      return (
        <IconButton
          icon={<Icon as={AntDesign} name="like1" />}
          borderRadius="full"
          _icon={{
            color: "primary.400",
            size: "sm",
          }}
          onPress={() => {
            Axios.delete(
              `http://${SERVER_IP}:${PORT}/status/${route.params.keys}/${info.s_id}`
            )
              .then((response) => {
                showStatusList();
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        />
      );
    } else {
      // Add
      return (
        <IconButton
          icon={<Icon as={AntDesign} name="like2" />}
          borderRadius="full"
          _icon={{
            color: "gray.400",
            size: "sm",
          }}
          onPress={() => {
            let formData = {
              type: "like",
              sid: info.s_id,
            };
            Axios.post(
              `http://${SERVER_IP}:${PORT}/status/${route.params.keys}`,
              formData
            )
              .then((response) => {
                showStatusList();
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        />
      );
    }
  }

  function renderIcoLove() {
    let have = statusList.filter(
      (array) =>
        array.social_id == route.params.keys &&
        array.member_id == info.s_id &&
        array.status_type == "love"
    );
    if (have.length > 0) {
      // delete
      return (
        <IconButton
          icon={<Icon as={AntDesign} name="heart" />}
          borderRadius="full"
          _icon={{
            color: "danger.400",
            size: "sm",
          }}
          onPress={() => {
            Axios.delete(
              `http://${SERVER_IP}:${PORT}/status/${route.params.keys}/${info.s_id}`
            )
              .then((response) => {
                showStatusList();
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        />
      );
    } else {
      // add
      return (
        <IconButton
          icon={<Icon as={AntDesign} name="hearto" />}
          borderRadius="full"
          _icon={{
            color: "gray.400",
            size: "sm",
          }}
          onPress={() => {
            let formData = {
              type: "love",
              sid: info.s_id,
            };
            Axios.post(
              `http://${SERVER_IP}:${PORT}/status/${route.params.keys}`,
              formData
            )
              .then((response) => {
                showStatusList();
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        />
      );
    }
  }

  if(!fontsLoaded){
    return(<NativeBaseProvider ><Text></Text></NativeBaseProvider>)
    
  }
  else{

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Center flex={1}>
          {thisSocical.social_id != undefined ? (
            <Card
              thisSocical={thisSocical}
              date={new Date(thisSocical.social_timestamp)}
              statusList={statusList}
            />
          ) : (
            <Text></Text>
          )}
          <Box p="5" w="100%" mx="auto">
            <Stack space={5}>
              <HStack justifyContent="center">
                <HStack alignItems="center" w="20%">
                  {renderIcoLike()}
                  {renderLike()}
                </HStack>
                <HStack alignItems="center" w="20%">
                  {renderIcoLove()}
                  {renderLove()}
                </HStack>
              </HStack>
            </Stack>
          </Box>

          <Box>
            <HStack justifyContent="center" space={2}>
              <Input
              style={{ fontFamily: 'Kanit_400Regular'}}
                placeholder="เพิ่มความคิดเห็น"
                w={{
                  base: "85%",
                }}
                value={comment}
                onChangeText={(text) => setComment(text)}
              />
              
              <Button
              
                size="lg"
                colorScheme="indigo"
                onPress={() => {

                  if(validate({
                    comment: { required: true },
                    
    
                  })){
                    let formData = {
                    detail: comment,
                    sid: info.s_id,
                  };
                  Axios.post(
                    `http://${SERVER_IP}:${PORT}/comment/${route.params.keys}`,
                    formData
                  )
                    .then((response) => {
                      showCommentList();
                      setComment("");
                    })
                    .catch((error) => {
                      console.log(error);
                    });




                  }else{
                    return(false)

                  }


                  
                }}
              >
                <Text style={{ fontFamily: 'Kanit_400Regular', color:"white"}}>ส่ง</Text>
                
              </Button>
            </HStack>
            {isFieldInError('comment') ? (<Text margin="3" style={{ color: 'red', fontFamily: 'Kanit_400Regular' }}>โปรดใส่ข้อความ</Text>) : (<Text></Text>)}
          </Box>
          {commentList.length != 0 ? (
            commentList.map((item, index) => {
              function renderDate() {
                let date = new Date(item.comment_timestamp);
                return (
                  <Text textAlign="right" fontSize="12" style={{ fontFamily: 'Kanit_400Regular'}}>
                    {date.getFullYear() +
                      "-" +
                      (date.getMonth() + 1) +
                      "-" +
                      date.getDate()}{" "}
                    {date.getHours()}:{date.getMinutes()}
                  </Text>
                );
              }
              function renderUser() {
                if (userList.length != 0) {
                  let user = userList.filter(
                    (array) => array.member_id == item.member_id
                  );
                  return (
                    <Text fontSize="12" marginBottom="1" style={{ fontFamily: 'Kanit_400Regular'}}>
                      {user[0].member_fname} {user[0].member_lname}
                    </Text>
                  );
                } else {
                  return <Text></Text>;
                }
              }
              return (
                <Box key={index}>
                  <VStack
                  style={{ fontFamily: 'Kanit_400Regular'}}
                    marginTop="5"
                    width={350}
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.200"
                    borderWidth="1"
                    backgroundColor="dark.800"
                    padding="3"
                  >
                    {renderUser()}
                    <Text fontSize="14" style={{ fontFamily: 'Kanit_400Regular'}}>{item.comment_detail}</Text>
                    {renderDate()}
                    {info.s_level == "teacher" && info.s_level != undefined ? (
                      <Box style={{ alignItems: "flex-end" }}>
                        <Button
                          colorScheme="danger"
                          width="20%"
                          size="sm"
                          m={3}
                          onPress={() => {
                            Axios.delete(
                              `http://${SERVER_IP}:${PORT}/comment/${item.comment_id}`
                            )
                              .then((response) => {
                                showCommentList();
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                        >
                          <Text style={{ fontFamily: 'Kanit_400Regular', color:"white"}}>ลบ</Text>
                          
                        </Button>
                      </Box>
                    ) : (
                      <Text></Text>
                    )}
                  </VStack>
                </Box>
              );
            })
          ) : (
            <Text></Text>
          )}
          <Box my={5}></Box>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );}
}

export default Home_Screen_Comment;
