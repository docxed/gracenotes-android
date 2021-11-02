
import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Image, Platform, Button} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function Register({navigation}){
    var [first, setFirst] = useState("");
    var [last, setLast] = useState("");
    var [id, setId] = useState("");
    var [room, setRoom] = useState("");
    var [number, setNumber] = useState("");
    var [pass, setPass] = useState("");
    var [image, setImage] = useState(null);
    var [date, setDate] = useState(new Date())
    var [mode, setMode] = useState('date');
    var [show, setShow] = useState(false);
    var [realDate, setRealDate] = useState("");
    var [currentDate, setCurrentDate] = useState('');

    var month = date.getMonth()+1

    var full = date.getDate() + "/" + month + "/" + date.getFullYear()


    var onChange = (event, selectedDate) => {
      var currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      setRealDate(full)
    }


    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };

    

  useEffect(() => {
    var date =new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec
    );
  }, []);

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };


    return(
        
        <View>
            <ScrollView>
            <View style = {styles.container}>
                <Text style = {styles.text2}>Register</Text>
            </View>

            
            <View style = {styles.container2 }>
                <View style = {{margin:3}}>
                    <Text style={styles.text}>ชื่อ :</Text>
                    <TextInput style={styles.input} placeholder="ชื่อจริง" require={true} value = {first} onChangeText={setFirst}></TextInput>
                </View>
                <View style = {{margin:3}}>
                    <Text style={styles.text}>นามสกุล :</Text>
                    <TextInput style={styles.input} placeholder="นามสกุล" require={true} value = {last} onChangeText={setLast}></TextInput>
                </View>
                <View style = {{margin:3}}>
                    <Text style={styles.text}>รหัสนักเรียน :</Text>
                    <TextInput style={styles.input} placeholder="Ex. 62070168" require={true} value = {id} onChangeText={setId} keyboardType="number-pad"></TextInput>
                </View>
                <View style = {{margin:3}}>
                    <Text style={styles.text}>รหัสผ่าน :</Text>
                    <TextInput style={styles.input} placeholder="รหัสผ่าน" require={true} value = {pass} onChangeText={setPass}></TextInput>
                </View>
                <View style = {{margin:3}}>
                    <Text style={styles.text}>ชั้นเรียน :</Text>
                    <TextInput style={styles.input} placeholder="Ex. 5/2" require={true} value = {room} onChangeText={setRoom}></TextInput>
                </View>
                <View style = {{margin:3}}>
                    <Text style={styles.text}>เลขที่ :</Text>
                    <TextInput style={styles.input} placeholder="Ex. 28" require={true} value = {number} onChangeText={setNumber} keyboardType="number-pad"></TextInput>
                </View>

                <View style = {{margin:3}}>
                <Text style={styles.text}>วันเกิด :</Text>

                <View>
                
      </View>
        <View>
            {show && (   
        <DateTimePicker
        style={{margin: 50}}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          placeholder="DD/MM/YYYY"
          onChange={onChange}
        />)}</View>
                </View>
                
                <TextInput style={styles.input} dateFormat="day month year" onChangeText = {setDate} placeholder="วันเกิด"  multiline= {true} require={true} editable = {false}>{full}</TextInput>
                <TouchableOpacity style={styles.Image_insert} onPress={showDatepicker} title="Show date picker!" ><Text style={styles.text} require={true} >เลือกวันเกิด</Text></TouchableOpacity>

                <View style = {{margin:3}}>
                    <Text style={styles.text}>ที่อยู่ :</Text>
                    <TextInput style={{maxHeight: 100, borderWidth:1, height:50, borderRadius: 5}} type = {date} placeholder="ที่อยู่" multiline= {true} require={true}></TextInput>
                </View>

                <View style = {{margin:3}}>
                <TouchableOpacity style={styles.Image_insert}  onPress={pickImage} ><Text style={styles.text} require={true} >เลือกรูปภาพ</Text></TouchableOpacity>
                {image && <Image source={{ uri: image }} style={{ width: 230, height: 200, borderRadius:5 }} />}
                </View>
                

            </View>
            
            

            <View>
            <TouchableOpacity style={styles.RegisterButton}><Text style = {{margin:3}}> ลงทะเบียน </Text></TouchableOpacity>
            <TouchableOpacity style={styles.back} onPress={ () => { navigation.navigate("Login"); } }><Text> Back </Text></TouchableOpacity>
            
            </View>
            </ScrollView>
            
            
            

            

        </View>
        

    )
}

const styles = StyleSheet.create({
    container: {

      backgroundColor: '#EBB715',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 25
      
    },
    container2: {
        flex:2,
        width:"70%",
        padding: 25,
        marginLeft: "15%",
        marginTop: "5%",
        
      },
    text:{
        fontSize: 20,
        alignItems:'center',
        color: '#000000'
        
    },

    text2:{
        fontSize: 40,
        alignItems:'center',
        color: '#000000'
        
    },
    RegisterButton:{
        margin: 10,
        width: "50%",
        height: 50,
        backgroundColor: "#EBB715",
        alignItems: 'center',
      justifyContent: 'center',
      marginLeft: "25%",
      fontSize: 20,
      borderRadius:10

    },

    back:{
        width: "50%",
        height: 50,
        backgroundColor: "#C3C3C0",
        alignItems: 'center',
      justifyContent: 'center',
      marginLeft: "25%",
      marginTop: "5%",
      fontSize: 20,
      borderRadius:10,
      marginBottom:10

    },
    input: {
        height:40,
        borderWidth:1,
        borderRadius: 5

    },
    Image_insert:{
        margin: 10,
        width: "50%",
        height: 50,
        backgroundColor: "#EBB715",
        alignItems: 'center',
      justifyContent: 'center',
      marginLeft: "25%",
      fontSize: 20,
      borderRadius:10

    },





  })


