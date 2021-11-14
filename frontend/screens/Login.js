import * as React from 'react';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Icon,
  IconButton,
  Link,
  Button,
  HStack,
  Center,
} from 'native-base';
import { Image } from 'react-native';

// const img = require('../assets/logo.png');

function Login_Screen({ navigation }) {

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p="3" py="10" w="90%" mx="auto">
        <Center>
          <Image
              size={100}
              resizeMode={"contain"}
              borderRadius={30}
              source={{
                uri: "https://wallpaperaccess.com/full/317501.jpg",
              }}
              alt="Alternate Text"
          />
        </Center>
        <Heading padding={3} textAlign="center" size="lg" fontWeight="600" color="indigo.400">
            GraceNotes
        </Heading>
        <Heading textAlign="center" mt="1" color="gray.500" fontWeight="500" size="md">
            ลงชื่อเข้าใช้
        </Heading>
        <VStack space={4} mt="5" borderRadius={5} padding={15} shadow={4}>
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 15,
                fontWeight: 600,
              }}>
              รหัสนักเรียน
            </FormControl.Label>
            <Input InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }/>
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 15,
                fontWeight: 600,
              }}>
              รหัสผ่าน
            </FormControl.Label>
            <Input 
              InputLeftElement={
                <Icon
                as={<AntDesign  name="lock" />}
                size={5}
                ml="2"
                color="muted.400"
              />
              }
            />
          </FormControl>
          <Button mt="2" color="primary.300" _text={{ color: 'white' }} onPress={() => { navigation.navigate("Home_page"); }}>
            ลงชื่อเข้าใช้
          </Button>
          <HStack mt="6" justifyContent="center">
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 15,
              }} onPress={() => { navigation.navigate("Register"); }}>
              ลงทะเบียนเข้าใช้งาน
            </Link>
          </HStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

export default Login_Screen;
