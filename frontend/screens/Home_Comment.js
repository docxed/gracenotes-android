import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Icon,
  IconButton,
  Text,
  Center,
  HStack,
  Input,
  Stack,
  ScrollView,
  FormControl,
  NativeBaseProvider,
  Button,
} from "native-base";

const Card = () => {
  return (
    <Box marginTop={50} p="5" py="15" w="100%" mx="auto">
        <Heading padding={3} Size= {18} ml="-3" color="indigo.600">กวาดดาดฟ้า มหานคร</Heading>
        <Text textAlign="right" padding={1} fontSize= {11} color="coolGray.600">วันที่ 30/07/2564  เวลา 14:35</Text>
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
                    นาย สมชาย มากมี
                </Text>
            </Stack>
            <Text fontSize= {15} ml="-3">
                ได้ช่วยแม่บ้านที่ตึกมหานครทำความชั้นดาดฟ้า
            </Text>
            <HStack justifyContent="center">
                <HStack alignItems="center" w="20%">
                    <IconButton
                        icon={<Icon as={AntDesign} name="like2" />}
                        borderRadius="full"
                        _icon={{
                            color: "gray.400",
                            size: "sm",
                        }}
                    />
                    <Text color="gray.400">0</Text>
                </HStack>
                <HStack alignItems="center" w="20%">
                    <IconButton
                        icon={<Icon as={AntDesign} name="hearto" />}
                        borderRadius="full"
                        _icon={{
                            color: "gray.400",
                                size: "sm",
                        }}
                    />
                    <Text color="gray.400">0</Text>
                </HStack>
            </HStack>
            
        </Stack>
        <HStack justifyContent="center" space={2}>
                <Input placeholder="เพิ่มความคิดเห็น"
                    w={{
                        base: "85%",
                    }}
                />
                <Button size="lg" colorScheme="indigo">ส่ง</Button>
        </HStack>
    </Box>
  );
}

function Home_Screen_Comment() {
  return (
    <NativeBaseProvider>
        <ScrollView>
            <Center flex={1} px="2">
                <Card />
            </Center>
        </ScrollView>
    </NativeBaseProvider>
  );
}


export default Home_Screen_Comment;