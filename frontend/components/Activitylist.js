import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  Stack,
} from "native-base";

const Post_Activity = (props) => {
    return(
        <TouchableOpacity
          style={styles.button}
          onPress={() => { props.navigation.navigate("Activity_Second")}}
          >
            <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" backgroundColor= "gray.50">
                <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                    <Image
                    source={{
                        uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                    }}
                    alt="image"
                    />
                </AspectRatio>
                <Center
                    bg="danger.500"
                    position="absolute"
                    bottom="5"
                    px="5"
                    py="1.5"
                >
                    0/5
                </Center>
                </Box>
                <Stack p="4" space={3}>
                    <Stack space={2}>
                    <Heading size="md" ml="-1">
                        กิจกรรม : กวาดดาดฟ้า 
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
                        นางสาว มณี </Text>
                    </Stack>
                    <Text color="coolGray.600" fontSize= {12}>
                        รับผู้เข้าร่วมกิจกรรม 5 คน
                    </Text>
                    <Text textAlign="right" color="coolGray.600" fontSize={11}>
                        เริ่มวันที่ 15/08/2564 เวลา 15:35
                    </Text>
                </Stack>
            </Box>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
      padding: 15,
      alignItems: "center",
    },
});

export default Post_Activity;