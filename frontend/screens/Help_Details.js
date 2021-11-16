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

const Detail_Help = () => {
    return (
        <Box marginTop={50} p="5" py="15" w="100%" mx="auto">
            <Heading padding={3} Size= {18} ml="-3" color="indigo.600">ขอความช่วยเหลือ</Heading>
            <Stack p="4" space={5} borderRadius="6" borderWidth="0.25">
                <Stack space={2}>
                    <Heading Size= {18} color="tertiary.600" ml="-2">กวาดดาดฟ้า</Heading>
                    <Text fontSize= {18} color="violet.500" ml="-2" mt="-1">
                        นางสาว มณี
                    </Text>
                </Stack>
                <Text fontSize= {15} ml="-2">
                    หาคนช่วยแม่บ้านที่ตึกมหานครทำความชั้นดาดฟ้า เพราะตอนนี้ไม่ไหวแน้ววว
                </Text>
                <Text textAlign="right" padding={1} fontSize= {11} color="coolGray.600">ประกาศเมื่อวันที่ 15/08/2564 เวลา 15:35</Text>
                <Stack justifyContent="center" space={5}>
                    <Badge colorScheme="success" alignSelf="center" variant={"outline"}>
                        สถาณะ : เปิด
                    </Badge>
                    <Button size="lg" colorScheme="indigo">เข้าร่วม</Button>
                </Stack>
            </Stack>
            <Divider my="2" />
            <Stack space={2}>
                <Text mx="auto" fontSize={20} color="tertiary.500">จำนวนคนที่เข้ารวม 1</Text>
                <Divider my="1" />
                <Text mx="auto" fontSize={14} color="info.700">วรเมธ สาริกาเกตุ</Text>
            </Stack>
            <Divider my="35"/>
            <Button w={{base: "50%"}} 
                            size="lg" 
                            alignSelf="center" 
                            colorScheme="danger"
                            leftIcon={<Icon as={MaterialIcons } name="logout" size="sm" />}
                            onPress={() => { navigation.navigate("Login"); }}
                        >ยกเลิกการเข้าร่วม
            </Button>
        </Box>
  );
}

function Help_Detail_Screen() {
    return(
        <NativeBaseProvider>
            <ScrollView>
                <Center flex={1} px="2">
                    <Detail_Help/>
                </Center>
            </ScrollView>
        </NativeBaseProvider>
    );
}

export default Help_Detail_Screen;