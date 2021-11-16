import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  Box,
  Heading,
  Text,
  Center,
  ScrollView,
  Stack,
  NativeBaseProvider,
} from "native-base";

export const Help_list = (props) => {
    return(
        <TouchableOpacity
            style={styles.button}
            onPress={() => { props.navigation.navigate("Help_Second")}}
            >
          <Box width={350} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" backgroundColor= "dark.600">
              <Stack p="4" space={3}>
                  <Stack space={2}>
                  <Heading size="md" ml="-1">
                      ขอความช่วยเหลือ : กวาดดาดฟ้า
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
                      นางสาว มณี แสงทอง</Text>
                  </Stack>
                  <Text color="coolGray.600" fontSize= {12}>
                      ต้องการความช่วยเหลือ 5 คนขึ้นไป
                  </Text>
                  <Text textAlign="right" color="coolGray.600" fontSize={11}>
                      เริ่มวันที่ 15/08/2564 เวลา 15:35
                  </Text>
              </Stack>
          </Box>
        </TouchableOpacity>
    )
}

function Help_Screen({ navigation }) {
  return (
    <NativeBaseProvider>
      <Heading marginTop={45} textAlign="center" size="lg" fontWeight="600" color="indigo.500">ความช่วยเหลือทั้งหมด</Heading>
      <ScrollView 
        _contentContainerStyle={{
            px: "10px",
            mb: "4",
            minW: "72",
        }}>
            <Center flex={2} px="3">
                <Help_list navigation={navigation}/>
                <Help_list navigation={navigation}/>
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

export default Help_Screen;