import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  Ionicons,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Box,
  Divider,
  Heading,
  Stack,
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

const Admin_list_post = (props) => {
    return (
        <Box alignItems="center" w="80%" mx="auto">
            <HStack space={9}>
                <VStack alignItems="center" space={7}>
                    <Text bold fontSize={17}>โพสต์ที่</Text>
                    <Text fontSize={18}>9</Text>
                    <Text fontSize={18}>8</Text>
                    <Text fontSize={18}>9</Text>
                    <Text fontSize={18}>8</Text>
                </VStack>
                <VStack alignItems="center" space={7}>
                    <Text bold fontSize={17}>เวลา</Text>
                    <Text fontSize={18}>20-07-2020 2:30</Text>
                    <Text fontSize={18}>22-08-2020 2:30</Text>
                    <Text fontSize={18}>20-07-2020 2:30</Text>
                    <Text fontSize={18}>22-08-2020 2:30</Text>
                </VStack>
                <VStack alignItems="center" space={6}>
                    <Text bold fontSize={17}>Edit</Text>
                    <IconButton
                        borderRadius="full"
                        variant="outline"
                        _icon={{
                            as: Feather ,
                            name: "edit",
                            size: "3",
                        }}
                        onPress={() => { props.navigation.navigate("Admin_edit_p") }}
                    />
                    <IconButton
                        borderRadius="full"
                        variant="outline"
                        _icon={{
                            as: Feather ,
                            name: "edit",
                            size: "3",
                        }}
                    />
                    <IconButton
                        borderRadius="full"
                        variant="outline"
                        _icon={{
                            as: Feather ,
                            name: "edit",
                            size: "3",
                        }}
                    />
                    <IconButton
                        borderRadius="full"
                        variant="outline"
                        _icon={{
                            as: Feather ,
                            name: "edit",
                            size: "3",
                        }}
                    />
                </VStack>
                <VStack alignItems="center" space={6}>
                    <Text bold fontSize={17}>View</Text>
                    <IconButton
                        onPress={() => { props.navigation.navigate("Admin_view_p") }}
                        colorScheme="success"
                        borderRadius="full"
                        variant="outline"
                        _icon={{
                            as: Ionicons  ,
                            name: "eye",
                            size: "3",
                        }}
                    />
                    <IconButton
                        colorScheme="success"
                        borderRadius="full"
                        variant="outline"
                        _icon={{
                            as: Ionicons  ,
                            name: "eye",
                            size: "3",
                        }}
                    />
                    <IconButton
                        colorScheme="success"
                        borderRadius="full"
                        variant="outline"
                        _icon={{
                            as: Ionicons  ,
                            name: "eye",
                            size: "3",
                        }}
                    />
                    <IconButton
                        colorScheme="success"
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

function Admin_post_Screen({ navigation }) {
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
                <Heading fontSize={30} color="success.500">จัดการโพสต์</Heading>
                <Divider my="3" />
                <ScrollView><Admin_list_post navigation={navigation}/></ScrollView>
            </Center>
        </NativeBaseProvider>
    );
}

export default Admin_post_Screen;