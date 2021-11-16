import * as React from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Avatar,
  Input,
  ScrollView,
  IconButton, 
  Icon,
  Button,
  Divider,
} from 'native-base';

function Profile_Screen({ navigation }) {
    return (
        <NativeBaseProvider>
            <Box flex={1} py="8" w="90%" mx="auto">
                <ScrollView>
                    <Heading alignSelf="center" fontSize="xl" p="4" pb="3">โปรไฟล์</Heading>
                    <VStack>
                        <Avatar
                            alignSelf="center"
                            size="110"
                            source={{
                            uri: "https://wallpaperaccess.com/full/317501.jpg",
                            }}
                        />
                        <Button alignSelf="center" size="sm" my="15">เลือกรูปภาพ</Button>
                    </VStack>
                    <VStack space={2} mt="3" padding={5}>
                        <FormControl>
                            <FormControl.Label>
                                รหัสนักเรียน
                            </FormControl.Label>
                            <Input placeholder="62070164" variant="filled"/>
                        </FormControl>
                        <FormControl>
                                <FormControl.Label>
                                    ชื่อ
                                </FormControl.Label>
                                <Input placeholder="วรเมธ"/>
                        </FormControl>
                        <FormControl>
                                <FormControl.Label>
                                    นามสกุล
                                </FormControl.Label>
                                <Input placeholder="สาริกาเกตุ"/> 
                        </FormControl>
                        <FormControl>
                            <FormControl.Label
                            _text={{
                                color: 'coolGray.800',
                                fontSize: 15,
                                fontWeight: 500,
                            }}>
                            ชั้นเรียน
                            </FormControl.Label>
                            <Input placeholder="6/1"  
                                w={{
                                    base: "35%",
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label
                            _text={{
                                color: 'coolGray.800',
                                fontSize: 15,
                                fontWeight: 500,
                            }}>
                            เลขที่
                            </FormControl.Label>
                            <Input placeholder="20"  
                                w={{
                                    base: "35%",
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label
                            _text={{
                                color: 'coolGray.800',
                                fontSize: 15,
                                fontWeight: 500,
                            }}>
                            วัน/เดือน/ปีเกิด
                            </FormControl.Label>
                            <Input placeholder="20/07/2543"
                                    w={{
                                        base: "55%",
                                        md: "25%",
                                    }}
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
                            <FormControl.Label>
                                ที่อยู่
                            </FormControl.Label>
                            <Input marginBottom={2} placeholder="บนโลกเนี่ยแหละ"/>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>
                                รหัสผ่านใหม่
                            </FormControl.Label>
                            <Input marginBottom={2} placeholder="รหัสผ่านใหม่"/>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>
                                ยืนยันรหัสผ่านใหม่
                            </FormControl.Label>
                            <Input marginBottom={2} placeholder="ยืนยันรหัสผ่านใหม่"/>
                        </FormControl>
                    </VStack>
                    <Divider my="5" />
                    <Button w={{base: "40%"}} size="lg" alignSelf="center" colorScheme="info" onPress={() => { navigation.navigate(""); }}>อัปเดต</Button>
                </ScrollView>
            </Box>
        </NativeBaseProvider>
    );
}

export default Profile_Screen;