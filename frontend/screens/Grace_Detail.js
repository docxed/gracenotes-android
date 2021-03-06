import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, StackActions } from "@react-navigation/native";
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
  Spinner,
} from "native-base";
import { Alert } from "react-native";
import { useFonts, Kanit_500Medium, Kanit_400Regular } from '@expo-google-fonts/kanit';

function Grace_Detail_Screen({ navigation, route }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [me, setMe] = useState({}); // My Member Data query From info(LocalStorage)
  const [thisGrace, setThisGrace] = useState({}); // This Grace
  const [user, setUser] = useState({}); // User of This Grace

  const popAction = StackActions.pop(1);

  let [fontsLoaded] = useFonts({
    Kanit_500Medium, Kanit_400Regular
  });

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

  const innerFunction = useCallback(() => {
    showMe();
    showThisGrace();
  }, [info]);

  useEffect(() => {
    // useState is Asynchronous!!!, Thus you need to Hook for getValue on created info(LocalStorage)
    innerFunction();
  }, [innerFunction]);

  function renderStatusCheck() {
    if (thisGrace.grace_check == "????????????") {
      return (
        <Badge colorScheme="success" _text={{ fontFamily: 'Kanit_400Regular'}} alignSelf="flex-end" variant={"outline"}>
          ??????????????????????????????
        </Badge>
      );
    } else if (thisGrace.grace_check == "?????????????????????") {
      return (
        <Badge colorScheme="warning" _text={{ fontFamily: 'Kanit_400Regular'}} alignSelf="flex-end" variant={"outline"}>
          ???????????????????????????
        </Badge>
      );
    } else {
      return (
        <Badge colorScheme="light" _text={{ fontFamily: 'Kanit_400Regular'}} alignSelf="flex-end" variant={"outline"}>
          ?????????????????????????????????
        </Badge>
      );
    }
  }

  function renDerdelButton() {

    
                    


    if (thisGrace.member_id == info.s_id) {
      return (
        <Button.Group
          colorScheme="danger"
          mx={{
            base: "auto",
            md: 0,
          }}
          size="md"
          mb={10}
        >
          <Button
          _text={{ fontFamily: 'Kanit_400Regular'}}
            onPress={() => {
              // Delete This Grace
              Axios.delete(
                `http://${SERVER_IP}:${PORT}/grace/${route.params.keys}`
              )
                .then((response) => {
                  let data = response.data;
                  Alert.alert(data);
                  navigation.dispatch(popAction);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            ????????????????????????
          </Button>
        </Button.Group>
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
        <Center flex={1} px="2">
          <Box marginTop={50} p="5" py="15" w="100%" mx="auto">
            <Stack p="4" space={5} borderRadius="6" borderWidth="0.25">
              <Stack space={2}>
                <Text style={{ fontFamily: 'Kanit_400Regular'}} padding={3} Size={18} ml="-3">
                <Heading  color="indigo.600">
                  ????????????????????????????????????
                </Heading></Text>
                <Box style={{ alignItems: "center" }} my={5}>
                  {thisGrace.grace_img != undefined ? (
                    <Image
                      source={{
                        uri: thisGrace.grace_img,
                      }}
                      alt="Alternate Text"
                      size="2xl"
                    />
                  ) : (
                    <Spinner size="lg" />
                  )}
                </Box>
                {renderStatusCheck()}
                <Text textAlign="right" fontSize={11} color="coolGray.600" style={{ fontFamily: 'Kanit_400Regular'}}>
                  ?????????????????????????????????{" "}
                  {thisGrace.grace_date != undefined
                    ? thisGrace.grace_date.substr(0, 10)
                    : ""}{" "}
                  ???????????????????????? {thisGrace.grace_time} ?????????????????????
                </Text>
                <Text textAlign="right" fontSize={11} color="coolGray.600" style={{ fontFamily: 'Kanit_400Regular'}}>
                  ????????? {thisGrace.grace_agency}
                </Text>
              </Stack>
              <Text fontSize={15} ml="-2" style={{ fontFamily: 'Kanit_400Regular'}}>
                {thisGrace.grace_detail}
              </Text>
              <Text
              style={{ fontFamily: 'Kanit_400Regular'}}
                textAlign="right"
                fontSize={16}
                color="violet.500"
                ml="-2"
                mt="-1"
              >
                ????????? {user.member_fname} {user.member_lname}
              </Text>
            </Stack>
          </Box>
          {renDerdelButton()}
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );}
}

export default Grace_Detail_Screen;
