import React from "react";
import { MaterialIcons } from '@expo/vector-icons';
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
  } from "native-base";

const Detail_Grace = () => {
    return (
        <Box marginTop={50} p="5" py="15" w="100%" mx="auto">
            <Heading padding={3} Size= {18} ml="-3" color="indigo.600">บันทึกความดี</Heading>
            <Stack p="4" space={5} borderRadius="6" borderWidth="0.25">
                <Stack space={2}>
                    <Heading Size= {18} color="tertiary.600" ml="-2">กวาดดาดฟ้า</Heading>
                    <Badge colorScheme="success" alignSelf="flex-end" variant={"outline"}> รับรองแล้ว </Badge>
                    <Text textAlign="right" padding={1} fontSize= {11} color="coolGray.600">เมื่อวันที่ 15/08/2564 เวลา 15:35</Text>
                </Stack>
                <Text fontSize= {15} ml="-2">
                    ช่วยแม่บ้านที่ตึกมหานครทำความชั้นดาดฟ้า
                </Text>
                <Text textAlign="right" fontSize= {16} color="violet.500" ml="-2" mt="-1">โดย นางสาว มณี </Text>
            </Stack>
        </Box>
  );
}

function Grace_Detail_Screen() {
    return(
        <NativeBaseProvider>
            <ScrollView>
                <Center flex={1} px="2">
                    <Detail_Grace/>
                </Center>
            </ScrollView>
        </NativeBaseProvider>
    );
}

export default Grace_Detail_Screen;