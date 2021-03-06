import * as React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import * as Font from 'expo-font'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_IP, PORT } from "../database/serverIP";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useValidation } from 'react-native-form-validator';

import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Icon,
  IconButton,
  Link,
  Button,
  HStack,
  Center,
} from "native-base";
import { Image, Alert } from "react-native";
import { useFonts, Kanit_500Medium, Kanit_400Regular } from '@expo-google-fonts/kanit';

// const img = require('../assets/logo.png');

function Login_Screen({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [info, setInfo] = useState({});

  let [fontsLoaded] = useFonts({
    Kanit_500Medium, Kanit_400Regular
  });



  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { user, pass },
    });

  



  async function _retrieveData() {
    try {
      const value = await AsyncStorage.getItem("info"); // Get member's info from LocalStorage
      if (value != null) {
        // LocalStorage has Data
        // Authorized
        navigation.navigate("Home_page");
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

  if(!fontsLoaded){
    return(<NativeBaseProvider ><Text></Text></NativeBaseProvider>)
    
  }
  else{

  return (
    <NativeBaseProvider >
      <Box safeArea flex={1} p="3" py="10" w="90%" mx="auto">
        <Center>
          <Image
            size={100}
            resizeMode={"contain"}
            borderRadius={30}
            source={{
              uri: "https://wallpaperaccess.com/full/317501.jpg",
            }}
            alt="Alternate Text"
          />
        </Center>
        <Heading
        style={{ fontFamily: 'Kanit_400Regular'}}
          padding={3}
          textAlign="center"
          size="lg"
          fontWeight="600"
          color="indigo.400"
        >
          GraceNotes
        </Heading>
        <Heading
        style={{ fontFamily: 'Kanit_400Regular', fontSize: 18 }}
          textAlign="center"
          mt="1"
          color="gray.500"
          fontWeight="500"
          size="md"
        >
          ???????????????????????????????????????
        </Heading>
        <VStack space={4} mt="5" padding={15}>
          <FormControl>
            <FormControl.Label
              _text={{
                fontFamily: 'Kanit_500Medium',
                color: "coolGray.800",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              ????????????????????????????????????
            </FormControl.Label>
            <Input
            style={{fontFamily: 'Kanit_400Regular'}}
            
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              value={user}
              onChangeText={(text) => setUser(text)}
            />
            {isFieldInError('user') ? (<Text  style={{ color: 'red', fontFamily: 'Kanit_400Regular' }}>???????????????????????????????????????????????????????????????????????????????????????</Text>) : (<Text></Text>)}
            
        
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                fontFamily: 'Kanit_500Medium',
                color: "coolGray.800",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              ????????????????????????
            </FormControl.Label>
            <Input
            style={{fontFamily: 'Kanit_400Regular'}}
            secureTextEntry={true}
              type="password"
              InputLeftElement={
                <Icon
                  as={<AntDesign name="lock" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              value={pass}
              onChangeText={(text) => setPass(text)}
            />
            {isFieldInError('pass') ? (<Text  style={{ color: 'red', fontFamily: 'Kanit_400Regular' }}>???????????????????????????????????????????????????????????????????????????</Text>) : (<Text></Text>)}
          </FormControl>
          <Button
            mt="2"
            color="primary.300"
            _text={{fontFamily: 'Kanit_500Medium', color: "white", fontSize: 15 }}
            onPress={() => {
              if(validate({
                user: {maxlength: 100, required: true },
                pass: {maxlength: 100, required: true}

              })){

                const formData = {
                  user: user,
                  pass: pass,
                };
                Axios.post(`http://${SERVER_IP}:${PORT}/login`, formData)
                  .then((response) => {
                    const data = response.data;
                    if (data.status) {
                      // Login Success
                      let info = {
                        // Create obj prepare to save in LocalStorage
                        s_id: data.ses_id, // id of member '1, 2, 3, 4'
                        s_user: data.ses_user, // student's code of member '06437'
                        s_level: data.ses_level, // role of member 'student or teacher'
                      };
                      let myJSON = JSON.stringify(info); // parsing JSON
                      async function _storeData() {
                        try {
                          await AsyncStorage.setItem("info", myJSON);
                        } catch (error) {
                          console.log(error);
                        }
                      }
                      _storeData(); // Saving obj of member's info to LocalStorage
                      setUser("");
                      setPass("");
                      navigation.navigate("Home_page");
                    } else {
                      // Login Fail But Nothing Error
                      Alert.alert(data.message);
                      setPass("");
                    }
                  })
                  .catch((error) => {
                    console.log(error); // Error
                  });

                

              }
              else{
                return (false)
              }

              


              
            }}
          >
            ???????????????????????????????????????
          </Button>
          <HStack mt="6" justifyContent="center">
            <Link
              _text={{
                fontFamily: 'Kanit_500Medium',
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: 15,
              }}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              ?????????????????????????????????????????????????????????
            </Link>
          </HStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );}

}

export default Login_Screen;
