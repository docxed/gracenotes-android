import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

import Login from "../screens/Login.js";
import Register from "../screens/Register.js";
import Home from "../screens/Home.js";
import Note from "../screens/Note.js";
import Info from "../screens/Info.js";


const Login_page = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function inside() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} 
            options={
                {
                    headerShown: false,
                    tabBarActiveTintColor: "darkblue",
                    tabBarIcon: ({color, focused}) => {
                        return <MaterialCommunityIcons focused={focused} color={color} name="home" size={30}/>;
                      }
                }
            }/>
            <Tab.Screen name="Note" component={Note} options={
                {
                    headerShown:false,
                    tabBarActiveTintColor: "darkblue",
                    tabBarIcon: ({color, focused}) => {
                        return <MaterialIcons focused={focused} color={color} name="note-add" size={30}/>;
                      }
                }
            }/>
            <Tab.Screen name="Info" component={Info} options={
                {
                    headerShown:false,
                    tabBarActiveTintColor: "darkblue",
                    tabBarIcon: ({color, focused}) => {
                        return <FontAwesome focused={focused} color={color} name="user" size={30}/>;
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
                    component={Login}
                    options={{headerShown:false}}/>
                <Login_page.Screen 
                    name="Register" 
                    component={Register}
                    options={{headerShown:false}}/>
                <Login_page.Screen
                    name="Home"
                    component={inside}
                    options={{headerShown:false}}/>
            </Login_page.Navigator>
        </NavigationContainer>
    );
}
