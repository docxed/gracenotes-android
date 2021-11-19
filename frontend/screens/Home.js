import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  Button,
  NativeBaseProvider,
  Pressable,
  ScrollView,
} from "native-base";

const Card = (props) => {

  return (
    <Box
      maxW="80"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "gray.50",
      }}
    >
      <Pressable />
      <Box>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image
            source={{
              uri: props.item.social_img,
            }}
            alt="image"
          />
        </AspectRatio>
        <Center bg="success.500" position="absolute" bottom="0" px="3" py="1.5">
          ตรวจแล้ว
        </Center>
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
        </Stack>
        <Text isTruncated fontWeight="400">
          {props.item.social_detail}
        </Text>
        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
          </HStack>
        </HStack>
      </Stack>
    </Box>
  );
};

function Home_Screen({ navigation }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [socialList, setSocialList] = useState([]);

  async function showSocial() {
    await Axios.get(`http://${SERVER_IP}:${PORT}/social`)
      .then((response) => {
        let data = response.data;
        data.reverse()
        setSocialList(data);
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
    showSocial();
  }, [info]);

  useEffect(() => {
    // useState is Asynchronous!!!, Thus you need to Hook for getValue on created info(LocalStorage)
    innerFunction();
  }, [innerFunction]);

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Heading
          marginTop={45}
          textAlign="center"
          size="lg"
          fontWeight="600"
          color="indigo.500"
        >
          ความดีล่าสุด
        </Heading>
        {socialList.length != 0 ? (
          <Center flex={2} px="3">
            {socialList.map((item, index) => {
              return (
                <Box key={index} my={3}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Home_Second", {keys: item.social_id});
                    }}
                  >
                    <Card item={item} />
                  </Pressable>
                </Box>
              );
            })}
          </Center>
        ) : (
          <Text></Text>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default Home_Screen;
