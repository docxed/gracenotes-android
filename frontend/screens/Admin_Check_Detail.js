import * as React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
    Box,
    Heading,
    AspectRatio,
    Divider,
    Image,
    Text,
    Center,
    CheckIcon,
    Stack,
    Select,
    ScrollView,
    FormControl,
    NativeBaseProvider,
    Button,
    HStack,
    Spacer,
  } from "native-base";

  const Card = (props) => {
    return (
      <Box p="5" py="15" w="100%" mx="auto">
          <Heading mt="10" textAlign="center" size="lg" fontWeight="600" color="indigo.500">หมายเลขบันทึก 9</Heading>
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
                        เอเรียม โมนาช
                    </Text>
                </Stack>
                <Text fontSize= {15} ml="-3">
                    ได้ช่วยแม่บ้านที่ตึกมหานครทำความชั้นดาดฟ้า
                </Text>
                <Text textAlign="right" padding={1} fontSize= {11} color="coolGray.600">วันที่ 30/07/2564  เวลา 14:35</Text>
                <Select
                    minWidth="100"
                    _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    >
                    <Select.Item label="ผ่าน" value="ผ่าน" />
                    <Select.Item label="ไม่ผ่าน" value="ไม่ผ่าน" />
                    <Select.Item label="รอการตรวจ" value="รอการตรวจ" />
                </Select>
                <Button mx="auto" w={{base: "20%"}} size="md" colorScheme="info">อัปเดต</Button>
            </Stack>
            <Divider my="8" w="100%"/>
            <HStack mx="auto" space={3}>
                <Button w={{base: "30%"}} size="lg" colorScheme="indigo" onPress={() => { props.navigation.navigate("Check_Post") }}>เผยแพร่</Button>
                <Button w={{base: "15%"}} size="lg" colorScheme="error">ลบ</Button>
            </HStack>
      </Box>
    );
  }


  function Admin_Check_Detail_Screen({ navigation }) {
      return (
        <NativeBaseProvider>
        <ScrollView>
            <Center>
                <Card navigation={navigation}/>
            </Center>
        </ScrollView>
      </NativeBaseProvider>
      );
  }

  export default Admin_Check_Detail_Screen;