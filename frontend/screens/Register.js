import * as React from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  IconButton, 
  Icon,
  Button,
  HStack,
} from 'native-base';

function Register_Screen({ navigation }) {
    return (
        <NativeBaseProvider>
            <Box safeArea flex={1} p="3" py="10" w="90%" mx="auto">
                <Heading padding={3} textAlign="center" size="lg" fontWeight="600" color="rose.400">
                    ลงทะเบียนเข้าใช้งาน
                </Heading>
                <VStack space={4} mt="5">
                    <FormControl>
                        <FormControl.Label
                        _text={{
                            color: 'coolGray.800',
                            fontSize: 'm',
                            fontWeight: 500,
                        }}>
                        ชื่อจริง
                        </FormControl.Label>
                        <Input placeholder="ชื่อ"/>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label
                        _text={{
                            color: 'coolGray.800',
                            fontSize: 'm',
                            fontWeight: 500,
                        }}>
                        นามสกุล
                        </FormControl.Label>
                        <Input placeholder="นามสกุล"/>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label
                        _text={{
                            color: 'coolGray.800',
                            fontSize: 'm',
                            fontWeight: 500,
                        }}>
                        รหัสนักเรียน
                        </FormControl.Label>
                        <Input placeholder="รหัสนักเรียน"/>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label
                        _text={{
                            color: 'coolGray.800',
                            fontSize: 'm',
                            fontWeight: 500,
                        }}>
                        ชั้นเรียน
                        </FormControl.Label>
                        <Input placeholder="ชั้นเรียน"  
                            w={{
                                base: "35%",
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label
                        _text={{
                            color: 'coolGray.800',
                            fontSize: 'm',
                            fontWeight: 500,
                        }}>
                        เลขที่
                        </FormControl.Label>
                        <Input placeholder="เลขที่"
                            w={{
                                base: "35%",
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label
                        _text={{
                            color: 'coolGray.800',
                            fontSize: 'm',
                            fontWeight: 500,
                        }}>
                        วัน/เดือน/ปีเกิด
                        </FormControl.Label>
                        <HStack space={3}>
                            <Input placeholder="วว/ดด/ปปปป"
                            w={{
                                base: "55%",
                                md: "25%",
                            }}
                            />
                            <IconButton
                                icon={<Icon as={AntDesign} name="calendar" />}
                                borderRadius="full"
                                _icon={{
                                color: "orange.500",
                                size: "sm",
                                }}
                                _hover={{
                                bg: "orange.600:alpha.20",
                                }}
                            />
                        </HStack>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label
                            _text={{
                                color: 'coolGray.800',
                                fontSize: 'm',
                                fontWeight: 500,
                            }}>
                            ที่อยู่
                        </FormControl.Label>
                        <Input marginBottom={2} placeholder="ที่อยู่1"/>
                        <Input placeholder="ที่อยู่2 (ไม่บังคับ)"/>
                    </FormControl>
                    <Button colorScheme={"indigo"} _text={{ color: 'white' }} onPress={() => { navigation.navigate("Home"); }}>ลงทะเบียนเข้าใช้งาน</Button>
                    <HStack mt={5} space={3} justifyContent="center">
                        <Button colorScheme={"red"} _text={{ color: 'white' }} onPress={() => { navigation.navigate("Login"); }}>กลับ</Button>
                    </HStack>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
}

export default Register_Screen;