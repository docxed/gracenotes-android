import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  Box,
  Heading,
  Image,
  Text,
  TextArea,
  Center,
  CheckIcon,
  HStack,
  Stack,
  IconButton,
  Icon,
  Select,
  ScrollView,
  NativeBaseProvider,
  VStack,
  FormControl,
  Input,
  Button,
  Spinner,
} from "native-base";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { SERVER_IP, PORT } from "../database/serverIP";
import * as firebase from "firebase";
import { firebaseConfig } from "../database/firebaseDB";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useValidation } from 'react-native-form-validator';
import { useFonts, Kanit_500Medium, Kanit_400Regular } from '@expo-google-fonts/kanit';

function Note_Screen({ navigation }) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [info, setInfo] = useState({});
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date());
  const [detail, setDetail] = useState("");
  const [agency, setAgency] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  var [mode, setMode] = useState("date");
  var [show, setShow] = useState(false);

  let [fontsLoaded] = useFonts({
    Kanit_500Medium, Kanit_400Regular
  });

  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { time, date, detail, agency },
    });

  async function _retrieveData() {
    try {
      const value = await AsyncStorage.getItem("info"); // Get member's info from LocalStorage
      if (value == null) {
        // LocalStorage doesn't has Data
        // Unauthorized
        navigation.navigate("Login");
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
          alert("??????????????? ????????????????????????????????????????????????????????????????????????????????????????????????");
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
    var currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  if(!fontsLoaded){
    return(<NativeBaseProvider ><Text></Text></NativeBaseProvider>)
    
  }
  else{

  return (
    <NativeBaseProvider>
      <Heading
      style={{ fontFamily: 'Kanit_400Regular'}}
        marginTop={45}
        textAlign="center"
        size="lg"
        fontWeight="600"
        color="indigo.500"
      >
        ???????????????????????????????????????????????????
      </Heading>
      <Center flex={1} px="3">
        <Box flex={1} py="10" w="90%" mx="auto">
          <ScrollView
            _contentContainerStyle={{ px: "10px", mb: "4", minW: "72" }}
          >
            <VStack space={3} mt="3" padding={5}>
              <FormControl>
                <FormControl.Label
                  _text={{
                    fontFamily: 'Kanit_400Regular',
                    color: "coolGray.800",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  ???????????????????????????????????????????????????????????? ?????????????????????:????????????
                </FormControl.Label>
                <Input
      style={{ fontFamily: 'Kanit_400Regular'}}
                
                keyboardType = "numbers-and-punctuation"
                  placeholder="00:00"
                  InputRightElement={
                    <IconButton
                      icon={<Icon as={Ionicons} name="time-outline" />}
                      borderRadius="full"
                      _icon={{
                        color: "gray.400",
                        size: "sm",
                      }}
                    />
                  }
                  value={time}
                  onChangeText={(text) => setTime(text)}
                />
                {isFieldInError('time') ? (<Text  style={{ color: 'red', fontFamily: 'Kanit_400Regular', }}>??????????????????????????????????????????????????????????????????????????????(??????:??????)</Text>) : (<Text></Text>)}
              </FormControl>
              <FormControl>
                <FormControl.Label
                  _text={{
                    fontFamily: 'Kanit_400Regular',
                    color: "coolGray.800",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  ??????????????????????????????????????????
                  <FormControl>
                    {show && (
                      <DateTimePicker
                        style={{ margin: 50, fontFamily: 'Kanit_400Regular' }}
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        placeholder="DD/MM/YYYY"
                        onChange={onChange}
                      />
                    )}
                  </FormControl>
                </FormControl.Label>
                <Input
                style={{ fontFamily: 'Kanit_400Regular'}}
                  value={
                    date.getFullYear() +
                    "-" +
                    (date.getMonth() + 1) +
                    "-" +
                    date.getDate()
                  }
                  editable={false}
                  placeholder="??????/??????/????????????"
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
                {isFieldInError('date') ? (<Text  style={{ color: 'red', fontFamily: 'Kanit_400Regular', }}>???????????????????????????????????????????????????????????????</Text>) : (<Text></Text>)}
              </FormControl>
              <FormControl>
                <FormControl.Label
                  _text={{
                    fontFamily: 'Kanit_400Regular',
                    color: "coolGray.800",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  ???????????????????????????????????????????????????????????????
                </FormControl.Label>
                <TextArea
                style={{ fontFamily: 'Kanit_400Regular'}}
                  placeholder="??????????????????????????????????????????????????????????????????????????????"
                  value={detail}
                  onChangeText={(text) => setDetail(text)}
                />
                {isFieldInError('detail') ? (<Text style={{ color: 'red', fontFamily: 'Kanit_400Regular', }}>????????????????????????????????????????????????????????????????????????????????????</Text>) : (<Text></Text>)}
              </FormControl>
              <FormControl>
                <FormControl.Label
                  _text={{
                    fontFamily: 'Kanit_400Regular',
                    color: "coolGray.800",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  ?????????????????????????????????????????????????????????
                </FormControl.Label>
                <Input
                style={{ fontFamily: 'Kanit_400Regular'}}
                  placeholder="?????????????????????????????????????????????????????????"
                  value={agency}
                  onChangeText={(text) => setAgency(text)}
                />
                {isFieldInError('agency') ? (<Text  style={{ color: 'red', fontFamily: 'Kanit_400Regular', }}>??????????????????????????????????????????????????????????????????????????????(?????????????????????100????????????????????????)</Text>) : (<Text></Text>)}
              </FormControl>
              <FormControl>
                <FormControl.Label
                  _text={{
                    fontFamily: 'Kanit_400Regular',
                    color: "coolGray.800",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  ???????????????????????????????????????
                </FormControl.Label>
                <Box style={{ alignItems: "center" }} my={5}>
                  {!image == "" ? (
                    <Image
                      source={{
                        uri: image,
                      }}
                      alt="Alternate Text"
                      size="2xl"
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
                      <Icon
                        as={Ionicons}
                        name="cloud-upload-outline"
                        size="sm"
                      />
                    }
                    onPress={pickImage}
                  >
                    <Text style={{ fontFamily: 'Kanit_400Regular', color:"white"}}>?????????????????????</Text>
                    
                  </Button>
                </Button.Group>
              </FormControl>
            </VStack>
            <VStack padding={15}>
              {!uploading ? (
                <Button
                  w={{ base: "30%" }}
                  alignSelf="center"
                  colorScheme="secondary"
                  onPress={async () => {

                    if(validate({
                      time: {minlength:5 ,maxlength: 5, required: true, hasNumber: true  },
                      date: { required: true},
                      detail: { required: true},
                      agency: {maxlength: 100, required: true}
      
                    })){ 
                      if(image == ""){
                        Alert.alert("??????????????????????????????????????????")
                        return ;
                      }


                      const blob = await new Promise((resolve, reject) => {
                      const xhr = new XMLHttpRequest();
                      xhr.onload = function () {
                        resolve(xhr.response);
                      };
                      xhr.onerror = function () {
                        reject(new TypeError("Network request ?????????????????????"));
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
                            time: time,
                            date: date,
                            detail: detail,
                            agency: agency,
                            img: url,
                            sid: info.s_id,
                          };

                          Axios.post(
                            `http://${SERVER_IP}:${PORT}/grace`,
                            formData
                          )
                            .then((response) => {
                              const data = response.data;
                              Alert.alert(data);
                              setImage("")
                              setDetail("")
                              setTime("")
                              setDate(new Date())
                              setAgency("")
                              

                              

                              // navigation.navigate(); HERE TO ADD NAVIGATE
                            })
                            .catch((error) => {
                              console.log(error);
                            });

                          return url;
                        });
                      }
                    );





                    }else{

                      return(false)
                    }


                    // Bypass Network request failed when fetching || code from github :/
                   
                  }}
                >
                  <Text style={{ fontFamily: 'Kanit_400Regular', color:"white"}}>??????????????????</Text>
                  
                </Button>
              ) : (
                <Spinner size="lg" />
              )}
            </VStack>
          </ScrollView>
        </Box>
      </Center>
    </NativeBaseProvider>
  );}
}

export default Note_Screen;
