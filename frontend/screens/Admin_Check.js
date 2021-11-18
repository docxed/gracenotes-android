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
  Text,
  Button,
  Center,
  NativeBaseProvider,
  Spinner,
  ScrollView,
} from "native-base";

const Admin_list_Grace = (props) => {
    return (
        <Box alignItems="center" w="80%" mx="auto">
            <HStack space={5}>
                <VStack alignItems="center" space={5}>
                    <Text bold fontSize={17}>หมายเลขบันทึก</Text>
                    <Divider my="1"/>
                    <Text fontSize={16}>9</Text>
                    <Text fontSize={16}>8</Text>
                    <Text fontSize={16}>7</Text>
                </VStack>
                <VStack alignItems="center" space={5}>
                    <Text bold fontSize={17}>ผู้บันทึก</Text>
                    <Divider my="1"/>
                    <Text fontSize={16}>เอเรียม โมนาช</Text>
                    <Text fontSize={16}>โรนัส เกเรียน</Text>
                    <Text fontSize={16}>อานิน นาเดีย</Text>
                </VStack>
                <VStack alignItems="center" space={5}>
                    <Text bold fontSize={17}>สถานะตรวจ</Text>
                    <Divider my="1"/>
                    <Button w={{base: "60%"}} size="6" colorScheme="warning" onPress={() => { props.navigation.navigate("Check_Detail") }}>รอการตรวจ</Button>
                    <Button w={{base: "60%"}} size="6" colorScheme="success">ตรวจแล้ว</Button>
                    <Button w={{base: "60%"}} size="6" colorScheme="success">ตรวจแล้ว</Button>
                </VStack>
            </HStack>
        </Box>
    );
}

function Admin_check_Screen({ navigation }) {
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
                <Heading fontSize={30} color="info.500">ตวรจบันทึกความดี</Heading>
                <Divider my="3" />
                <ScrollView><Admin_list_Grace navigation={navigation}/></ScrollView>
            </Center>
        </NativeBaseProvider>
    );
}

export default Admin_check_Screen;