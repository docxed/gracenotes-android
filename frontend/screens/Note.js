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

const Add_Note = () => {

  return (
    <Box flex={1} py="8" w="90%" mx="auto">
      <ScrollView>
        <VStack space={3} mt="3" padding={5}>
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 15,
                fontWeight: 500,
              }}>
              จำนวนเวลาที่ทำความดี
            </FormControl.Label>
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
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 15,
                fontWeight: 500,
              }}>
              วันที่ทำความดี
            </FormControl.Label>
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
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 15,
                fontWeight: 500,
              }}>
              รายละเอียดการทำความดี
            </FormControl.Label>
            <TextArea placeholder="เพิ่มรายละเอียดการทำความดี"/>
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Image
                source={{
                  uri: "https://wallpaperaccess.com/full/317501.jpg",
                }}
                alt="Alternate Text"
                size="2xl"
              />
            </FormControl.Label>
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 14,
                fontWeight: 500,
              }}>
              รูปถ่ายความดีแนวนอน(.jpeg ขนาดน้อยกว่า 2 MB)
            </FormControl.Label>
            <Button w={{base: "40%"}} size="md">เลือกรูปภาพ</Button>
          </FormControl>
        </VStack>
        <Divider my="5" />
        <VStack padding={15}><Button w={{base: "40%"}} size="lg" alignSelf="center" colorScheme="secondary">บันทึก</Button></VStack>
      </ScrollView>
    </Box>
  )
}

function Note_Screen({ navigation }) {
  return (
    <NativeBaseProvider>
      <Heading mt={45} textAlign="center" size="lg" fontWeight="600" color="indigo.500">เพิ่มบันทึกความดี</Heading>
      <Center flex={1} px="3"><Add_Note/></Center>
    </NativeBaseProvider>
    
  );
};


export default Note_Screen;