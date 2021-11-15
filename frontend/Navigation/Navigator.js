import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';

import Login_Screen from '../screens/Login.js';
import Register_Screen from "../screens/Register.js";
import Home_Screen from "../screens/Home.js";
import Note_Screen from "../screens/Note.js";
import Info_Screen from "../screens/Activity.js";


const Login_page = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function inside() {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={Home_Screen} 
            options={
                {
                    title: "หน้าแรก",
                    headerShown: false,
                    tabBarActiveTintColor: "goldenrod",
                    tabBarIcon: ({color, focused}) => {
                        return <MaterialCommunityIcons focused={focused} color={color} name="home" size={30}/>;
                      }
                }
            }/>
            <Tab.Screen name="Note" component={Note_Screen} options={
                {
                    title: "เพิ่มบันทึกความดี",
                    headerShown:false,
                    tabBarActiveTintColor: "darkblue",
                    tabBarIcon: ({color, focused}) => {
                        return <MaterialIcons focused={focused} color={color} name="note-add" size={30}/>;
                      }
                }
            }/>
            <Tab.Screen name="Activity" component={Info_Screen} options={
                {
                    title: "กิจกรรม",
                    headerShown:false,
                    tabBarActiveTintColor: "indianred",
                    tabBarIcon: ({color, focused}) => {
                        return <Entypo focused={focused} color={color} name="flag" size={30}/>;
                      }
                }
            }/>
        </Tab.Navigator>
    );
}

export default function MyNavigator() {
    return (
        <NavigationContainer>
            <Login_page.Navigator initialRouteName="Login">
                <Login_page.Screen 
                    name="Login" 
                    component={Login_Screen}
                    options={{headerShown:false}}/>
                <Login_page.Screen 
                    name="Register" 
                    component={Register_Screen}
                    options={{headerShown:false}}/>
                <Login_page.Screen
                    name="Home_page"
                    component={inside}
                    options={{headerShown:false}}/>
            </Login_page.Navigator>
        </NavigationContainer>
    );
}
