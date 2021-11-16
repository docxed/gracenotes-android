import * as React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
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

// const img = require('../assets/logo.png');

function Login_Screen({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [info, setInfo] = useState({});

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

  return (
    <NativeBaseProvider>
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
          padding={3}
          textAlign="center"
          size="lg"
          fontWeight="600"
          color="indigo.400"
        >
          GraceNotes
        </Heading>
        <Heading
          textAlign="center"
          mt="1"
          color="gray.500"
          fontWeight="500"
          size="md"
        >
          ลงชื่อเข้าใช้
        </Heading>
        <VStack space={4} mt="5" borderRadius={5} padding={15} shadow={4}>
          <FormControl>
            <FormControl.Label
              _text={{
                color: "coolGray.800",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              รหัสนักเรียน
            </FormControl.Label>
            <Input
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
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: "coolGray.800",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              รหัสผ่าน
            </FormControl.Label>
            <Input
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
          </FormControl>
          <Button
            mt="2"
            color="primary.300"
            _text={{ color: "white" }}
            onPress={() => {
              const formData = {
                user: user,
                pass: pass,
              };
              Axios.post(`http://10.0.2.2:5001/login`, formData)
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
            }}
          >
            ลงชื่อเข้าใช้
          </Button>
          <HStack mt="6" justifyContent="center">
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: 15,
              }}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              ลงทะเบียนเข้าใช้งาน
            </Link>
          </HStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

export default Login_Screen;
