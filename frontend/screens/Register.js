import * as React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import * as firebase from "firebase";
import { firebaseConfig } from "../database/firebaseDB";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
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
  Image,
  Spinner,
  Text,
} from "native-base";
import { Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

function Register_Screen({ navigation }) {
  // Check firebase exist
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [no, setNo] = useState("");
  const [born, setBorn] = useState(new Date());
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [info, setInfo] = useState({});

  var [mode, setMode] = useState("date");
  var [show, setShow] = useState(false);

  async function _retrieveData() {
    try {
      const value = await AsyncStorage.getItem("info"); // Get member's info from LocalStorage
      if (value != null) {
        // LocalStorage has Data
        // Authorized
        navigation.navigate("Home_page");
        return;
      }
      setInfo(JSON.parse(value));
    } catch (error) {
      console.log(error);
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      //  When the screen is focused (coming back to it). What do you do?
      _retrieveData(); // Call Check Authorized
      return () => {
        // When the screen is unfocused (leaving). What do you do?
      };
    }, [])
  );

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("ขอโทษ โปรดให้แอปเข้าถึงรูปภาพในอุปกรณ์");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    setImage("");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  var onChange = (event, selectedDate) => {
    var currentDate = selectedDate || born;
    setShow(Platform.OS === "ios");
    setBorn(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <NativeBaseProvider>
      <Box flex={1} py="10" w="90%" mx="auto">
        <Ionicons
          name="arrow-back"
          size={24}
          color="orange"
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
        <Heading
          padding={2}
          textAlign="center"
          size="md"
          fontWeight="600"
          color="rose.400"
        >
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
                  color: "coolGray.800",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                ชื่อจริง
              </FormControl.Label>
              <Input
                placeholder="ชื่อ"
                value={fname}
                onChangeText={(text) => setFname(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: "coolGray.800",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                นามสกุล
              </FormControl.Label>
              <Input
                placeholder="นามสกุล"
                value={lname}
                onChangeText={(text) => setLname(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: "coolGray.800",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                รหัสนักเรียน
              </FormControl.Label>
              <Input
                placeholder="รหัสนักเรียน"
                value={user}
                onChangeText={(text) => setUser(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: "coolGray.800",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                ชั้นเรียน
              </FormControl.Label>
              <Input
                placeholder="ชั้นเรียน"
                value={room}
                onChangeText={(text) => setRoom(text)}
                w={{
                  base: "35%",
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: "coolGray.800",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                เลขที่
              </FormControl.Label>
              <Input
                placeholder="เลขที่"
                value={no}
                onChangeText={(text) => setNo(text)}
                w={{
                  base: "35%",
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: "coolGray.800",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                วัน/เดือน/ปีเกิด
                <FormControl>
                    {show && (
                      <DateTimePicker
                        style={{ margin: 50 }}
                        value={born}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        placeholder="DD/MM/YYYY"
                        onChange={onChange}
                      />
                    )}
                  </FormControl>
              </FormControl.Label>
              <HStack space={3}>
                <Input
                  placeholder="วว/ดด/ปปปป"
                  value={
                    born.getFullYear() +
                    "-" +
                    (born.getMonth() + 1) +
                    "-" +
                    born.getDate()
                  }
                  editable={false}
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
                      onPress={showDatepicker}
                    />
                  }
                />
              </HStack>
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: "coolGray.800",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                ที่อยู่
              </FormControl.Label>
              <Input
                marginBottom={2}
                placeholder="ที่อยู่ 1"
                value={address1}
                onChangeText={(text) => setAddress1(text)}
              />
              <Input
                placeholder="ที่อยู่ 2 (ไม่บังคับ)"
                value={address2}
                onChangeText={(text) => setAddress2(text)}
              />
            </FormControl>
            <FormControl.Label
              _text={{
                color: "coolGray.800",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              รูปประจำตัว
            </FormControl.Label>
            <Box style={{ alignItems: "center" }}>
              {!image == "" ? (
                <Image
                  source={{
                    uri: image,
                  }}
                  alt="Alternate Text"
                  size="xl"
                />
              ) : (
                <Text></Text>
              )}
            </Box>
            <Button.Group
              colorScheme="primary"
              mx={{
                base: "auto",
                md: 0,
              }}
              size="sm"
            >
              <Button
                leftIcon={
                  <Icon as={Ionicons} name="cloud-upload-outline" size="sm" />
                }
                onPress={pickImage}
              >
                อัปโหลด
              </Button>
            </Button.Group>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: "coolGray.800",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                รหัสผ่าน
              </FormControl.Label>
              <Input
                type="password"
                placeholder="รหัสผ่าน"
                value={pass}
                onChangeText={(text) => setPass(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  color: "coolGray.800",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                ยืนยันรหัสผ่าน
              </FormControl.Label>
              <Input
                type="password"
                placeholder="รหัสผ่าน"
                value={repass}
                onChangeText={(text) => setRepass(text)}
              />
            </FormControl>
            {!uploading ? (
              <Button
                colorScheme="indigo"
                _text={{ color: "white" }}
                onPress={async () => {
                  if (pass != repass) {
                    Alert.alert("รหัสผ่าน และ ยืนยันรหัสผ่าน ไม่ตรงกัน!");
                    setPass("");
                    setRepass("");
                    return;
                  }

                  // Bypass Network request failed when fetching || code from github :/
                  const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                      resolve(xhr.response);
                    };
                    xhr.onerror = function () {
                      reject(new TypeError("Network request ล้มเหลว"));
                    };
                    xhr.responseType = "blob";
                    xhr.open("GET", image, true);
                    xhr.send(null);
                  });

                  const ref = firebase
                    .storage()
                    .ref()
                    .child(new Date().toISOString()); // define name via TimeStamp DateTime
                  const snapshot = ref.put(blob);
                  snapshot.on(
                    firebase.storage.TaskEvent.STATE_CHANGED,
                    () => {
                      setUploading(true);
                    },
                    (error) => {
                      setUploading(false);
                      console.log(error);
                      blob.close();
                      return;
                    },
                    () => {
                      snapshot.snapshot.ref.getDownloadURL().then((url) => {
                        setUploading(false);
                        blob.close();
                        const formData = {
                          user: user,
                          fname: fname,
                          lname: lname,
                          classes: room,
                          no: no,
                          dob: born,
                          address: address1 + address2,
                          pass: pass,
                          img: url,
                        };
                        Axios.post(`http://${SERVER_IP}:${PORT}/register`, formData)
                          .then((response) => {
                            const data = response.data;
                            if (data.status) {
                              Alert.alert(data.message);
                              navigation.navigate("Login");
                            } else {
                              Alert.alert(data.message);
                              setPass("");
                              setRepass("");
                            }
                          })
                          .catch((error) => {
                            console.log(error);
                          });

                        return url;
                      });
                    }
                  );
                }}
              >
                ลงทะเบียนเข้าใช้งาน
              </Button>
            ) : (
              <Spinner size="lg" />
            )}
          </VStack>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
}

export default Register_Screen;