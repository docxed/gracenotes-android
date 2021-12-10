import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, StackActions } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  Box,
  Heading,
  AspectRatio,
  Divider,
  Image,
  Text,
  Center,
  CheckIcon,
  Stack,
  Select,
  ScrollView,
  FormControl,
  NativeBaseProvider,
  Button,
  HStack,
  Spacer,
} from "native-base";
import { Alert } from "react-native";
import { useFonts, Kanit_500Medium, Kanit_400Regular } from '@expo-google-fonts/kanit';

const Card = (props) => {
  const [check, setCheck] = useState("");


  useEffect(() => {
    setCheck(props.thisGrace.grace_check);
  }, []);

  return (
    <Box p="5" py="15" w="100%" mx="auto">
      <Heading
      style={{ fontFamily: 'Kanit_400Regular'}}
        mt="10"
        textAlign="center"
        size="lg"
        fontWeight="600"
        color="indigo.500"
      >
        หมายเลขบันทึก {props.thisGrace.grace_id}
      </Heading>
      <AspectRatio w="100%" ratio={16 / 9} mt={5}>
        <Image
          source={{
            uri: props.thisGrace.grace_img,
          }}
          alt="image"
        />
      </AspectRatio>
      <Stack p="4" space={5}>
        <Stack space={2}>
          <Text fontSize={20} color="violet.500" ml="-3" mt="-1" style={{ fontFamily: 'Kanit_400Regular', paddingTop:5}}>
            {props.thisGrace.member_fname} {props.thisGrace.member_lname}
          </Text>
        </Stack>
        <Text textAlign="left" ml="-3" fontSize={11} color="coolGray.600" style={{ fontFamily: 'Kanit_400Regular'}}>
          {props.thisGrace.grace_agency}
        </Text>
        <Text fontSize={15} style={{ fontFamily: 'Kanit_400Regular'}}>{props.thisGrace.grace_detail}</Text>
        <Text textAlign="right" fontSize={11} color="coolGray.600" style={{ fontFamily: 'Kanit_400Regular'}}>
          เมื่อวันที่{" "}
          {props.date.getFullYear() +
            "-" +
            (props.date.getMonth() + 1) +
            "-" +
            props.date.getDate()}{" "}
          เป็นเวลา {props.thisGrace.grace_time} ชั่วโมง
        </Text>
        <Text textAlign="center" fontSize={11} color="coolGray.600" style={{ fontFamily: 'Kanit_400Regular'}}>
          บันทึกเมื่อ{" "}
          {props.stamp.getFullYear() +
            "-" +
            (props.stamp.getMonth() + 1) +
            "-" +
            props.stamp.getDate()}{" "}
          {props.stamp.getHours()}:{props.stamp.getMinutes()}:
          {props.stamp.getSeconds()}
        </Text>
        <Select
        style={{ fontFamily: 'Kanit_400Regular'}}
          selectedValue={check}
          onValueChange={(text) => setCheck(text)}
          minWidth="100"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
        >
          <Select.Item _text={{ fontFamily: 'Kanit_400Regular'}} label="ผ่าน" value="ผ่าน" />
          <Select.Item _text={{ fontFamily: 'Kanit_400Regular'}} label="ไม่ผ่าน" value="ไม่ผ่าน" />
          <Select.Item _text={{ fontFamily: 'Kanit_400Regular'}} label="รอการตรวจ" value="รอการอนุมัติ" />
        </Select>
        <Button
        _text={{ fontFamily: 'Kanit_400Regular'}}
          mx="auto"
          w={{ base: "20%" }}
          size="md"
          colorScheme="info"
          onPress={() => {
            let formData = {
              check: check,
            };
            Axios.put(
              `http://${SERVER_IP}:${PORT}/graceadmin/${props.thisGrace.grace_id}`,
              formData
            )
              .then((response) => {
                let data = response.data;
                Alert.alert(data);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          อัปเดต
        </Button>
      </Stack>
      <Divider my="8" w="100%" />
      <HStack mx="auto" space={3}>
        <Button
        _text={{ fontFamily: 'Kanit_400Regular'}}
          w={{ base: "30%" }}
          size="lg"
          colorScheme="indigo"
          onPress={() => {
            props.navigation.navigate("Check_Post", {keys: props.thisGrace.grace_id});
          }}
        >
          เผยแพร่
        </Button>
        <Button _text={{ fontFamily: 'Kanit_400Regular'}} w={{ base: "15%" }} size="lg" colorScheme="error" onPress={() => {
            Axios.delete(`http://${SERVER_IP}:${PORT}/graceadmin/${props.thisGrace.grace_id}`)
                .then((response) => {
                  let data = response.data;
                  Alert.alert(data);
                  const popAction = StackActions.pop(1);
                    props.navigation.dispatch(popAction);
                  // navigation.navigate(""); HERE TO ADD NAVIGATE
                })
                .catch((error) => {
                  console.log(error);
                });
        }}>
          ลบ
        </Button>
      </HStack>
    </Box>
  );
};

function Admin_Check_Detail_Screen({ navigation, route }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [thisGrace, setThisGrace] = useState({});
  let [fontsLoaded] = useFonts({
    Kanit_500Medium, Kanit_400Regular
  });

  async function showThisGrace() {
    await Axios.get(
      `http://${SERVER_IP}:${PORT}/graceadmin/${route.params.keys}`
    )
      .then((response) => {
        let data = response.data;
        setThisGrace(data);
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
    showThisGrace();
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
        <Center>
          {thisGrace.grace_id != undefined ? (
            <Card
              navigation={navigation}
              thisGrace={thisGrace}
              date={new Date(thisGrace.grace_date)}
              stamp={new Date(thisGrace.grace_timestamp)}
            />
          ) : (
            <Box></Box>
          )}
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );}
}

export default Admin_Check_Detail_Screen;
