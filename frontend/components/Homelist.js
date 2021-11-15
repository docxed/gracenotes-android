import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign} from '@expo/vector-icons';
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  IconButton,
  Icon,
  Text,
  Center,
  ScrollView,
  HStack,
  Stack,
  NativeBaseProvider,
  VStack,
} from "native-base";

const Card = (props) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => { props.navigation.navigate("Home_Second")}}
            >
            <Box
                maxW="80"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                backgroundColor= "gray.50"
            >
                <Box>
                    <AspectRatio w="100%" ratio={16 / 9}>
                    <Image
                        source={{
                        uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                        }}
                        alt="image"
                    />
                    </AspectRatio>
                    <Center
                    bg="success.500"
                    position="absolute"
                    bottom="5"
                    px="5"
                    py="1.5"
                    >
                    ตรวจแล้ว
                    </Center>
                </Box>
                <Stack p="4" space={3}>
                    <Stack space={2}>
                    <Heading size="md" ml="-1">
                        กวาดดาดฟ้า มหานคร
                    </Heading>
                    <Text
                        fontSize= {14}
                        _light={{
                        color: "violet.500",
                        }}
                        _dark={{
                        color: "violet.400",
                        }}
                        fontWeight="500"
                        ml="-0.5"
                        mt="-1"
                    >
                        นาย สมชาย มากมี
                    </Text>
                    </Stack>
                    <Text fontSize= {15}>
                        ได้ช่วยแม่บ้านที่ตึกมหานครทำความชั้นดาดฟ้า
                    </Text>
                    <HStack>
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
            </Box>  
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
      padding: 15,
      alignItems: "center",
    },
});

export default Card;