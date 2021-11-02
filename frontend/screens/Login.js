import React from 'react'

import {ImageBackground,StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native'
function Login({navigation}){
    return(
        
        <View>
          <ScrollView>
            <View style = {styles.container}>
                <Text style = {styles.text2}>Login</Text>
            </View>

            <View style = {styles.container3 }>
            <Image source={require("../assets/glasses.jpg")}
            style = {styles.background }>

            </Image>
            </View>

            <View style = {styles.container2 }>
                <View style = {{margin:3}}>
                <Text style={styles.text}>User ID :</Text>
                <TextInput style={styles.input} keyboardType="number-pad" placeholder="เลขประจำตัวนักเรียน"></TextInput>
                </View>

                <View style = {{margin:3}}>
                <Text style={styles.text}>Password :</Text>
                <TextInput style={styles.input} placeholder="รหัสผ่าน" secureTextEntry={true}></TextInput>
                </View>

            </View>

            <View>
            <TouchableOpacity style={styles.loginButton} onPress={ () => { navigation.navigate("First_page"); } }><Text>LOGIN</Text></TouchableOpacity>
            <TouchableOpacity style={styles.register} onPress={ () => { navigation.navigate("Register"); } }><Text> Register</Text></TouchableOpacity>
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

        width:"70%",
        padding: 25,
        margin: "15%",
        marginTop: "5%",
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 10
        
      },

      container3: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
        
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
    loginButton:{
        width: "50%",
        height: 50,
        backgroundColor: "#EBB715",
        alignItems: 'center',
      justifyContent: 'center',
      marginLeft: "25%",
      fontSize: 20,
      borderRadius:10

    },

    register:{
        width: "50%",
        height: 50,
        backgroundColor: "#C3C3C0",
        alignItems: 'center',
      justifyContent: 'center',
      marginLeft: "25%",
      marginTop: "10%",
      fontSize: 20,
      borderRadius:10,
      marginBottom:10

    },
    input: {
        height:35,
        borderWidth:1,
        borderRadius: 5

    },
    background:{
      height:150,
      width: 150,
      alignItems: 'center',
      justifyContent: 'center',



      
        
    },




  })


export default Login;