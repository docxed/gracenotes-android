import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  Box,
  Heading,
  Text,
  Center,
  Flex,
  Divider,
  Spacer,
  ScrollView,
  Stack,
  NativeBaseProvider,
} from "native-base";

export const History_type = (props) => {
    return (
        <Flex direction="row" width="250" borderRadius="3xl" backgroundColor= "gray.50">
            <Spacer/>
            <TouchableOpacity style={styles.button} onPress={""}>
                <Text color="warning.500">โพสต์ของฉัน</Text>
                <Text color="warning.500">1</Text>
            </TouchableOpacity>
            <Divider orientation="vertical" mx="auto" />
            <TouchableOpacity style={styles.button} onPress={""}>
                <Text color="error.500">ประวัติช่วยเหลือ</Text>
                <Text color="error.500">1</Text>
            </TouchableOpacity>
            <Spacer/>
        </Flex>
    );
}

export const History_Post = (props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate("History_Detail")}}>
            <Box width={350} rounded="lg" overflow="hidden" borderColor="coolGray.500" borderWidth="1" backgroundColor= "purple.200">
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading color="indigo.500" size="md" ml="-1">
                            ขอความเชื่อเหลือ : กวาดดาดฟ้า
                        </Heading>
                    </Stack>
                    <Text color="coolGray.700" fontSize= {12}>
                            ที่ตึก IT จำนวนคนที่เข้ารวม 5 คนขึ้ไป 
                    </Text>
                    <Text textAlign="left" color="success.500" fontSize={11}>
                            เปิดอยู่
                    </Text>
                    <Text textAlign="right" color="coolGray.600" fontSize={11}>
                            เริ่มวันที่ 20/08/2564 เวลา 10:00
                    </Text>
                </Stack>
            </Box>
        </TouchableOpacity>
    );
}

export const History_list = (props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate("History_Detail")}}>
            <Box width={350} rounded="lg" overflow="hidden" borderColor="coolGray.500" borderWidth="1" backgroundColor= "gray.300">
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading color="indigo.500" size="md" ml="-1">
                            ช่วยเหลือ : กวาดดาดฟ้า
                        </Heading>
                    </Stack>
                    <Text color="coolGray.700" fontSize= {12}>
                            ที่ตึกมหานคร จำนวนคนที่เข้ารวม 5 คนขึ้ไป 
                    </Text>
                    <Text textAlign="left" color="success.500" fontSize={11}>
                            เข้าร่วมแล้ว
                    </Text>
                    <Text textAlign="right" color="coolGray.600" fontSize={11}>
                            เข้าร่วมเมื่อวันที่ 15/08/2564 เวลา 15:35
                    </Text>
                </Stack>
            </Box>
        </TouchableOpacity>
    );
}

function History_Screen({ navigation }) {
  return (
    <NativeBaseProvider>
      <Heading marginTop={45} textAlign="center" size="lg" fontWeight="600" color="indigo.500">ประวัติความช่วยเหลือ</Heading>
      <Spacer my="2"/>
      <Center padding="3"><History_type/></Center>
      <ScrollView 
        _contentContainerStyle={{
            px: "10px",
            mb: "4",
            minW: "72",
        }}>
            <Divider my="auto" />
            <Center flex={2} px="3">
                <History_Post navigation={navigation}/>
                <History_list navigation={navigation}/>
            </Center>
        </ScrollView>
      
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: "center",
  },
});

export default History_Screen;