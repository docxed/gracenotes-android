import React from "react";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import {
  Box,
  Heading,
  Image,
  TextArea,
  Center,
  CheckIcon,
  Divider,
  IconButton,
  Icon,
  Select,
  ScrollView,
  NativeBaseProvider,
  VStack,
  FormControl,
  Input,
  Button,
} from "native-base";

const Add_Post = (props) => {

  return (
    <Box flex={1} py="8" w="90%" mx="auto">
      <ScrollView>
        <VStack space={2} mt="3" padding={5} borderWidth="1" borderRadius="5" backgroundColor="gray.100">
            <FormControl>
                <FormControl.Label>เรื่องที่ต้องการให้ช่วย</FormControl.Label>
                <Input placeholder="ชื่อเรื่อง"/>
            </FormControl>
            <FormControl>
                <FormControl.Label>รายละเอียด</FormControl.Label>
                <TextArea placeholder="เพิ่มรายละเอียด"/>
            </FormControl>
            <FormControl>
                <FormControl.Label>สถานที่</FormControl.Label>
                <Input placeholder="สถานที่"/>
            </FormControl>
            <FormControl>
                <FormControl.Label> ระยะเวลาที่ใช้โดยประมาณ</FormControl.Label>
                <Input placeholder="--:--"
                    InputRightElement={
                        <IconButton
                            icon={<Icon as={Ionicons} name="time-outline" />}
                            borderRadius="full"
                            _icon={{
                            color: "gray.400",
                            size: "sm",
                            }}
                        />
                    }
                />
            </FormControl>
            <FormControl>
                <FormControl.Label>วันที่</FormControl.Label>
                <Input placeholder="วว/ดด/ปปปป"
                InputRightElement={
                    <IconButton
                        icon={<Icon as={AntDesign} name="calendar" />}
                        borderRadius="full"
                        _icon={{
                        color: "gray.400",
                        size: "sm",
                        }}
                    />
                }
                />
            </FormControl>
        </VStack>
        <Divider my="5" />
        <VStack padding={15}><Button size="lg" alignSelf="center" colorScheme="secondary">โพสต์</Button></VStack>
      </ScrollView>
    </Box>
  )
}

function Help_Post_Screen({ navigation }) {
  return (
    <NativeBaseProvider>
      <Heading mt={45} textAlign="center" size="lg" fontWeight="600" color="indigo.500">โพสต์ขอความช่วยเหลือ</Heading>
      <Center flex={1} px="3"><Add_Post navigation={navigation}/></Center>
    </NativeBaseProvider>
    
  );
};


export default Help_Post_Screen;