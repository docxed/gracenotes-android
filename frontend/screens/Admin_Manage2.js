import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Box,
  Divider,
  Heading,
  HStack,
  VStack,
  Icon,
  IconButton,
  Text,
  Button,
  Center,
  NativeBaseProvider,
  Spinner,
  ScrollView,
} from "native-base";

const Admin_list_User = (props) => {
    return (
        <Box alignItems="center" w="80%" mx="auto">
            <HStack space={8}>
                <VStack w={{base: "40%"}} alignItems="center" space={7}>
                    <Text bold  textAlign="center" fontSize={17}>หมายเลขบัญชี</Text>
                    <Text fontSize={18}>9</Text>
                    <Text fontSize={18}>8</Text>
                    <Text fontSize={18}>7</Text>
                </VStack>
                <VStack alignItems="center" space={7}>
                    <Text bold fontSize={18}>ชื่อ-นามสกุล</Text>
                    <Text fontSize={18}>เอเรียม โมนาช</Text>
                    <Text fontSize={18}>โรนัส เกเรียน</Text>
                    <Text fontSize={18}>อานิน นาเดีย</Text>
                </VStack>
                <VStack alignItems="center" space={7}>
                    <Text bold fontSize={17}>Option</Text>
                    <IconButton
                        colorScheme="gray"
                        borderRadius="full"
                        variant="outline"
                        _icon={{
                            as: Ionicons  ,
                            name: "eye",
                            size: "3",
                        }}
                        onPress={() => { props.navigation.navigate("Admin_Show_user") }}
                    />
                    <IconButton
                        colorScheme="gray"
                        borderRadius="full"
                        variant="outline"
                        _icon={{
                            as: Ionicons  ,
                            name: "eye",
                            size: "3",
                        }}
                    />
                    <IconButton
                        colorScheme="gray"
                        borderRadius="full"
                        variant="outline"
                        _icon={{
                            as: Ionicons  ,
                            name: "eye",
                            size: "3",
                        }}
                    />
                </VStack>
            </HStack>
        </Box>
    );
}

function Admin_user_Screen({ navigation }) {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <HStack space={2} mt="10">
                    <Icon
                        color="indigo.500"
                        as={MaterialIcons}
                        name="admin-panel-settings"
                    />
                    <Heading fontSize={30} color="indigo.500">Admin Panel</Heading>
                </HStack>
                <Heading fontSize={30} color="rose.500">จัดการบัญชีนักเรียน</Heading>
                <Divider my="3" />
                <ScrollView><Admin_list_User navigation={navigation}/></ScrollView>
            </Center>
        </NativeBaseProvider>
    );
}

export default Admin_user_Screen;