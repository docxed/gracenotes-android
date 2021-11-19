import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
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

const Card = (props) => {
  const [caption, setCaption] = useState("");
  function renderDate() {
    let date = new Date(props.thisSocial.social_timestamp);
    return (
      <Text textAlign="right" padding={1} fontSize={11} color="coolGray.600">
        โพสต์เมื่อ{" "}
        {date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate()}{" "}
        เวลา {date.getHours() + ":" + date.getMinutes()}
      </Text>
    );
  }
  useEffect(() => {
    setCaption(props.thisSocial.social_detail);
  }, []);
  return (
    <Box p="5" py="15" w="100%" mx="auto">
      <Heading
        mt="10"
        textAlign="center"
        size="lg"
        fontWeight="600"
        color="indigo.500"
        mb={5}
      >
        หมายเลขบันทึก {props.thisSocial.social_id}
      </Heading>
      <AspectRatio w="100%" ratio={16 / 9}>
        <Image
          source={{
            uri: props.thisSocial.social_img,
          }}
          alt="image"
        />
      </AspectRatio>
      <Stack p="4" space={5}>
        {renderDate()}
        <TextArea
          value={caption}
          onChangeText={(text) => setCaption(text)}
          h={20}
          placeholder="เขียนโพสต์"
          w={{
            base: "100%",
            md: "25%",
          }}
        />
      </Stack>
      <Divider my="8" w="100%" />
      <HStack mx="auto" space={3}>
        <Button
          w={{ base: "30%" }}
          size="lg"
          colorScheme="indigo"
          onPress={() => {
            let formData = {
              detail: caption,
            };
            Axios.put(
              `http://${SERVER_IP}:${PORT}/socialadmin/${props.thisSocial.social_id}`,
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
          อัพเดต
        </Button>
        <Button
          w={{ base: "20%" }}
          size="lg"
          colorScheme="error"
          onPress={() => {
            Axios.delete(
              `http://${SERVER_IP}:${PORT}/socialadmin/${props.thisSocial.social_id}`
            )
              .then((response) => {
                let data = response.data;
                Alert.alert(data);
                // navigation.navigate(""); HERE TO ADD NAVIGATE
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          ลบ
        </Button>
      </HStack>
    </Box>
  );
};

function Admin_edit_Post({ navigation, route }) {
  const [info, setInfo] = useState({}); // LocalStorage Data
  const [thisSocial, setThisSocial] = useState({});

  async function showSocial() {
    await Axios.get(
      `http://${SERVER_IP}:${PORT}/socialadmin/${route.params.keys}`
    )
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
    showSocial();
  }, [info]);

  useEffect(() => {
    // useState is Asynchronous!!!, Thus you need to Hook for getValue on created info(LocalStorage)
    innerFunction();
  }, [innerFunction]);

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Center>
          {thisSocial.social_id != undefined ? (
            <Card navigation={navigation} thisSocial={thisSocial} />
          ) : (
            <Box></Box>
          )}
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default Admin_edit_Post;
