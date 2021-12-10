import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, StackActions } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useValidation } from 'react-native-form-validator';
import {
  Box,
  Heading,
  AspectRatio,
  Divider,
  Image,
  Text,
  TextArea,
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
  const [caption, setCaption] = useState("");

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { caption },
    });


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
            โดย {props.thisGrace.member_fname} {props.thisGrace.member_lname}
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
        <TextArea
        style={{ fontFamily: 'Kanit_400Regular'}}
          value={caption}
          onChangeText={(text) => setCaption(text)}
          h={20}
          placeholder="เขียนโพสต์"
          w={{
            base: "100%",
            md: "25%",
          }}
        />
        {isFieldInError('caption') ? (<Text  style={{ color: 'red', fontFamily: 'Kanit_400Regular' }}>โปรดใส่รายละเอียดโพสต์</Text>) : (<Text></Text>)}
      </Stack>
      <Divider my="8" w="100%" />
      <HStack mx="auto" space={3}>
        <Button
        _text={{ fontFamily: 'Kanit_400Regular'}}
          w={{ base: "30%" }}
          size="lg"
          colorScheme="indigo"
          onPress={() => {


            if(validate({
              caption: { required: true},
              
            })){
              let formData = {
              detail: caption,
              img: props.thisGrace.grace_img,
              sid: props.info.s_id,
            };
            Axios.post(`http://${SERVER_IP}:${PORT}/social`, formData)
              .then((response) => {
                let data = response.data;
                Alert.alert(data);
                setCaption("");
                props.navigation.navigate("Home");
                // props.navigation.navigate("Post_On"); HERE TO ADD NAVIGATE
              })
              .catch((error) => {
                console.log(error);
              });



            }else{
              return false
            }

            
          }}
        >
          เผยแพร่
        </Button>
      </HStack>
    </Box>
  );
};

function Admin_Post_notes({ navigation, route }) {
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
              info={info}
            />
          ) : (
            <Box></Box>
          )}
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );}
}

export default Admin_Post_notes;
