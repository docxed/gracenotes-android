import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Box,
  Divider,
  Heading,
  Avatar,
  HStack,
  VStack,
  Icon,
  Text,
  Button,
  Center,
  NativeBaseProvider,
} from "native-base"

function Menu_Screen({ navigation }) {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Box alignItems="center" w="90%" mx="auto">
                    <Heading fontSize="xl" p="4" pb="3" color="indigo.500">โปรไฟล์</Heading>
                    <Avatar
                        size="150"
                        source={{
                        uri: "https://wallpaperaccess.com/full/317501.jpg",
                        }}
                    />
                    <Button my="15" onPress={() => { navigation.navigate("editProfile"); }}>แก้ไข้โปรไฟล์ส่วนตัว</Button>
                    <Divider my="2" />
                    <VStack space={2}>
                        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("MyGrace")}}>
                            <Box>
                                <HStack space={3}>
                                    <Icon color="success.400" as={MaterialCommunityIcons} name="note-multiple"/>
                                    <Text color="success.400" fontSize={20}>บันทึกความดีของฉัน</Text>
                                </HStack>
                            </Box>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("PostHelp")}}>
                            <Box>
                                <HStack space={3}>
                                    <Icon color="warning.400" as={MaterialIcons} name="post-add"/>
                                    <Text color="warning.400" fontSize={20}>โพสต์ขอความช่วยเหลือ</Text>
                                </HStack>
                            </Box>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Box>
                                <HStack space={3}>
                                    <Icon color="rose.500" as={MaterialIcons} name="admin-panel-settings"/>
                                    <Text color="rose.500" fontSize={20}>Admin Panel</Text>
                                </HStack>
                            </Box>
                        </TouchableOpacity>
                    </VStack>
                    <Divider my="35"/>
                    <Button w={{base: "40%"}} 
                            size="lg" 
                            alignSelf="center" 
                            colorScheme="danger"
                            leftIcon={<Icon as={MaterialIcons } name="logout" size="sm" />}
                            onPress={() => { navigation.navigate("Login"); }}
                        >ออกจากระบบ</Button>
                </Box>
            </Center>
      </NativeBaseProvider> 
    );
};

  const styles = StyleSheet.create({
    button: {
      padding: 15,
    },
});

  
  export default Menu_Screen;