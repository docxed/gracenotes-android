import * as React from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  ScrollView,
  IconButton, 
  Icon,
  Button,
  HStack,
} from 'native-base';

function Register_Screen({ navigation }) {
    return (
        <NativeBaseProvider>
            <Box flex={1} py="10" w="90%" mx="auto">
                <Ionicons name="arrow-back" size={24} color="orange" onPress={() => { navigation.navigate("Login"); }}/>
                <Heading padding={2} textAlign="center" size="md" fontWeight="600" color="rose.400">
                    ลงทะเบียนเข้าใช้งาน
                </Heading>
                <ScrollView
                    _contentContainerStyle={{
                        px: "10px",
                        mb: "4",
                        minW: "72",
                    }}
                >
                    <VStack space={3} mt="3" borderRadius={6} padding={5} shadow={4}>
                        <FormControl>
                            <FormControl.Label
                            _text={{
                                color: 'coolGray.800',
                                fontSize: 15,
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
                                fontSize: 15,
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
                                fontSize: 15,
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
                                fontSize: 15,
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
                                fontSize: 15,
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
                                fontSize: 15,
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
                            </HStack>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label
                                _text={{
                                    color: 'coolGray.800',
                                    fontSize: 15,
                                    fontWeight: 500,
                                }}>
                                ที่อยู่
                            </FormControl.Label>
                            <Input marginBottom={2} placeholder="ที่อยู่1"/>
                            <Input placeholder="ที่อยู่2 (ไม่บังคับ)"/>
                        </FormControl>
                        <Button colorScheme="indigo" _text={{ color: 'white' }} onPress={() => { navigation.navigate("Home_page"); }}>ลงทะเบียนเข้าใช้งาน</Button>
                    </VStack>
                </ScrollView>
            </Box>
        </NativeBaseProvider>
    );
}

export default Register_Screen;