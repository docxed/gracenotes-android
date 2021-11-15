import React from "react";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import {
  Box,
  Heading,
  Image,
  TextArea,
  Center,
  CheckIcon,
  HStack,
  Stack,
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

  let [service, setService] = React.useState("")

  return (
    <Box>
      <ScrollView _contentContainerStyle={{px: "10px", mb: "4", minW: "72"}} >
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
              <Select
                selectedValue={service}
                width="2xs"
                accessibilityLabel="Choose Service"
                placeholder="หน่วยงานที่ทำความดี"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setService(itemValue)}
                >
                <Select.Item label="UX Research" value="ux" />
                <Select.Item label="Web Development" value="web" />
                <Select.Item label="Cross Platform Development" value="cross" />
                <Select.Item label="UI Designing" value="ui" />
                <Select.Item label="Backend Development" value="backend" />
              </Select>
            </FormControl.Label>
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
            <Button w={{base: "24%"}} size="sm">เลือกรูปภาพ</Button>
          </FormControl>
        </VStack>
        <VStack padding={15}><Button w={{base: "30%"}} alignSelf="center" colorScheme="secondary">บันทึก</Button></VStack>
      </ScrollView>
    </Box>
  )
}

function Note_Screen({ navigation }) {
  return (
    <NativeBaseProvider>
      <Heading marginTop={45} textAlign="center" size="lg" fontWeight="600" color="indigo.500">เพิ่มบันทึกความดี</Heading>
      <Center flex={1} px="3"><Add_Note/></Center>
    </NativeBaseProvider>
    
  );
};


export default Note_Screen;