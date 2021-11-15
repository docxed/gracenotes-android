import React from "react";
import { AntDesign } from '@expo/vector-icons';
import {
    Box,
    Badge,
    Heading,
    AspectRatio,
    Image,
    Divider,
    Text,
    Center,
    HStack,
    VStack,
    Input,
    Stack,
    ScrollView,
    NativeBaseProvider,
    Button,
  } from "native-base";

const Detail_Activity = () => {
    return (
        <Box marginTop={50} p="5" py="15" w="100%" mx="auto">
            <Heading padding={3} Size= {18} ml="-3" color="indigo.600">กิจกรรม : กวาดดาดฟ้า </Heading>
            <Text textAlign="right" padding={1} fontSize= {11} color="coolGray.600">วันที่ 15/08/2564 เวลา 15:35</Text>
            <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                    source={{
                    uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                    }}
                    alt="image"
                />
            </AspectRatio>
            <Stack p="4" space={5}>
                <Stack space={2}>
                    <Text fontSize= {20} color="violet.500"
                        ml="-3"
                        mt="-1"
                    >
                        นางสาว มณี
                    </Text>
                </Stack>
                <Text fontSize= {15} ml="-3">
                    หาคนช่วยแม่บ้านที่ตึกมหานครทำความชั้นดาดฟ้า เพราะตอนนี้ไม่ไหวแน้ววว
                </Text>
                <Stack justifyContent="center" space={5}>
                    <Badge colorScheme="success" alignSelf="center" variant={"outline"}>
                        สถาณะกิจกรรม : เปิด
                    </Badge>
                    <Button size="lg" colorScheme="indigo">เข้าร่วม</Button>
                </Stack>
            </Stack>
            <Divider my="2" />
            <Stack space={2}>
                <Text mx="auto" fontSize={20} color="tertiary.500">จำนวนคนที่เข้ารวม 0</Text>
                <Divider my="1" />
                <Text mx="auto" fontSize={14} color="info.700">วรเมธ สาริกาเกตุ</Text>
            </Stack>
            
        </Box>
  );
}

function Activity_Detail_Screen() {
    return(
        <NativeBaseProvider>
            <ScrollView>
                <Center flex={1} px="2">
                    <Detail_Activity/>
                </Center>
            </ScrollView>
        </NativeBaseProvider>
    );
}

export default Activity_Detail_Screen;