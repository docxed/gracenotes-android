import React from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
} from "native-base";
import Post_Activity from "../components/Activitylist";

function Activity_Screen({ navigation }) {
  return (
    <NativeBaseProvider>
      <Heading marginTop={45} textAlign="center" size="lg" fontWeight="600" color="indigo.500">กิจกรรมทั้งหมด</Heading>
      <Center flex={2} px="3">
        <Post_Activity navigation={navigation}/>
      </Center>
    </NativeBaseProvider>
  );
};

export default Activity_Screen;