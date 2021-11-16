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

export const Grace_list_status = () => {
    return (
        <Flex direction="row" borderRadius="3xl" backgroundColor= "gray.50">
            <TouchableOpacity style={styles.button}>
                <Text color="warning.500">ทั้งหมด</Text>
                <Text color="warning.500">4</Text>
            </TouchableOpacity>
            <Divider orientation="vertical" mx="3" />
            <TouchableOpacity style={styles.button}>
                <Text color="success.500">รับรอง</Text>
                <Text color="success.500">4</Text>
            </TouchableOpacity>
            <Divider orientation="vertical" mx="3" />
            <TouchableOpacity style={styles.button}>
                <Text color="error.500">ไม่รับรอง</Text>
                <Text color="error.500">0</Text>
            </TouchableOpacity>
        </Flex>
    );
}

export const Grace_list = (props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate("Grace_Details")}}>
            <Box width={350} rounded="lg" overflow="hidden" borderColor="coolGray.500" borderWidth="1" backgroundColor= "gray.300">
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading color="indigo.500" size="md" ml="-1">
                            กวาดดาดฟ้า 
                        </Heading>
                    </Stack>
                    <Text color="coolGray.700" fontSize= {12}>
                            ที่ตึกมหานคร ทำความดีเป็นเวลา 50 นาที
                    </Text>
                    <Text textAlign="left" color="success.500" fontSize={11}>
                            รับรองแล้ว
                    </Text>
                    <Text textAlign="right" color="coolGray.600" fontSize={11}>
                            วันที่ 15/08/2564 เวลา 15:35
                    </Text>
                </Stack>
            </Box>
        </TouchableOpacity>
    );
}

function Grace_list_Screen({ navigation }) {
  return (
    <NativeBaseProvider>
      <Heading marginTop={45} textAlign="center" size="lg" fontWeight="600" color="indigo.500">บันทึกความดีของ นาย วรเมธ</Heading>
      <Spacer my="2"/>
      <Center padding="3"><Grace_list_status/></Center>
      <ScrollView 
        _contentContainerStyle={{
            px: "10px",
            mb: "4",
            minW: "72",
        }}>
            <Spacer my="2"/>
            <Center flex={2} px="3">
                <Grace_list navigation={navigation}/>
                <Grace_list navigation={navigation}/>
                <Grace_list navigation={navigation}/>
                <Grace_list navigation={navigation}/>
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

export default Grace_list_Screen;